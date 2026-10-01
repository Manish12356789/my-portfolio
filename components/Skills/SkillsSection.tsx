import { fadeIn } from "@/constants/animations"
import { motion, useInView } from "framer-motion"
import { useTranslation } from "next-i18next"
import { useRef } from "react"

type SkillCategory = {
  name: string
  skills: string[]
}

export default function SkillsSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const categories = t("skills.categories", {
    returnObjects: true
  }) as SkillCategory[]

  return (
    <motion.section
      ref={ref}
      variants={fadeIn}
      initial='hidden'
      animate={isInView ? "visible" : "hidden"}
      transition={{ ease: "easeOut", duration: 0.5 }}
      id='skills'
      className='w-full scroll-mt-16 bg-cOffWhite py-24 dark:bg-cDark'
    >
      <div className='container'>
        <div className='mb-10 flex items-center gap-3 font-mono text-sm text-primary'>
          <span>//</span>
          <span>{t("skills.eyebrow")}</span>
        </div>
        <h2 className='mb-14 text-3xl font-black text-cDark dark:text-cLight md:text-4xl'>
          {t("skills.heading")}
        </h2>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {categories.map((category) => (
            <div
              key={category.name}
              className='rounded-lg border border-cLightGrey/20 bg-cLight p-6 dark:bg-cDeepDark'
            >
              <h3 className='mb-4 font-mono text-sm font-bold uppercase tracking-wider text-primary'>
                {category.name}
              </h3>
              <div className='flex flex-wrap gap-2'>
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className='rounded-md border border-cLightGrey/30 px-3 py-1.5 font-mono text-sm text-cDark dark:text-cLightGrey'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
