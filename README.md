# Manish Parajuli - Portfolio

Personal portfolio site. Next.js 14 (pages router) + TypeScript + Tailwind
CSS + a lightweight fs/gray-matter/next-mdx-remote content pipeline (for
the Engineering Notes / blog) + next-i18next (English / German).

Built on top of the `nextjs-tailwind-portfolio-starter` component-demo
starter kit - the demo sections (Lorem ipsum cards, slider, gallery,
testimonials) have been replaced with real About / Experience / Projects /
Skills / Education / Blog / Contact sections. The old demo components are
still present under `components/` (Splide, Gallery, About/InfoCard, etc.)
but are no longer rendered on any page - safe to delete later if unused,
or reuse if you want that kind of component again.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in the values, see below
pnpm dev
```

Open http://localhost:3000.

```bash
pnpm build   # next build - Next.js reads content/posts directly, no separate content-build step
pnpm lint    # next lint + prettier --check
pnpm test    # cypress run
```

> **Note:** this project was restructured in an offline sandbox with no
> network access, so `pnpm install` could not actually be run here -
> meaning **no `pnpm-lock.yaml` was generated**, and `pnpm build` /
> `pnpm dev` were not verified to run. Run `pnpm install` locally as your
> first step; it will generate the lockfile and should complete cleanly
> with no `--force` / `--legacy-peer-deps` flags needed, since the
> Contentlayer packages that caused the previous peer-dependency conflict
> (`next-contentlayer@0.3.4` required Next `^12 || ^13`, incompatible with
> the project's Next 14) have been removed - see "Content architecture"
> below. Commit the generated `pnpm-lock.yaml`.

## Content architecture

The blog ("Engineering Notes") no longer uses Contentlayer. It's been
replaced with a small, dependency-light pipeline that keeps every
requirement Contentlayer provided, without pinning an old Next.js peer
dependency:

- **`lib/posts.ts`** - reads `content/posts/**/*.mdx` with Node's `fs` and
  parses frontmatter with `gray-matter`. Exports `getAllPosts()`,
  `getAllPostsMeta()`, and `getPostBySlug()`. Server-only - only ever
  called from `getStaticProps`/`getStaticPaths`/`getServerSideProps`.
- **`next-mdx-remote`** (pinned to `^6.0.0`, which fixes
  [CVE-2026-0969](https://github.com/advisories/GHSA-g4xw-jxrg-5f6m), an
  RCE in `serialize()` present in 4.3.0-5.x) compiles each post's MDX body
  to React inside `pages/posts/[slug].tsx`'s `getStaticProps`, via
  `serialize()` + `<MDXRemote>` (see `components/MDXComponents.tsx`).
- All the original frontmatter fields are preserved (title, subTitle,
  description, readTime, date, lang, thumbnail, cardType), as are blog
  card rendering, individual post pages, `/sitemap.xml`, and per-post
  locale routing (`lang.slice(0,2)` matched against the active
  next-i18next locale, same as before).
- No `next.config.js` MDX/webpack plugin is needed - MDX compiles via a
  plain function call in `getStaticProps`, not a build-time loader.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable                  | Purpose                                              |
| -------------------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_HOST_URL`     | Your deployed domain (used in SEO tags & sitemap)     |
| `NEXT_PUBLIC_GA_ID`        | Optional - GA4 measurement id, leave blank to skip    |
| `SENDGRID_API_KEY`         | Server-only. Powers the contact form.                 |
| `CONTACT_RECEIVER_EMAIL`   | Where contact-form messages get delivered             |
| `CONTACT_SENDER_EMAIL`     | Must be a SendGrid-verified sender                    |

## TODO before this goes live

Content (`public/locales/en/common.json` and `de/common.json`):

- [ ] `hero.githubUrl`, `hero.linkedinUrl`, `contact.githubUrl`,
      `contact.linkedinUrl` - replace the `[ADD ... URL]` placeholders
- [ ] `contact.email` - add your professional email
- [ ] `experience.items[0]` - real company name, job title, dates
- [ ] `education.items[0]` - university name and MSc dates

Files:

- [ ] `/public/img/cv/cv-file-en.pdf` and `cv-file-de.pdf` - your real CV
      (the "Resume" button in the hero downloads this path)
- [ ] `/public/img/website-thumbnail.jpg` - OG/social preview image (still
      the template's placeholder graphic)
- [ ] `/public/favicon/*` - still the template's generic favicon
- [ ] `/public/img/logo.svg` - generic template mark, used in the footer
      wordmark area; safe to leave (footer now uses a `~/manish` text
      wordmark instead) or replace if you'd rather have a graphic
- [ ] Project GitHub URLs / live URLs - once you have repos, add
      `githubUrl` / `liveUrl` to the relevant entries in
      `projects.items` (both locale files) and they'll render
      automatically in `ProjectCard`
- [ ] `content/posts/` is currently empty - see `content/posts/README.md`
      for the format when you're ready to publish engineering notes

Before deploying:

- [ ] Update `robots.txt` and `NEXT_PUBLIC_HOST_URL` once you've settled
      on a real domain (currently placeholder `manishparajuli.dev`)
- [ ] Run `pnpm build` and fix anything it flags
- [ ] Check every nav link scrolls to the right section, in both light and
      dark mode, at mobile/tablet/desktop widths
- [ ] Verify the contact form actually sends (needs a real SendGrid key +
      verified sender)
