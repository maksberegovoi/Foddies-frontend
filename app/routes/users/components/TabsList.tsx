import { cn } from "~/lib/utils"

export default function TabsList() {
  const tabs = [
    { name: "My recipes", active: true },
    { name: "my favorites", active: false },
    { name: "Followers", active: false },
    { name: "Following", active: false },
  ]

  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="scrollbar-hide flex items-start gap-10 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={cn(
              "text-xl font-extrabold tracking-[-0.4px] whitespace-nowrap uppercase transition-colors",
              tab.active ? "text-dark" : "text-gray"
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="h-px w-full bg-gray" />
    </div>
  )
}
