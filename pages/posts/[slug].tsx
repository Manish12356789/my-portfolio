import BackButton from "@/components/Button/BackButton"
import { Mdx } from "@/components/MDXComponents"
import { getAllPosts, getPostBySlug, PostMeta } from "@/lib/posts"
import styles from "@/styles/article.module.scss"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"

type PostProps = {
  meta: PostMeta
  source: MDXRemoteSerializeResult
}

function PostPage({ meta, source }: PostProps): JSX.Element {
  const { t } = useTranslation()

  // Structured data via JSON.stringify (not manual string interpolation) so
  // any quotes/newlines in the post's title/description can't break the
  // JSON or be used to inject markup - the old template built this string
  // by hand, which was unsafe for arbitrary post content.
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    name: t("seo.home.author"),
    editor: t("seo.home.author"),
    headline: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_HOST_URL}${meta.slug}`,
    image: meta.thumbnail
      ? `${process.env.NEXT_PUBLIC_HOST_URL}${meta.thumbnail}`
      : undefined,
    author: {
      "@type": "Person",
      name: t("seo.home.author")
    },
    logo: `${process.env.NEXT_PUBLIC_HOST_URL}/img/logo.svg`,
    datePublished: meta.date,
    dateModified: meta.date
  })

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name='description' content={meta.description} />
        <meta name='author' content={t("seo.home.author")} />
        <meta name='og:title' content={meta.title} key='title' />
        <meta name='og:description' content={meta.description} />
        <meta
          name='og:url'
          content={`${process.env.NEXT_PUBLIC_HOST_URL}${meta.slug}`}
        />
        {meta.thumbnail && (
          <meta
            name='og:image'
            content={`${process.env.NEXT_PUBLIC_HOST_URL}${meta.thumbnail}`}
          />
        )}
        <meta name='robots' content='index, follow' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </Head>
      <div className='my-[80px] flex w-full flex-col items-center justify-center'>
        <div className='container'>
          <BackButton routePath='/' />
        </div>
        <div className='container flex flex-wrap items-center justify-center'>
          <article
            className={`prose w-full py-6 dark:prose-invert ${styles.cArticle}`}
          >
            <div className='mb-4 flex w-full items-center justify-between'>
              <div className='flex items-center gap-2'>
                <span className='material-symbols-outlined m-0 cursor-default text-lg'>
                  timer
                </span>
                <p className='m-0 text-primary'>
                  {meta.readTime} {t("blogPage.minutes")}
                </p>
              </div>

              <div className='flex items-baseline gap-2'>
                <p className='m-0 text-cDark dark:text-cLight'>
                  {t("blogPage.published")}:
                </p>
                <p className='m-0 text-primary'>{meta.date}</p>
              </div>
            </div>
            <h1 className='m-0'>{meta.title}</h1>
            {meta.subTitle && (
              <h2 className='mb-8 mt-0 text-xl font-light italic'>
                {meta.subTitle}
              </h2>
            )}
            {meta.thumbnail && (
              <Image
                src={meta.thumbnail}
                width='600'
                height='300'
                style={{ width: "100%", height: "auto" }}
                alt={meta.title}
              />
            )}

            {meta.description && (
              <p className='text-x mt-2'>{meta.description}</p>
            )}
            <hr className='my-4' />
            <Mdx source={source} />
          </article>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts()

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slugAsParams },
      locale: post.lang.slice(0, 2) // e.g. "en-US" -> "en"
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
  locale
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const post = getPostBySlug(params!.slug as string)

  if (!post) {
    return { notFound: true }
  }

  const { content, ...meta } = post
  const source = await serialize(content)

  return {
    props: {
      meta,
      source,
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}

export default PostPage
