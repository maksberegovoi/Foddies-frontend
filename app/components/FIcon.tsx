import IconsSprite from "~/assets/icons/sprite.svg"

type IconNames =
  | "arrow-to-left"
  | "arrow-up-right"
  | "burger"
  | "camera"
  | "checmark"
  | "chevron-down"
  | "chevron-up"
  | "close-x"
  | "eye-off"
  | "eye"
  | "facebook"
  | "heart"
  | "instagram"
  | "minus"
  | "plus"
  | "quotes"
  | "trash"
  | "youtube"
  | "logo-white"
  | "logo-black"

type FIconProps = {
  iconName: IconNames
} & React.SVGProps<SVGSVGElement>

const FIcon = ({ iconName, ...props }: FIconProps) => {
  return (
    <svg {...props}>
      <use href={`${IconsSprite}#${iconName}`} name={iconName}></use>
    </svg>
  )
}

export default FIcon
