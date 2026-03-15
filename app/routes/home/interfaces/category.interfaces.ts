export interface Category {
  id: number
  name: string
  description: string
  recipes: Recipe[]
}

export interface Recipe {
  id: string
  title: string
  instructions: string
  image: {
    original: string
    phone: string
    tablet: string
    desktop: string
    thumbnail: string
  }
  ownerId: string
  ownerAvatarURL: string | null
  ownerName: string
}
