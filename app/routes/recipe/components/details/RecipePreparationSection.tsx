type RecipePreparationSectionProps = {
  instructions: string
}

export default function RecipePreparationSection({
  instructions,
}: RecipePreparationSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-extrabold">RECIPE PREPARATION</h2>
      <p className="text-sm leading-6 font-medium text-light-dark md:text-base">
        {instructions}
      </p>
    </section>
  )
}
