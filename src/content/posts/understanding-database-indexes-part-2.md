---
title: "Understanding database indexes, Part 2: Hash indexes"
description: "Hash indexes are O(1) for equality lookups — so why aren't they the default? A look at their trade-offs."
pubDate: 2026-04-04
category: "Databases"
tags: ["databases", "sql", "performance", "indexes"]
series: "Understanding database indexes"
seriesOrder: 2
---

[Part 1](./understanding-database-indexes-part-1/) covered B-trees. Today:
hash indexes, which on paper look strictly better for point lookups.

## The pitch

A hash index maps a key to a bucket via a hash function. The cost of a
lookup is O(1) on average — no tree traversal.

```sql
CREATE INDEX idx_users_email ON users USING HASH (email);
```

Sounds like we should use hash indexes everywhere. We don't. Why?

## The catch

Hash indexes give up almost everything B-trees do for free:

| Operation           | B-tree | Hash |
|---------------------|:------:|:----:|
| Equality lookup     |   ✓    |  ✓   |
| Range scan          |   ✓    |  ✗   |
| Ordered output      |   ✓    |  ✗   |
| Prefix match        |   ✓    |  ✗   |

In practice, most real-world queries want *some* of those extras, so the
B-tree wins by default.

## When hash indexes earn their keep

- Huge tables where you only do `=` lookups
- Join columns with very high cardinality
- In-memory systems (Redis, some OLAP engines) where the B-tree's
  cache-friendly layout matters less

## Takeaways

Reach for hash indexes consciously. For OLTP workloads on Postgres or
MySQL, the B-tree remains the right default unless you've measured and
confirmed the hash variant wins.

Next up in part 3: composite indexes and why column order matters.
