import { fadeIn } from "@/constants/animations"
import { motion, useInView } from "framer-motion"
import { useTranslation } from "next-i18next"
import { useRef } from "react"
import ProjectCard from "./ProjectCard"

type ProjectItem = {
  name: string
  status: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
}

export default function ProjectsSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const items = t("projects.items", { returnObjects: true }) as ProjectItem[]

  return (
    <motion.section
      ref={ref}
      variants={fadeIn}
      initial='hidden'
      animate={isInView ? "visible" : "hidden"}
      transition={{ ease: "easeOut", duration: 0.5 }}
      id='projects'
      className='w-full scroll-mt-16 bg-cLight py-24 dark:bg-cDeepDark'
    >
      <div className='container'>
        <div className='mb-10 flex items-center gap-3 font-mono text-sm text-primary'>
          <span>//</span>
          <span>{t("projects.eyebrow")}</span>
        </div>
        <h2 className='mb-4 text-3xl font-black text-cDark dark:text-cLight md:text-4xl'>
          {t("projects.heading")}
        </h2>
        <p className='mb-12 max-w-2xl text-cDark/70 dark:text-cLightGrey'>
          {t("projects.subheading")}
        </p>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {items.map((project) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              status={project.status}
              description={project.description}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              comingSoonLabel={t("projects.comingSoon")}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
