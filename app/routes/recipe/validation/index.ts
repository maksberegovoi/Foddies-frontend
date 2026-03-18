import z from "zod"

export type AddRecipeFormValues = z.infer<typeof recipeSchema>

export const ingredientSchema = z.object({
  ingredientId: z.string().min(1),
  name: z.string().min(1),
  imageURL: z.string().min(1),
  measure: z.string().min(1, "Quantity is required"),
})

export const recipeSchema = z.object({
  file: z
    .any()
    .refine(
      (fl: unknown) => fl instanceof FileList && fl.length > 0,
      "Please select a photo"
    ),
  title: z.string().min(1, "Please enter a recipe name"),
  description: z
    .string()
    .min(1, "Please enter a description")
    .max(200, "Description must be 200 characters or less"),
  category: z.string().min(1, "Please select a category"),
  area: z.string().min(1, "Please select an area"),
  ingredients: z
    .array(ingredientSchema)
    .min(1, "Please add at least one ingredient"),
  cookingTime: z
    .number()
    .int("Cooking time must be a whole number")
    .min(1, "Cooking time must be at least 1 minute"),
  preparation: z
    .string()
    .min(1, "Please enter preparation steps")
    .max(1000, "Preparation must be 1000 characters or less"),
})
