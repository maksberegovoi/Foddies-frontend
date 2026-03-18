import Title from "~/components/Title"

type RecipePreparationSectionProps = {
  instructions: string
}

export default function RecipePreparationSection({
  instructions,
}: RecipePreparationSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <Title as={"h4"}>RECIPE PREPARATION</Title>
      <p className="text-sm leading-6 font-medium text-light-dark md:text-base">
        {instructions}
      </p>
    </section>
  )
}
