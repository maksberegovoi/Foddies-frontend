import Text from "~/components/Text"

type TabEmptyStateProps = {
  currentTab: string
}

export default function TabEmptyState({ currentTab }: TabEmptyStateProps) {
  let emptyMessage = "Nothing found here yet."

  switch (currentTab) {
    case "my-recipes":
    case "my-favorites":
      emptyMessage = "Nothing has been added to your list yet."
      break
    case "followers":
      emptyMessage = "There are currently no followers on your account."
      break
    case "following":
      emptyMessage =
        "Your account currently has no subscriptions to other users."
      break
  }

  return (
    <div className="mx-auto max-w-[600px] py-20 text-center">
      <Text className="text-muted-foreground">{emptyMessage}</Text>
    </div>
  )
}
