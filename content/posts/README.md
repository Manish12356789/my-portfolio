# Engineering Notes / Blog

This folder is intentionally empty right now - the lorem-ipsum demo
articles that shipped with the starter kit have been removed so no fake
content is published.

To publish a note, add a new `.mdx` file here (or in a subfolder - nesting
is supported). `lib/posts.ts` picks up `content/posts/**/*.mdx`
automatically at build time via Node's `fs` + `gray-matter`; the MDX body
is compiled with `next-mdx-remote` in `pages/posts/[slug].tsx`'s
`getStaticProps`. No content-generation step is required before `next
build` - just add the file. Use this frontmatter shape:

```
---
title: Debugging a slow Laravel query
subTitle: What I learned profiling N+1 queries
description: A short (1-2 sentence) summary shown on the card and in SEO tags.
readTime: 6
date: 2026-01-01
lang: en
thumbnail: /img/blog/my-post/cover.webp
cardType: card
---

Your article content here, in Markdown/MDX.
```

Ideas from the portfolio brief you can turn into real posts once you've
built something to write about:

- What I learned building the transportation management system
- Laravel backend development lessons
- Debugging real-world Laravel applications
- Designing REST APIs
- Database design lessons
- Transitioning from backend development toward broader software
  engineering
- Docker and development environments
- Python projects
- MSc Software Engineering coursework notes
- AI and software engineering
- Building data-driven applications

New posts are picked up automatically the next time `pnpm dev` or
`pnpm build` runs - no separate generation step, no caching to clear.
