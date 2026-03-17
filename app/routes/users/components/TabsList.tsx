import { TabsList as ShadcnTabsList, TabsTrigger } from "~/components/ui/tabs"

export default function TabsList() {
  const tabs = [
    { name: "My recipes", value: "my-recipes" },
    { name: "my favorites", value: "my-favorites" },
    { name: "Followers", value: "followers" },
    { name: "Following", value: "following" },
  ]

  return (
    <div className="flex w-full flex-col gap-3.5">
      <ShadcnTabsList className="scrollbar-hide flex h-auto w-full items-start justify-start gap-10 overflow-x-auto rounded-none bg-transparent p-0">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex-none border-none px-0 py-0 text-xl font-extrabold tracking-[-0.4px] text-gray uppercase shadow-none transition-colors after:hidden hover:text-dark focus-visible:ring-0 data-active:bg-transparent data-active:text-dark"
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </ShadcnTabsList>
      <div className="h-[1px] w-full bg-gray" />
    </div>
  )
}
