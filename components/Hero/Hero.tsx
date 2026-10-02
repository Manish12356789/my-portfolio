import ScrollToSection from "@/hooks/scroll-to-section"
import { fadeIn } from "@/constants/animations"
import { motion, useInView } from "framer-motion"
import { useTranslation } from "next-i18next"
import { useRef } from "react"

type Params = {
  onDownloadCV: () => void
}

/**
 * Hero section styled as a developer terminal:
 * left = intro/CTAs written like a shell session, right = a mock
 * "GET /api/<name>" JSON response window. All copy is translation-driven
 * (see public/locales/en/common.json -> "hero") so content can be edited
 * without touching this component.
 */
export default function Hero({ onDownloadCV }: Params) {
  const { t } = useTranslation()
  const heroRef = useRef(null)
  const heroInViewIsInView = useInView(heroRef, { once: true })

  return (
    <motion.section
      ref={heroRef}
      variants={fadeIn}
      initial='hidden'
      animate={heroInViewIsInView ? "visible" : "hidden"}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className='flex min-h-[100vh] items-center border-b border-cLightGrey/20 bg-cLight py-[120px] dark:bg-cDeepDark'
      id='home'
    >
      <div className='container'>
        <div className='grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10'>
          {/* Left: intro */}
          <div className='flex flex-col items-start gap-5 text-left'>
            {/* Availability badge */}
            <div className='inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-mono text-xs text-primary'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75'></span>
                <span className='relative inline-flex h-2 w-2 rounded-full bg-primary'></span>
              </span>
              {t("hero.availability")}
            </div>

            {/* Shell prompt */}
            <p
              data-test='hero-prompt'
              className='font-mono text-sm text-cDark/60 dark:text-cLightGrey'
            >
              <span className='text-primary'>{t("hero.promptUser")}</span>
              {t("hero.promptPath")}
              <span className='text-cDark dark:text-cOffWhite'>
                {" "}
                {t("hero.promptCommand")}
              </span>
            </p>

            {/* Name + role */}
            <h1
              data-test='hero-title'
              className='font-mono text-4xl font-extrabold leading-tight text-cDark dark:text-cLight sm:text-5xl'
            >
              {t("hero.name")}
              <span className='text-primary'>.</span>
              <br />
              <span className='text-primary'>{t("hero.role")}</span>
            </h1>

            <p className='max-w-[520px] text-lg leading-relaxed text-cDark/80 dark:text-cLightGrey'>
              {t("hero.description")}
            </p>

            {/* CTAs */}
            <div className='mt-2 flex flex-wrap items-center gap-4'>
              <ScrollToSection href='projects'>
                <button
                  data-test='hero-view-projects'
                  className='inline-flex h-[48px] items-center gap-2 rounded-md bg-primary px-6 font-mono font-semibold text-cLight transition-all hover:bg-primaryDark'
                >
                  {t("hero.viewProjectsButton")}
                  <span className='material-symbols-outlined text-lg'>
                    north_east
                  </span>
                </button>
              </ScrollToSection>

              <button
                data-test='hero-download-cv'
                onClick={onDownloadCV}
                className='inline-flex h-[48px] items-center rounded-md border border-cDark/30 px-6 font-mono font-semibold text-cDark transition-all hover:border-primary hover:text-primary dark:border-cLightGrey/30 dark:text-cLight'
              >
                {t("hero.resumeButton")}
              </button>
            </div>

            {/* Socials */}
            <div className='mt-4 flex items-center gap-5 font-mono text-sm text-cDark/70 dark:text-cLightGrey'>
              <a
                href={t("hero.githubUrl")}
                target='_blank'
                rel='noopener noreferrer'
                className='transition-colors hover:text-primary'
              >
                {t("hero.githubLabel")}
              </a>
              <a
                href={t("hero.linkedinUrl")}
                target='_blank'
                rel='noopener noreferrer'
                className='transition-colors hover:text-primary'
              >
                {t("hero.linkedinLabel")}
              </a>
              <ScrollToSection href='contact'>
                <span className='cursor-pointer transition-colors hover:text-primary'>
                  {t("hero.contactLabel")}
                </span>
              </ScrollToSection>
            </div>
          </div>

          {/* Right: terminal / JSON response window */}
          <div className='w-full'>
            <div className='overflow-hidden rounded-xl border border-cLightGrey/20 bg-cDark shadow-2xl'>
              {/* window chrome */}
              <div className='flex items-center justify-between border-b border-cLightGrey/10 bg-black/20 px-4 py-3'>
                <div className='flex gap-2'>
                  <span className='h-3 w-3 rounded-full bg-[#ff5f57]'></span>
                  <span className='h-3 w-3 rounded-full bg-[#febc2e]'></span>
                  <span className='h-3 w-3 rounded-full bg-[#28c840]'></span>
                </div>
                <span className='font-mono text-xs text-cLightGrey'>
                  {t("hero.apiRoute")}
                </span>
              </div>

              {/* JSON body */}
              <div className='space-y-1 px-6 py-6 font-mono text-sm leading-7'>
                <p className='text-cLightGrey'>{"{"}</p>
                <p className='pl-4'>
                  <span className='text-primaryLight'>&quot;name&quot;</span>
                  <span className='text-cLightGrey'>: </span>
                  <span className='text-cOffWhite'>
                    &quot;{t("hero.name")}&quot;
                  </span>
                  <span className='text-cLightGrey'>,</span>
                </p>
                <p className='pl-4'>
                  <span className='text-primaryLight'>&quot;role&quot;</span>
                  <span className='text-cLightGrey'>: </span>
                  <span className='text-cOffWhite'>
                    &quot;{t("hero.role")}&quot;
                  </span>
                  <span className='text-cLightGrey'>,</span>
                </p>
                <p className='pl-4'>
                  <span className='text-primaryLight'>
                    &quot;location&quot;
                  </span>
                  <span className='text-cLightGrey'>: </span>
                  <span className='text-cOffWhite'>
                    &quot;{t("hero.location")}&quot;
                  </span>
                  <span className='text-cLightGrey'>,</span>
                </p>
                <p className='pl-4'>
                  <span className='text-primaryLight'>
                    &quot;currently&quot;
                  </span>
                  <span className='text-cLightGrey'>: </span>
                  <span className='text-cOffWhite'>
                    &quot;{t("hero.currently")}&quot;
                  </span>
                  <span className='text-cLightGrey'>,</span>
                </p>
                <p className='pl-4'>
                  <span className='text-primaryLight'>&quot;stack&quot;</span>
                  <span className='text-cLightGrey'>: [</span>
                </p>
                {(t("hero.stack", { returnObjects: true }) as string[]).map(
                  (tech, index, arr) => (
                    <p key={tech} className='pl-8 text-cOffWhite'>
                      &quot;{tech}&quot;
                      {index < arr.length - 1 ? (
                        <span className='text-cLightGrey'>,</span>
                      ) : null}
                    </p>
                  )
                )}
                <p className='pl-4 text-cLightGrey'>],</p>
                <p className='pl-4'>
                  <span className='text-primaryLight'>&quot;open_to&quot;</span>
                  <span className='text-cLightGrey'>: </span>
                  <span className='text-cOffWhite'>
                    &quot;{t("hero.openTo")}&quot;
                  </span>
                </p>
                <p className='text-cLightGrey'>{"}"}</p>
              </div>

              <div className='flex items-center justify-between border-t border-cLightGrey/10 bg-black/20 px-4 py-2 font-mono text-xs'>
                <span className='text-success'>{t("hero.statusCode")}</span>
                <span className='text-cLightGrey'>{t("hero.latency")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
