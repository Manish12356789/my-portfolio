import { useTranslation } from "next-i18next"
import Link from "next/link"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className='flex min-h-[100px] w-full items-center justify-center border-primary p-4 shadow-[0px_-1px_9px_0px_rgba(0,0,0,0.2)] dark:border-t-2 dark:shadow-[0px_-1px_9px_0px_rgba(0,0,0,0.8)]'>
      <div className='w-100 container flex flex-col items-center space-y-2'>
        <Link
          href='/'
          className='font-mono text-lg font-bold text-cDark dark:text-cLight'
        >
          ~/<span className='text-primary'>{t("nav.handle")}</span>
        </Link>

        <Link href='/privacy'>
          <p className='mt-2 cursor-pointer text-center text-sm text-primary hover:underline'>
            {t("privacy")}
          </p>
        </Link>

        <div className='mt-1 flex items-center gap-5 font-mono text-sm text-cDark/70 dark:text-cLightGrey'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={t("hero.githubUrl")}
            className='transition-colors hover:text-primary'
          >
            GitHub
          </a>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={t("hero.linkedinUrl")}
            className='transition-colors hover:text-primary'
          >
            LinkedIn
          </a>
        </div>

        <p className='mt-2 text-center text-sm text-cDark dark:text-cLight'>
          &copy; {new Date().getFullYear()} {t("copyright")}
        </p>
      </div>
    </footer>
  )
}
