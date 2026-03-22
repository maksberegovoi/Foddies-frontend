import { TabsList as ShadcnTabsList, TabsTrigger } from "~/components/ui/tabs"

export default function TabsList({
  isOwnProfile = true,
}: {
  isOwnProfile?: boolean
}) {
  const allTabs = [
    { name: "My recipes", value: "my-recipes" },
    { name: "My favorites", value: "my-favorites", ownOnly: true },
    { name: "Followers", value: "followers" },
    { name: "Following", value: "following", ownOnly: true },
  ]

  const tabs = allTabs.filter((tab) => isOwnProfile || !tab.ownOnly)

  return (
    <div className="flex w-full flex-col">
      <ShadcnTabsList
        variant="line"
        className="no-scrollbar flex h-auto w-full items-start justify-start gap-6 overflow-x-auto overflow-y-hidden rounded-none border-b border-border bg-transparent p-0 md:gap-10"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="relative flex-none rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-2 text-xl font-extrabold tracking-[-0.4px] text-muted-foreground uppercase shadow-none transition-colors data-active:border-dark data-active:bg-transparent data-active:text-foreground data-active:shadow-none"
          >
            {tab.value === "my-recipes" && !isOwnProfile ? "Recipes" : tab.name}
          </TabsTrigger>
        ))}
      </ShadcnTabsList>

      <div className="h-[1px] w-full bg-border" />
    </div>
  )
}
