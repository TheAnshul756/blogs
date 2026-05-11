---
title: My Dev Setup in Windows
description: How I set up my Windows laptop for development — using WSL2, a proper terminal, and SSH into my always-on Mac Mini via Tailscale, so I can code from anywhere without giving up the Linux feel.
pubDate: 2026-05-11
category: "Dev Setup"
tags:
  - windows
  - wsl
  - ssh
  - tailscale
  - terminal
  - mac-mini
---

I was a Ubuntu user in college and a Mac user in my professional life. I bought a Mac Mini recently but I missed the feel of having a laptop to work from anywhere — but I also didn't want to buy a new MacBook (or any Apple product ever again, but I'll explain why another day). Luckily, my fiancée had a laptop she didn't use that much, and she asked me for my iPad (a purchase I regret, much like my iPhone), so now I have a laptop.

I didn't want to dual boot it since we both use the laptop and I think she'd be more comfortable with Windows. So I came up with this setup.

Before jumping into the how, here's the idea: I keep my Mac Mini always on, and whenever I plan to code from my laptop, I just open my terminal in Windows and SSH into the Mac Mini and start coding. This doesn't require me to be on the same Wi-Fi as the Mac Mini — I can literally work from anywhere. Not just that, I work on my Windows laptop as if it's Ubuntu using WSL, and I'm able to achieve almost everything I missed about Ubuntu. (I recently set it up, so I'll keep you posted if I miss anything and how to work around it.)

Below is the complete setup — everything from scratch, no prior Windows or Linux experience assumed.

Here's what we'll cover:

- **Phase 0** — Check Windows version and enable virtualization
- **Phase 1** — Install WSL2 and Ubuntu
- **Phase 2** — Set up Windows Terminal
- **Phase 3** — Install a Nerd Font (for shell icons)
- **Phase 4** — Zsh + Oh My Zsh + Powerlevel10k
- **Phase 5** — Dev tools (Git, Python, Node, GitHub CLI)
- **Phase 6** — Tune WSL memory and config
- **Phase 7** — VS Code with WSL and Remote SSH
- **Phase 8** — SSH into the Mac Mini
- **Phase 9** — Tailscale (so SSH works from anywhere)
- **Phase 10** — Aliases and final shell config

---

## Phase 0 — Prerequisites

### Check your Windows version

Press **Windows key + R**, type `winver`, press Enter. You need Windows 10 version 2004 (20H1) or later, or any Windows 11.

### Check virtualization is enabled

Press **Ctrl + Shift + Esc** → Task Manager → Performance tab → CPU. Look for **Virtualization: Enabled** at the bottom right. If it says Disabled, enable it in BIOS (search YouTube for "enable virtualization [your laptop brand]").

---

## Phase 1 — Install WSL2

### Open PowerShell as Administrator

Click Start → type `powershell` → **right-click** → **Run as administrator** → click Yes on the UAC popup.

### Run the install command

```
wsl --install
```

This installs WSL2, the Linux kernel, sets WSL2 as default, and installs Ubuntu — all at once. Takes 2–5 minutes.

### Restart your computer

Save all work and restart. After restart, Ubuntu launches automatically.

### Create your Linux username and password

Ubuntu asks for a username (use simple lowercase, e.g. `anshul`) and password. **Nothing appears on screen when typing the password — that's normal.** Remember this password — you need it for `sudo` commands.

### Verify WSL2 is running

```
wsl --list --verbose
# Should show: Ubuntu  Running  2
```

### Update Ubuntu immediately

```
sudo apt update && sudo apt upgrade -y
```

---

## Phase 2 — Windows Terminal

### Install Windows Terminal

Open Microsoft Store → search **Windows Terminal** → Install (by Microsoft). Set it as default: Settings → Startup → Default terminal → Windows Terminal.

### Set Ubuntu as default profile

Windows Terminal Settings (Ctrl+,) → Startup → **Default profile** → Ubuntu. Now every new tab (Ctrl+T) opens Ubuntu directly.

### Fix the starting directory

Settings → Ubuntu profile → **Starting directory** → clear field and set:

```
//wsl$/Ubuntu/home/yourusername
```

### Recommended keyboard shortcuts

Settings → Actions → add to the actions array in settings.json (Ctrl+Shift+,):

```json
{ "command": "newTab", "keys": "ctrl+t" },
{ "command": "closeTab", "keys": "ctrl+w" },
{ "command": { "action": "splitPane", "split": "vertical" }, "keys": "ctrl+shift+d" },
{ "command": "nextTab", "keys": "ctrl+tab" },
{ "command": "prevTab", "keys": "ctrl+shift+tab" }
```

---

## Phase 3 — Nerd Font

Required for shell prompt icons. Without it you get broken boxes (□□□).

### Download

Go to `github.com/ryanoasis/nerd-fonts/releases` → latest release → Assets → download [**JetBrainsMono.zip**](http://JetBrainsMono.zip).

### Install

Extract the ZIP (right-click → Extract All — do NOT install from inside the ZIP). Open the extracted folder → Ctrl+A to select all TTF files → right-click → **Install for all users**.

> On Windows 11: if you don't see "Install for all users", click **Show more options** first.
> 

### Set in Windows Terminal

Settings → Ubuntu profile → Appearance → **Font face** → type `JetBrainsMono Nerd Font` → Save → restart terminal.

---

## Phase 4 — Zsh + Oh My Zsh

### Install zsh and set as default

```bash
sudo apt install zsh -y
chsh -s $(which zsh)
# Close and reopen terminal after this
```

### Install Oh My Zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Say Y when asked to change default shell.

### Install Powerlevel10k theme

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Then in `~/.zshrc`, change the theme line:

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

Reload and follow the wizard:

```bash
source ~/.zshrc
# p10k configure wizard launches automatically
```

### Install plugins

```bash
# Autosuggestions (ghost-text history completions)
git clone https://github.com/zsh-users/zsh-autosuggestions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Syntax highlighting (commands turn green/red as you type)
git clone https://github.com/zsh-users/zsh-syntax-highlighting \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Activate in `~/.zshrc`:

```bash
plugins=(git z zsh-autosuggestions zsh-syntax-highlighting)
```

The built-in `z` plugin lets you jump to directories with `z partialname` after visiting them a few times.

---

## Phase 5 — Dev Tools

### Git config

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --global core.editor nano
```

### Build essentials

```bash
sudo apt install -y build-essential curl wget unzip
```

### Python

```bash
sudo apt install -y python3 python3-pip python3-venv
```

Always use venv for projects — never install packages globally.

### Node via nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# Close and reopen terminal, then:
nvm install --lts
nvm use --lts
```

### GitHub CLI (optional but handy)

```bash
(type -p wget >/dev/null || (sudo apt update && sudo apt install wget -y)) \
  && sudo mkdir -p -m 755 /etc/apt/keyrings \
  && wget -qO- https://cli.github.com/packages/githubcli-archive-keyring.gpg \
  | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
  && sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
  | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && sudo apt update && sudo apt install gh -y

gh auth login
```

---

## Phase 6 — WSL Config

### .wslconfig (Windows side)

Create `C:\Users\YourWindowsUsername\.wslconfig` using Notepad. Save as **All Files**, not .txt.

```
[wsl2]
memory=6GB
processors=2
swap=2GB
localhostForwarding=true
```

Adjust memory based on RAM: for 16GB laptop, 6–8GB is safe.

### /etc/wsl.conf (Ubuntu side)

```bash
sudo nano /etc/wsl.conf
```

Paste:

```
[boot]
systemd=true

[automount]
enabled=true
options="metadata,umask=22,fmask=11"

[network]
hostname=wsl-dev
generateHosts=true

[user]
default=yourusername
```

`systemd=true` is critical — enables Docker, systemctl, and many dev tools.

### Restart WSL

In PowerShell on Windows:

```
wsl --shutdown
```

Then reopen Ubuntu.

---

## Phase 7 — VS Code

### Install VS Code

Download from `code.visualstudio.com`. During install, tick **Add to PATH** and **Open with Code** checkboxes.

### Install extensions

- **WSL** (by Microsoft) — lets VS Code run inside Linux
- **Remote - SSH** (by Microsoft) — connects to Mac Mini

### Open a project in WSL

```bash
cd ~/projects
code .
```

VS Code opens with **WSL: Ubuntu** in the bottom-left green bar. Everything (terminal, extensions, debugger) runs natively in Linux.

---

## Phase 8 — SSH to Mac Mini

### Enable Remote Login on Mac

Mac: System Settings → General → Sharing → **Remote Login** → On. Note your Mac username and local IP.

### Generate SSH key (in WSL)

```bash
ssh-keygen -t ed25519 -C "windows-wsl"
# Press Enter 3 times
```

### Copy key to Mac Mini

```bash
ssh-copy-id yourmacusername@192.168.x.x
```

### Create SSH config

> **Important:** Use your Tailscale IP (100.x.x.x) instead of local IP — local IPs change, Tailscale IPs never do.
> 

```bash
nano ~/.ssh/config
```

Paste:

```
Host macmini
  HostName 100.x.x.x
  User yourmacusername
  IdentityFile ~/.ssh/id_ed25519
  ServerAliveInterval 60
  ServerAliveCountMax 3
```

Test: `ssh macmini`

### VS Code with Windows SSH config

VS Code reads the Windows SSH config, not WSL's. Copy keys to Windows:

```bash
cp ~/.ssh/id_ed25519 "/mnt/c/Users/Your Windows Username/.ssh/"
cp ~/.ssh/id_ed25519.pub "/mnt/c/Users/Your Windows Username/.ssh/"
```

Create `C:\Users\Your Windows Username\.ssh\config` (All Files, no extension):

```
Host macmini
  HostName 100.x.x.x
  User yourmacusername
  IdentityFile "C:\Users\Your Windows Username\.ssh\id_ed25519"
  ServerAliveInterval 60
  ServerAliveCountMax 3
```

In VS Code Remote SSH settings, set config file path to:

```
C:\Users\Your Windows Username\.ssh\config
```

### Connect via VS Code

F1 → **Remote-SSH: Connect to Host** → macmini. VS Code opens with **SSH: macmini** in bottom-left.

---

## Phase 9 — Tailscale

Tailscale gives each device a stable `100.x.x.x` IP that works from any network — home, café, mobile hotspot.

### Install

- Windows: download from `tailscale.com/download`
- Mac Mini: Mac App Store or `tailscale.com/download`
- Sign in with the **same account** on both devices

### Get Mac Mini's Tailscale IP

Go to `login.tailscale.com/admin/machines` → find Mac Mini → copy the `100.x.x.x` IP.

Update your SSH config HostName to this IP. From now on, `ssh macmini` works from anywhere in the world.

---

## Phase 10 — Final ~/.zshrc

Add to the bottom of `~/.zshrc` (`nano ~/.zshrc`, scroll to end with Ctrl+End):

```bash
# Navigation
alias ll='ls -alF'
alias la='ls -A'
alias ..='cd ..'
alias ...='cd ../..'

# Mac Mini shortcuts
alias mm='ssh macmini'
alias mmcode='code --remote ssh-remote+macmini /Users/yourmacusername'

# Windows interop
alias explore='explorer.exe .'
alias clip='clip.exe'

# Git
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias gl='git log --oneline --graph --decorate'

# Python
alias py='python3'
alias pip='pip3'
alias ve='python3 -m venv .venv && source .venv/bin/activate'
alias va='source .venv/bin/activate'

# Misc
alias reload='source ~/.zshrc'
alias zshconfig='nano ~/.zshrc'
alias update='sudo apt update && sudo apt upgrade -y'
```

Reload:

```bash
source ~/.zshrc
```

---

## Quick reference

| What | Command |
| --- | --- |
| SSH to Mac Mini | `mm` |
| Open Mac Mini in VS Code | `mmcode` |
| Jump to directory | `z partialname` |
| Activate Python venv | `va` |
| Create new venv | `ve` |
| Reconfigure shell prompt | `p10k configure` |
| Restart WSL (from PowerShell) | `wsl --shutdown` |
| Update Ubuntu packages | `update` |

---

## Challenges I'm still working on

**Mac Mini always-on isn't fully reliable yet.**

The whole setup depends on the Mac Mini being reachable at all times. In normal conditions it works great, but there's one edge case that's been annoying me: power outages. Even a brief one causes the Mac to auto-restart — but after reboot, it sits at the login screen. And because it needs a login before it connects to Wi-Fi, Tailscale never comes up, which means I can't SSH in remotely.

I'm working on a fix. My current thinking is either a LAN cable (wired connection doesn't need a login to come up) or a small UPS to keep the Mac Mini running through short outages. Neither is fully sorted yet — I'll update this once I land on something that actually works.

---

## Summary

I used to think Windows was a noob thing. In college I was that guy — very pro-Linux, proud of it, and honestly couldn't do anything useful on Windows if you handed me a PowerShell prompt. That part hasn't changed much, to be fair. If you give me PowerShell and ask me to do something, I'm still lost.

But this whole setup made me realise something: the goal shouldn't be to be comfortable in *one* environment — it should be to be capable enough to work in *any* environment. This was my opportunity to test that, and it's been a good one.

Because if Tony Stark could build that in a cave with a box of scraps, I think I can figure out how to code from a Windows laptop.

Why can't I?