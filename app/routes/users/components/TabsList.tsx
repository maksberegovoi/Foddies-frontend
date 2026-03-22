import { TabsList as ShadcnTabsList, TabsTrigger } from "~/components/ui/tabs"

export default function TabsList({ isOwnProfile = true }: { isOwnProfile?: boolean }) {
  const allTabs = [
    { name: "My recipes", value: "my-recipes" },
    { name: "My favorites", value: "my-favorites", ownOnly: true },
    { name: "Followers", value: "followers" },
    { name: "Following", value: "following", ownOnly: true },
  ]

  const tabs = allTabs.filter(tab => isOwnProfile || !tab.ownOnly);

  return (
    <div className="flex w-full flex-col">
      <ShadcnTabsList 
        className="no-scrollbar flex h-auto w-full items-start justify-start gap-6 overflow-x-auto overflow-y-hidden rounded-none bg-transparent p-0 md:gap-10 border-b border-border"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="relative flex-none border-none bg-transparent px-0 pb-2 text-xl font-extrabold tracking-[-0.4px] text-muted-foreground uppercase shadow-none transition-colors 
            data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none
            after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-dark after:scale-x-0 after:transition-transform after:duration-300
            data-[state=active]:after:scale-x-100"
          >
            {tab.value === "my-recipes" && !isOwnProfile ? "Recipes" : tab.name}
          </TabsTrigger>
        ))}
      </ShadcnTabsList>
      
      <div className="h-[1px] w-full bg-border" />
    </div>
  )
}