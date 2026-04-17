---
title: "Tools I use in 2026"
description: "A snapshot of the editor, terminal, and dev tools I'm reaching for this year."
pubDate: 2026-02-14
category: "Tools"
tags: ["tools", "workflow", "editor"]
---

Every year or so I do a pass on my dev environment. Here's the 2026
snapshot.

## Editor

Still **Neovim**, with a small LSP-focused config. Every attempt to
switch to a graphical editor has lasted about a week before I come
back.

```lua
-- A minimal LSP setup
require('lspconfig').ts_ls.setup({})
require('lspconfig').rust_analyzer.setup({})
```

## Terminal

**Ghostty** replaced iTerm2 this year. It's faster, simpler, and the
config is a single file.

## Shell

**Fish**, because I'd rather spend zero time configuring autocomplete
and history.

## Languages I reach for

- **TypeScript** for most application code
- **Rust** when I need performance or a native binary
- **Go** for backend services I want to be boring
- **Python** for scripts and one-offs

## The rest

- **tmux** for session management
- **ripgrep** and **fd** for search
- **fzf** for fuzzy-finding everything
- **lazygit** for the rare moments I don't use git from the CLI
- **1Password** for everything secret

Nothing here is new or clever. That's the point — I want my tools to be
invisible.
