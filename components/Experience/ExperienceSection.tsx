import InfoExperience from "@/components/About/InfoExperience"
import { fadeIn } from "@/constants/animations"
import { motion, useInView } from "framer-motion"
import { useTranslation } from "next-i18next"
import { useRef } from "react"

type ExperienceItem = {
  icon: string
  date: string
  title: string
  subTitle: string
  description: string
}

export default function ExperienceSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const items = t("experience.items", {
    returnObjects: true
  }) as ExperienceItem[]

  return (
    <motion.section
      ref={ref}
      variants={fadeIn}
      initial='hidden'
      animate={isInView ? "visible" : "hidden"}
      transition={{ ease: "easeOut", duration: 0.5 }}
      id='experience'
      className='w-full scroll-mt-16 bg-cLight py-24 dark:bg-cDeepDark'
    >
      <div className='container'>
        <div className='mb-10 flex items-center gap-3 font-mono text-sm text-primary'>
          <span>//</span>
          <span>{t("experience.eyebrow")}</span>
        </div>
        <h2 className='mb-4 text-3xl font-black text-cDark dark:text-cLight md:text-4xl'>
          {t("experience.heading")}
        </h2>
        <p className='mb-12 max-w-2xl text-cDark/70 dark:text-cLightGrey'>
          {t("experience.note")}
        </p>

        <div className='w-full space-y-8 md:w-3/4'>
          {items.map((item) => (
            <InfoExperience
              key={item.title}
              icon={item.icon}
              date={item.date}
              title={item.title}
              subTitle={item.subTitle}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
