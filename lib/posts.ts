import fs from "fs"
import path from "path"
import matter from "gray-matter"

/**
 * Content architecture (replaces Contentlayer, which pinned a peer
 * dependency of next@^12||^13 and could not install against Next 14).
 *
 * Posts live at content/posts/**\/*.mdx. This module reads them directly
 * with Node's fs + gray-matter (frontmatter parsing) at build time only.
 * MDX -> React compilation happens separately, in getStaticProps of the
 * page that renders a post, via next-mdx-remote's `serialize()` - see
 * pages/posts/[slug].tsx.
 *
 * IMPORTANT: this module uses `fs`/`path` and must only be imported from
 * getStaticProps / getStaticPaths / getServerSideProps (server-only
 * functions that Next.js strips from the client bundle). Do NOT import it
 * at the top of a component that also renders on the client - that will
 * break the webpack build (`fs` doesn't exist in the browser).
 *
 * Frontmatter fields:
 *   title       string   required
 *   subTitle    string   optional
 *   description string   optional - shown on cards & used for SEO tags
 *   readTime    number   optional - minutes, authored by hand (not computed)
 *   date        string   required - e.g. 2026-01-01
 *   lang        string   required - e.g. "en" or "en-US" (matched via
 *                         lang.slice(0, 2) against the active next-i18next
 *                         locale, same behaviour as the old Contentlayer
 *                         setup)
 *   thumbnail   string   optional - path under /public
 *   cardType    string   optional - "card" renders a BlogCard, anything
 *                         else renders CardPlaceholder (see BlogList.tsx)
 */

const POSTS_DIRECTORY = path.join(process.cwd(), "content/posts")

export type PostMeta = {
  title: string
  subTitle?: string
  description?: string
  readTime?: number
  date: string
  lang: string
  thumbnail?: string
  cardType?: string
  /** Route path, e.g. "/posts/my-post" - use for <Link href> */
  slug: string
  /** Route param, e.g. "my-post" - use for getStaticPaths/getStaticProps */
  slugAsParams: string
}

export type PostWithContent = PostMeta & {
  /** Raw, un-compiled MDX body - pass to next-mdx-remote's serialize() */
  content: string
}

function walkMdxFiles(dir: string, base = ""): string[] {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const relPath = base ? `${base}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      return walkMdxFiles(path.join(dir, entry.name), relPath)
    }
    return entry.name.toLowerCase().endsWith(".mdx") ? [relPath] : []
  })
}

function readPost(relPath: string): PostWithContent {
  const fullPath = path.join(POSTS_DIRECTORY, relPath)
  const raw = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(raw)

  if (!data.title || !data.date || !data.lang) {
    throw new Error(
      `content/posts/${relPath} is missing a required frontmatter field ` +
        `(title, date and lang are all required). See lib/posts.ts for the schema.`
    )
  }

  const slugAsParams = relPath.replace(/\.mdx$/i, "")

  return {
    title: String(data.title).trim(),
    subTitle: data.subTitle ? String(data.subTitle).trim() : undefined,
    description: data.description ? String(data.description).trim() : undefined,
    readTime: typeof data.readTime === "number" ? data.readTime : undefined,
    date: String(data.date).trim(),
    lang: String(data.lang).trim(),
    thumbnail: data.thumbnail ? String(data.thumbnail).trim() : undefined,
    cardType: data.cardType ? String(data.cardType).trim() : undefined,
    slug: `/posts/${slugAsParams}`,
    slugAsParams,
    content
  }
}

/** All posts, newest first, including the raw MDX body. Server-only. */
export function getAllPosts(): PostWithContent[] {
  return walkMdxFiles(POSTS_DIRECTORY)
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

/** All posts' metadata only (no MDX body) - cheap, safe to serialize as page props. */
export function getAllPostsMeta(): PostMeta[] {
  return getAllPosts().map(({ content: _content, ...meta }) => meta)
}

/** A single post (with its raw MDX body) by its route param. Server-only. */
export function getPostBySlug(
  slugAsParams: string
): PostWithContent | undefined {
  return getAllPosts().find((post) => post.slugAsParams === slugAsParams)
}
