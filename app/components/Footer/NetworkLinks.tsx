import sprite from "../../assets/icons/sprite.svg"

export default function NetworkLinks() {
  return (
    <ul className="flex items-center gap-2">
      <li>
        <a
          href="https://www.facebook.com/goITclub/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
        >
          <svg className="h-4 w-4">
            <use href={`${sprite}#facebook`} />
          </svg>
        </a>
      </li>

      <li>
        <a
          href="https://www.instagram.com/goitclub/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
        >
          <svg className="h-4 w-4">
            <use href={`${sprite}#instagram`} />
          </svg>
        </a>
      </li>

      <li>
        <a
          href="https://www.youtube.com/c/GoIT"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
        >
          <svg className="h-4 w-4">
            <use href={`${sprite}#youtube`} />
          </svg>
        </a>
      </li>
    </ul>
  )
}
