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
  <ShadcnTabsList className="no-scrollbar flex h-auto w-full items-start justify-start gap-6 overflow-x-auto rounded-none bg-transparent p-0 md:gap-10">
    {tabs.map((tab) => (
      <div key={tab.value} className="group relative flex flex-col items-center">
        <TabsTrigger
          value={tab.value}
          className="flex-none border-none bg-transparent px-0 pb-4 text-xl font-extrabold tracking-[-0.4px] text-gray uppercase shadow-none transition-colors 
          data-[state=active]:text-dark data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          {tab.value === "my-recipes" && !isOwnProfile ? "Recipes" : tab.name}
        </TabsTrigger>

        <div className="absolute bottom-0 left-0 z-50 h-[2px] w-full origin-left scale-x-0 bg-dark transition-transform duration-300 group-has-[[data-state=active]]:scale-x-100" />
      </div>
    ))}
  </ShadcnTabsList>

  <div className="h-[1px] w-full bg-[#BFBEBE]/30" />
</div>
  )
}