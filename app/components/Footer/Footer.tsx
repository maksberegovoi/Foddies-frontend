import Logo from "../Logo"
import sprite from "../../assets/icons/sprite.svg"

const socialLinks = [
  {
    href: "https://www.facebook.com/goITclub/",
    icon: "facebook",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/goitclub/",
    icon: "instagram",
    label: "Instagram",
  },
  {
    href: "https://www.youtube.com/c/GoIT",
    icon: "youtube",
    label: "YouTube",
  },
]

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-6 md:px-8">
        <Logo variant="black" />

        <ul className="flex items-center gap-2">
          {socialLinks.map(({ href, icon, label }) => (
            <li key={icon}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
              >
                <svg className="h-4 w-4">
                  <use href={`${sprite}#${icon}`} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px w-full bg-border" />

      <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
        <p className="text-center text-sm text-dark">
          ©2026, Foodies. All rights reserved
        </p>
      </div>
    </footer>
  )
}
