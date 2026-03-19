import type { TestimonialDto } from "~/api/generated/model"
import Text from "~/components/Text"

type TestimonialItemProps = {
  item: TestimonialDto
}

const TestimonialItem = ({ item }: TestimonialItemProps) => {
  return (
    <div className="mt-16 flex flex-col justify-between select-none md:mt-20">
      <Text
        as="span"
        className="text-center text-lg leading-6 md:text-2xl md:leading-9"
      >
        {item.text}
      </Text>

      <Text
        as="span"
        className="text-center text-base leading-6 font-extrabold uppercase md:text-xl"
      >
        {item.owner}
      </Text>
    </div>
  )
}

export default TestimonialItem
