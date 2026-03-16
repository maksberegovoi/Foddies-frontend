import Logo from "../Logo"
import NetworkLinks from "./NetworkLinks"
import Copyright from "./Copyright"

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-6 md:px-8">
        <Logo variant="black" />
        <NetworkLinks />
      </div>

      <div className="h-px w-full bg-border" />

      <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
        <Copyright />
      </div>
    </footer>
  )
}
