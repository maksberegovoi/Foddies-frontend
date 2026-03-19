import { TabsList as ShadcnTabsList, TabsTrigger } from "~/components/ui/tabs"

export default function TabsList() {
  const tabs = [
    { name: "My recipes", value: "my-recipes" },
    { name: "My favorites", value: "my-favorites" },
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
            className="flex-none border-none px-0 pb-4 text-xl font-extrabold tracking-[-0.4px] text-gray uppercase shadow-none transition-colors 
            data-[state=active]:text-dark data-[state=active]:bg-transparent data-[state=active]:shadow-none
            relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-dark after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform"
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </ShadcnTabsList>
      <div className="h-[1px] w-full bg-gray/20" />
    </div>
  )
}