---
title: "Understanding database indexes, Part 1: B-trees"
description: "A practical mental model for how B-tree indexes work in relational databases, and when they earn their cost."
pubDate: 2026-03-28
category: "Databases"
tags: ["databases", "sql", "performance", "indexes"]
series: "Understanding database indexes"
seriesOrder: 1
---

Indexes are the first tool you reach for when a query is slow, and also one
of the most misunderstood. This series builds a practical mental model for
how they actually work — starting with the workhorse of them all, the
B-tree.

## Why not just scan?

Without an index, a query like this:

```sql
SELECT * FROM users WHERE email = 'alice@example.com';
```

forces the database to read every row in `users`. That's fine for 1,000
rows. It's ruinous for 100 million.

## The B-tree, informally

A B-tree is a balanced, sorted, multi-level structure. Think of a phone
book with a huge index at the front, each entry pointing into a smaller
sub-index, and so on, until you reach the actual page with the person's
number.

The key properties:

1. **Balanced** — every leaf is the same distance from the root
2. **Sorted** — keys within a node are ordered
3. **Fan-out** — each node holds many keys, so the tree stays shallow

A table with a billion rows typically has a B-tree of depth 4 — meaning a
lookup is 4 disk reads in the worst case.

### When B-trees help

- Equality lookups: `WHERE id = 42`
- Range scans: `WHERE created_at > '2026-01-01'`
- Ordered output: `ORDER BY created_at`
- Prefix matches on composite keys

### When they don't

- Leading-wildcard `LIKE` patterns (`LIKE '%foo'`)
- Low-selectivity columns (boolean flags)
- Function calls on the indexed column

## What indexes cost

Every index is data you have to maintain on every write. Rule of thumb: an
index pays for itself if it turns a table scan into a point lookup on a
hot query path. For everything else, measure.

In **part 2**, we'll look at hash indexes and when they beat B-trees.
