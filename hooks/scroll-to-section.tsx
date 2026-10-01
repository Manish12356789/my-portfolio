"use client"

import Link, { LinkProps } from "next/link"
import { MouseEvent, PropsWithChildren } from "react"

type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
>
type ScrollLinkProps = AnchorProps & LinkProps & PropsWithChildren

const ScrollToSection = ({ children, ...props }: ScrollLinkProps) => {
  const handleScroll = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const hrefString = e.currentTarget.href
    const targetId = hrefString.substring(
      hrefString.lastIndexOf("/") + 1,
      hrefString.length
    )
    const elem = document.getElementById(targetId)

    // NOTE: getBoundingClientRect().top is relative to the current viewport,
    // so it must be added to the current scroll position to get an absolute
    // page offset. Also offset by the fixed navbar height (~64px) so section
    // titles aren't hidden underneath it.
    const navbarOffset = 64
    const absoluteTop =
      (elem?.getBoundingClientRect().top ?? 0) + window.scrollY - navbarOffset

    window.scrollTo({
      top: absoluteTop,
      behavior: "smooth"
    })
  }
  return (
    <Link {...props} onClick={handleScroll}>
      {children}
    </Link>
  )
}
export default ScrollToSection
