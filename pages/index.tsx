import AboutSection from "@/components/About/AboutSection"
import BlogList, { PostThumbnail } from "@/components/Blog/BlogList"
import { Contact } from "@/components/Contact"
import EducationSection from "@/components/Education/EducationSection"
import ExperienceSection from "@/components/Experience/ExperienceSection"
import Hero from "@/components/Hero/Hero"
import ProjectsSection from "@/components/Projects/ProjectsSection"
import SkillsSection from "@/components/Skills/SkillsSection"
import { getAllPostsMeta } from "@/lib/posts"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"

type HomeProps = {
  locale: string
  posts: PostThumbnail[]
}

export default function HomePage({ locale, posts }: HomeProps): JSX.Element {
  const { t } = useTranslation()

  // Downloads the CV placed at /public/img/cv/cv-file-<locale>.pdf.
  // Replace that file with the real PDF - see README for details.
  function downloadCV(): void {
    const a = document.createElement("a")
    a.href = `${process.env.NEXT_PUBLIC_HOST_URL}/img/cv/cv-file-${locale}.pdf`
    a.download = `${t("downloadCvFileName")} ${locale}`
    a.click()
  }

  return (
    <>
      <Head>
        <title>{t("seo.home.title")}</title>
        <meta name='description' content={t("seo.home.description")} />
        <meta name='author' content={t("seo.home.author")} />
        <meta name='og:title' content={t("seo.home.title")} key='title' />
        <meta name='og:description' content={t("seo.home.description")} />
        <meta name='og:url' content={`${process.env.NEXT_PUBLIC_HOST_URL}`} />
        <meta
          name='og:image'
          content={`${process.env.NEXT_PUBLIC_HOST_URL}/img/website-thumbnail.jpg`}
        />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={t("seo.home.title")} />
        <meta name='twitter:description' content={t("seo.home.description")} />
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href={`${process.env.NEXT_PUBLIC_HOST_URL}`} />
        <link
          rel='alternate'
          hrefLang='en'
          href={`${process.env.NEXT_PUBLIC_HOST_URL}`}
        />
        <link
          rel='alternate'
          hrefLang='de'
          href={`${process.env.NEXT_PUBLIC_HOST_URL}/de`}
        />
      </Head>

      <div className='w-full'>
        <Hero onDownloadCV={downloadCV} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />

        {/* Engineering notes / blog - see content/posts and lib/posts.ts */}
        <section
          id='blog'
          className='w-full scroll-mt-16 bg-cLight py-24 dark:bg-cDeepDark'
        >
          <div className='container'>
            <div className='mb-10 flex items-center gap-3 font-mono text-sm text-primary'>
              <span>//</span>
              <span>{t("blogSection.eyebrow")}</span>
            </div>
            <h2 className='mb-4 text-3xl font-black text-cDark dark:text-cLight md:text-4xl'>
              {t("blogSection.heading")}
            </h2>
            <p className='mb-12 max-w-2xl text-cDark/70 dark:text-cLightGrey'>
              {t("blogSection.subheading")}
            </p>
            {posts.length > 0 ? (
              <BlogList posts={posts} />
            ) : (
              <p className='font-mono text-sm text-cDark/50 dark:text-cLightGrey/50'>
                {t("blogSection.emptyState")}
              </p>
            )}
          </div>
        </section>

        <Contact />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // getAllPostsMeta() uses fs and must only ever be called here (or in
  // another getStaticProps/getStaticPaths/getServerSideProps), never
  // imported into a component body - see lib/posts.ts for why.
  const posts: PostThumbnail[] = getAllPostsMeta()
    .filter((post) => post.lang.slice(0, 2) === locale)
    .map((post) => ({
      title: post.title,
      description:
        post.description && post.description.length >= 120
          ? post.description.slice(0, 120) + " ..."
          : (post.description ?? ""),
      thumbnail: post.thumbnail ?? "",
      slug: post.slug,
      hasButton: false,
      type: post.cardType ?? "card",
      linkType: ""
    }))

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      locale,
      posts
    }
  }
}
