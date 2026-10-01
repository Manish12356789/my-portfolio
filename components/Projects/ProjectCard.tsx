type Params = {
  name: string
  status: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  comingSoonLabel: string
}

export default function ProjectCard({
  name,
  status,
  description,
  technologies,
  githubUrl,
  liveUrl,
  comingSoonLabel
}: Params) {
  return (
    <div className='flex h-full flex-col rounded-lg border border-cLightGrey/20 bg-cLight p-6 transition-colors hover:border-primary/50 dark:bg-cDeepDark'>
      <div className='mb-3 flex items-start justify-between gap-3'>
        <h3 className='text-xl font-bold text-cDark dark:text-cLight'>
          {name}
        </h3>
        <span className='shrink-0 whitespace-nowrap rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs text-primary'>
          {status}
        </span>
      </div>

      <p className='mb-5 flex-grow text-sm leading-relaxed text-cDark/75 dark:text-cLightGrey'>
        {description}
      </p>

      <div className='mb-5 flex flex-wrap gap-2'>
        {technologies.map((tech) => (
          <span
            key={tech}
            className='rounded-md bg-cLightGrey/10 px-2.5 py-1 font-mono text-xs text-cDark/80 dark:text-cLightGrey'
          >
            {tech}
          </span>
        ))}
      </div>

      <div className='flex items-center gap-4 border-t border-cLightGrey/10 pt-4 font-mono text-sm'>
        {githubUrl ? (
          <a
            href={githubUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-cDark/80 transition-colors hover:text-primary dark:text-cLightGrey'
          >
            GitHub &rarr;
          </a>
        ) : (
          <span className='text-cDark/40 dark:text-cLightGrey/40'>
            {comingSoonLabel}
          </span>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-cDark/80 transition-colors hover:text-primary dark:text-cLightGrey'
          >
            Live demo &rarr;
          </a>
        )}
      </div>
    </div>
  )
}
