import Logo from "../Logo"
import NetworkLinks from "./NetworkLinks"
import Copyright from "./Copyright"

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-6">
          <Logo variant="black" />
          <NetworkLinks />
        </div>
      </div>

      <div className="h-px w-full bg-border" />

      <div className="mx-auto px-4 py-6 md:px-8">
        <Copyright />
      </div>
    </footer>
  )
}
