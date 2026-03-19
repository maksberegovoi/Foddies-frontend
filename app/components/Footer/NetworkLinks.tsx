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
    <ul className="flex items-center gap-4">
      {socialLinks.map(({ href, icon, label }) => (
        <li key={icon}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group flex items-center justify-center rounded-full border border-gray p-2 transition-colors duration-300 hover:bg-dark md:p-2.5"
          >
            <FIcon
              iconName={icon}
              className="size-5 transition-colors duration-300 group-hover:text-white"
            />
          </a>
        </li>
      ))}
    </ul>
  )
}
