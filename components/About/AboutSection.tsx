import { fadeIn } from "@/constants/animations"
import { motion, useInView } from "framer-motion"
import { useTranslation } from "next-i18next"
import { useRef } from "react"

export default function AboutSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const paragraphs = t("about.paragraphs", { returnObjects: true }) as string[]
  const journey = t("about.journey", { returnObjects: true }) as string[]

  return (
    <motion.section
      ref={ref}
      variants={fadeIn}
      initial='hidden'
      animate={isInView ? "visible" : "hidden"}
      transition={{ ease: "easeOut", duration: 0.5 }}
      id='about'
      className='w-full scroll-mt-16 bg-cLight py-24 dark:bg-cDeepDark'
    >
      <div className='container'>
        <div className='mb-10 flex items-center gap-3 font-mono text-sm text-primary'>
          <span>//</span>
          <span>{t("about.eyebrow")}</span>
        </div>

        <div className='grid grid-cols-1 gap-14 lg:grid-cols-3'>
          <div className='space-y-5 lg:col-span-2'>
            <h2 className='mb-4 text-3xl font-black text-cDark dark:text-cLight md:text-4xl'>
              {t("about.heading")}
            </h2>
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className='text-lg leading-relaxed text-cDark/80 dark:text-cLightGrey'
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Journey timeline chips */}
          <div className='space-y-3'>
            <p className='mb-2 font-mono text-xs uppercase tracking-wider text-cDark/50 dark:text-cLightGrey/60'>
              {t("about.journeyLabel")}
            </p>
            {journey.map((step, index) => (
              <div key={step} className='flex items-start gap-3'>
                <div className='flex flex-col items-center'>
                  <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary font-mono text-xs text-primary'>
                    {index + 1}
                  </span>
                  {index < journey.length - 1 && (
                    <span className='mt-1 h-6 w-[1px] bg-cLightGrey/30'></span>
                  )}
                </div>
                <p className='pt-0.5 text-sm text-cDark/80 dark:text-cLightGrey'>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
