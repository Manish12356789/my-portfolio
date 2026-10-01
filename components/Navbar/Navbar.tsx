import ScrollToSection from "@/hooks/scroll-to-section"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useState } from "react"
import LanguageSwitcher from "./LanguageSwitcher"
import { ModeToggle } from "./ModeToggle"

type NavLink = {
  method: "GET" | "POST"
  path: string
  sectionId: string
}

// Section ids must match the `id` prop set on each <section> in pages/index.tsx
const navLinks: NavLink[] = [
  { method: "GET", path: "/about", sectionId: "about" },
  { method: "GET", path: "/experience", sectionId: "experience" },
  { method: "GET", path: "/projects", sectionId: "projects" },
  { method: "GET", path: "/skills", sectionId: "skills" },
  { method: "GET", path: "/education", sectionId: "education" },
  { method: "POST", path: "/contact", sectionId: "contact" }
]

export default function Navbar() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className='navbar'>
      <div className='container'>
        <div className='flex w-full items-center justify-between'>
          {/* Logo / handle */}
          <Link
            href='/'
            className='font-mono text-lg font-bold text-cDark dark:text-cLight'
          >
            ~/<span className='text-primary'>{t("nav.handle")}</span>
          </Link>

          {/* Desktop links */}
          <nav className='hidden items-center gap-6 font-mono text-sm lg:flex'>
            {navLinks.map((link) => (
              <ScrollToSection href={link.sectionId} key={link.sectionId}>
                <span className='cursor-pointer text-cDark/80 transition-colors hover:text-primary dark:text-cLightGrey'>
                  <span
                    className={
                      link.method === "GET" ? "text-primary" : "text-error"
                    }
                  >
                    {link.method}
                  </span>{" "}
                  {link.path}
                </span>
              </ScrollToSection>
            ))}
          </nav>

          <div className='flex items-center gap-3 md:gap-4'>
            <div className='hidden md:block'>
              <LanguageSwitcher />
            </div>
            <ModeToggle />

            <ScrollToSection href='contact'>
              <button
                data-test='hire-me-button'
                className='hidden rounded-md border border-primary px-4 py-2 font-mono text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-cLight lg:inline-block'
              >
                {t("nav.hireMe")}
              </button>
            </ScrollToSection>

            {/* Mobile menu toggle */}
            <button
              aria-label={t("ariaLabels.openMenu")}
              data-test='mobile-menu-toggle'
              className='flex h-10 w-10 items-center justify-center rounded-md text-cDark dark:text-cLight lg:hidden'
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span className='material-symbols-outlined'>
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className='flex flex-col gap-1 border-t border-cLightGrey/10 py-4 font-mono text-sm lg:hidden'>
            {navLinks.map((link) => (
              <ScrollToSection href={link.sectionId} key={link.sectionId}>
                <span
                  className='block cursor-pointer rounded-md px-2 py-3 text-cDark/80 transition-colors hover:bg-primary/10 hover:text-primary dark:text-cLightGrey'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span
                    className={
                      link.method === "GET" ? "text-primary" : "text-error"
                    }
                  >
                    {link.method}
                  </span>{" "}
                  {link.path}
                </span>
              </ScrollToSection>
            ))}
            <div className='mt-2 px-2'>
              <LanguageSwitcher />
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
