import Title from "~/components/Title"
import Text from "~/components/Text"

type RecipePreparationSectionProps = {
  instructions: string
}

export default function RecipePreparationSection({
  instructions,
}: RecipePreparationSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <Title as={"h4"}>RECIPE PREPARATION</Title>
      <Text>{instructions}</Text>
    </section>
  )
}
