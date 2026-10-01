import InfoExperience from "@/components/About/InfoExperience"
import { fadeIn } from "@/constants/animations"
import { motion, useInView } from "framer-motion"
import { useTranslation } from "next-i18next"
import { useRef } from "react"

type EducationItem = {
  icon: string
  date: string
  title: string
  subTitle: string
  description: string
}

export default function EducationSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const items = t("education.items", {
    returnObjects: true
  }) as EducationItem[]

  return (
    <motion.section
      ref={ref}
      variants={fadeIn}
      initial='hidden'
      animate={isInView ? "visible" : "hidden"}
      transition={{ ease: "easeOut", duration: 0.5 }}
      id='education'
      className='w-full scroll-mt-16 bg-cOffWhite py-24 dark:bg-cDark'
    >
      <div className='container'>
        <div className='mb-10 flex items-center gap-3 font-mono text-sm text-primary'>
          <span>//</span>
          <span>{t("education.eyebrow")}</span>
        </div>
        <h2 className='mb-12 text-3xl font-black text-cDark dark:text-cLight md:text-4xl'>
          {t("education.heading")}
        </h2>

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
