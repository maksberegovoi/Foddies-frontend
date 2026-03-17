import { Link } from "react-router"

interface PathInfoProps {
  currentPageName: string
}

export default function PathInfo({ currentPageName }: PathInfoProps) {
  return (
    <nav className="flex items-center gap-2 text-xs font-bold tracking-[-0.24px] uppercase">
      <Link to="/" className="text-gray">
        Home
      </Link>
      <span className="text-gray">/</span>
      <span className="text-dark">{currentPageName}</span>
    </nav>
  )
}
