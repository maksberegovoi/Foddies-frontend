import React from "react"
import { useNavigate } from "react-router"
import Title from "~/components/Title"
import Text from "~/components/Text"
import { Button } from "~/components/ui/button"

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark px-4 text-center">
      <Title className="mb-3 !text-6xl text-white md:mb-5 md:!text-8xl">
        404
      </Title>

      <div className="flex flex-col items-center">
        <Title
          as={"h2"}
          className="mb-2 text-3xl font-bold text-white md:text-4xl"
        >
          Oops! Page Not Found
        </Title>
        <Text className="mb-8 max-w-md text-white">
          It seems you've wandered into a dark corner of the internet. The page
          you're looking for doesn't exist or has been moved.
        </Text>

        <Button variant={"outlineWhite"} onClick={() => navigate(-1)}>
          GO BACK
        </Button>
      </div>
    </div>
  )
}
