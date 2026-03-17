export type RecipeIngredient = {
  name: string
  imageURL: string
  measure: string
}

export type RecipeDetails = {
  id: string
  title: string
  description: string
  instructions: string
  time: number
  image: {
    phone: string
    tablet: string
    desktop: string
    thumbnail: string
  }
  category: string
  area: string
  ingredients: RecipeIngredient[]
  ownerId: string
  ownerName: string
  ownerAvatarURL: string
}
