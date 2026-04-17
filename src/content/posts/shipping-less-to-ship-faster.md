---
title: "Shipping less to ship faster"
description: "The counterintuitive trick to moving quickly on a project: aggressively cut scope before writing any code."
pubDate: 2026-04-10
category: "Craft"
tags: ["craft", "productivity", "product"]
---

The fastest engineering teams I've worked on weren't faster at writing
code. They were better at *not* writing code.

## Scope is the lever

When a project slips, the instinctive move is to find ways to write code
faster — pairing, overtime, better tools, more people. The leverage
there is tiny.

The lever with 10× return is **cutting scope**. Every feature you don't
build:

- Doesn't need to be designed
- Doesn't need to be tested
- Doesn't need to be maintained
- Doesn't need to be deprecated later

## The 80/20 isn't good enough

Most of us have heard "80% of the value in 20% of the effort." For
shipping fast, I go further: what's the **least** I can ship that's still
useful to *somebody*?

> If you're not embarrassed by the first version of your product, you've
> shipped too late. — often attributed to Reid Hoffman

## A concrete example

On a recent project, the brief was a full admin dashboard. Instead, we
shipped:

1. One read-only page that showed the 3 most-used metrics
2. A "request edit" button that emailed our team

It turned out the internal users we were building for only *actually*
edited data once a week. A full CRUD UI would have been four months of
work for a problem a mailto: link solved in a day.

## The practice

Before writing any code, force yourself to answer:

- What's the **smallest change** that moves the needle?
- Who gets value from it **this week**?
- What am I **definitely not building** in this version?

The last question is the hardest. Write the answer down.
