import { useNavigation } from "react-router"

export function TopLoader() {
  const navigation = useNavigation()

  const isLoading =
    navigation.state === "loading" || navigation.state === "submitting"

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-full">
      <div
        className={`h-full bg-blue-500 transition-all duration-500 ease-out ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: isLoading ? "80%" : "0%",
          transitionProperty: "width, opacity",
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
        }}
      />
    </div>
  )
}
