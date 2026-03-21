import { useState } from "react"
import type { UserProfileDto } from "~/api/generated/model/userProfileDto"
import type { UserProfilePublicDto } from "~/api/generated/model/userProfilePublicDto"
import { Button } from "~/components/ui/button"
import FIcon from "~/components/FIcon"
import Title from "~/components/Title"
import Text from "~/components/Text"
import {
  usePatchUsersAvatar,
  usePostUsersIdFollow,
  useDeleteUsersIdFollow,
} from "~/api/generated/endpoints/user/user"
import { toast } from "sonner"

interface UserInfoProps {
  user: (UserProfileDto | UserProfilePublicDto) & {
    isFollowed?: boolean
    totalFollowing?: number
    totalFavoriteRecipes?: number
  }
  isOwnProfile: boolean
}

export default function UserInfo({ user, isOwnProfile }: UserInfoProps) {
  const [isFollowed, setIsFollowed] = useState(user.isFollowed)
  const [followersCount, setFollowersCount] = useState(user.totalFollowers || 0)

  const updateAvatar = usePatchUsersAvatar()
  const followMutation = usePostUsersIdFollow()
  const unfollowMutation = useDeleteUsersIdFollow()

  const stats = [
    { label: "Email:", value: user.email },
    { label: "Added recipes:", value: user.totalRecipes || 0 },
    ...(isOwnProfile
      ? [{ label: "Favorites:", value: user.totalFavoriteRecipes || 0 }]
      : []),
    { label: "Followers:", value: followersCount },
    { label: "Following:", value: user.totalFollowing || 0 },
  ]

  const handleFollowToggle = async () => {
    const targetId = user.id

    if (isFollowed) {
      unfollowMutation.mutate(
        { id: targetId },
        {
          onSuccess: () => {
            setIsFollowed(false)
            setFollowersCount((prev) => prev - 1)
          },
          onError: () => toast.error("Failed to unfollow"),
        }
      )
    } else {
      followMutation.mutate(
        { id: targetId },
        {
          onSuccess: () => {
            setIsFollowed(true)
            setFollowersCount((prev) => prev + 1)
          },
          onError: () => toast.error("Failed to follow"),
        }
      )
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    updateAvatar.mutate(
      { data: { avatar: file } },
      {
        onSuccess: () => {
          toast.success("Avatar updated!")
          window.location.reload()
        },
        onError: () => toast.error("Failed to update avatar"),
      }
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="mx-auto flex w-full max-w-[343px] flex-col items-center gap-[16px] rounded-[30px] border border-border bg-card py-[30px] shadow-sm md:max-w-[394px] md:gap-[20px]">
        <div className="group relative">
          <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-gray/10 md:h-28 md:w-28">
            <img
              src={user.avatarURL || "/fallback_ava.webp"}
              className="h-full w-full object-cover"
              alt={user.name}
            />
          </div>
          {isOwnProfile && (
            <label className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/4 cursor-pointer items-center justify-center rounded-full bg-dark p-2.5 transition-opacity hover:opacity-90">
              <input
                type="file"
                className="hidden"
                onChange={handleAvatarChange}
                accept="image/*"
              />
              <FIcon iconName="plus" className="size-[18px] text-white" />
            </label>
          )}
        </div>

        <Title
          as="h3"
          className="text-center text-[18px] font-extrabold tracking-[-0.4px] text-foreground uppercase md:text-[20px]"
        >
          {user.name}
        </Title>

        <div className="flex w-full flex-col gap-2">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-[6px] px-[69px] last:border-none md:px-[80px]"
            >
              <Text
                as="span"
                className="text-sm font-medium tracking-tight text-muted-foreground"
              >
                {item.label}
              </Text>
              <Text
                as="span"
                className="max-w-[180px] truncate text-sm font-bold tracking-tight text-foreground"
              >
                {item.value}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {isOwnProfile ? (
        <Button
          onClick={() => {
            localStorage.clear()
            window.location.href = "/"
          }}
          className="w-full rounded-[30px] bg-primary py-4 font-bold text-primary-foreground uppercase hover:opacity-90"
        >
          Log Out
        </Button>
      ) : (
        <Button
          onClick={handleFollowToggle}
          className={`w-full rounded-[30px] py-4 font-bold uppercase transition-colors ${
            isFollowed
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
          disabled={followMutation.isPending || unfollowMutation.isPending}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  )
}
