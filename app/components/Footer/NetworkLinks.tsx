import FIcon from "../FIcon"

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
] as const

export default function NetworkLinks() {
  return (
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
            <FIcon iconName={icon} className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  )
}
