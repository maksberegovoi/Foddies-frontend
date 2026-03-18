import { memo, useEffect, useState } from "react"
import { useController, type Control } from "react-hook-form"

import FIcon from "~/components/FIcon"

type ImageInputProps = {
  control: Control<any>
}

function ImageInput({ control }: ImageInputProps) {
  const {
    field: { name, onBlur, onChange, ref },
    fieldState: { error },
  } = useController({
    name: "file",
    control,
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const updatePreview = (file: File | null) => {
    setPreviewUrl((prev) => {
      if (prev) {
        URL.revokeObjectURL(prev)
      }

      return file ? URL.createObjectURL(file) : null
    })
  }

  return (
    <div className="space-y-4">
      <input
        id="recipe-image"
        name={name}
        type="file"
        accept="image/*"
        className="hidden"
        ref={ref}
        onBlur={onBlur}
        onChange={(e) => {
          onChange(e.currentTarget.files)
          updatePreview(e.currentTarget.files?.[0] ?? null)
        }}
      />

      {previewUrl ? (
        <>
          <img
            src={previewUrl}
            alt="Selected recipe photo"
            className="h-79.5 w-full rounded-[30px] object-cover"
          />

          <label
            htmlFor="recipe-image"
            className="mx-auto block w-fit cursor-pointer text-center text-sm font-medium text-dark underline underline-offset-2"
          >
            Upload another photo
          </label>
        </>
      ) : (
        <label
          htmlFor="recipe-image"
          className="flex h-79.5 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[30px] border border-dashed border-gray px-6 text-center"
        >
          <FIcon iconName="camera" className="size-12.5 text-gray" />

          <p className="text-sm font-medium text-dark underline underline-offset-2">
            Upload a photo
          </p>
        </label>
      )}

      {error ? (
        <p className="text-sm text-destructive">{String(error.message)}</p>
      ) : null}
    </div>
  )
}

export default memo(ImageInput)
