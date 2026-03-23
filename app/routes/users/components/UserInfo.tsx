import { Button } from "~/components/ui/button"
import FIcon from "~/components/FIcon"
import Title from "~/components/Title"
import Text from "~/components/Text"
import {
  getGetUsersCurrentQueryKey,
  getGetUsersIdFollowingQueryKey,
  usePatchUsersAvatar,
  usePostUsersIdFollow,
  useDeleteUsersIdFollow,
  getGetUsersIdQueryKey,
  getGetUsersIdFollowersQueryKey,
  useGetUsersCurrent,
} from "~/api/generated/endpoints/user/user"
import { toast } from "sonner"
import { useModal } from "~/components/modals/modal-context"
import { queryClient } from "~/api/query-client"
import type {
  UserProfileDto,
  UserProfilePublicDto,
} from "~/api/generated/model"

// values from type LoaderResult
type UserInfoProps =
  | { isOwnProfile: true; user: UserProfileDto }
  | { isOwnProfile: false; user: UserProfilePublicDto }

export default function UserInfo({ user, isOwnProfile }: UserInfoProps) {
  const { openLogOut } = useModal()
  const { data: currentUserResponse } = useGetUsersCurrent()

  const updateAvatar = usePatchUsersAvatar()
  const followMutation = usePostUsersIdFollow()
  const unfollowMutation = useDeleteUsersIdFollow()

  const currentUserId = currentUserResponse?.data?.id

  const isFollowed = !isOwnProfile ? !!user.isFollowing : false
  const followersCount = user.totalFollowers

  const stats = [
    { label: "Email:", value: user.email },
    { label: "Added recipes:", value: user.totalRecipes },
    ...(isOwnProfile
      ? [{ label: "Favorites:", value: user.totalFavoriteRecipes }]
      : []),
    { label: "Followers:", value: followersCount },
    ...(isOwnProfile
      ? [{ label: "Following:", value: user.totalFollowing }]
      : []),
  ].filter(Boolean)

  const handleFollowToggle = async () => {
    const mutation = isFollowed ? unfollowMutation : followMutation
    const isNowFollowing = !isFollowed
    const followingQueryKey = currentUserId
      ? getGetUsersIdFollowingQueryKey(currentUserId)
      : null

    await Promise.all([
      queryClient.cancelQueries({ queryKey: getGetUsersIdQueryKey(user.id) }),
      queryClient.cancelQueries({ queryKey: getGetUsersCurrentQueryKey() }),
      followingQueryKey
        ? queryClient.cancelQueries({ queryKey: followingQueryKey })
        : Promise.resolve(),
    ])

    const previousUser = queryClient.getQueryData(
      getGetUsersIdQueryKey(user.id)
    )
    const previousCurrentUser = queryClient.getQueryData(
      getGetUsersCurrentQueryKey()
    )
    const previousFollowing = followingQueryKey
      ? queryClient.getQueryData(followingQueryKey)
      : undefined

    queryClient.setQueryData(getGetUsersIdQueryKey(user.id), (old: any) => {
      if (!old?.data) return old
      return {
        ...old,
        data: {
          ...old.data,
          isFollowing: isNowFollowing,
          totalFollowers: Math.max(
            0,
            (old.data.totalFollowers || 0) + (isNowFollowing ? 1 : -1)
          ),
        },
      }
    })

    queryClient.setQueryData(getGetUsersCurrentQueryKey(), (old: any) => {
      if (!old?.data) return old
      return {
        ...old,
        data: {
          ...old.data,
          totalFollowing: Math.max(
            0,
            (old.data.totalFollowing || 0) + (isNowFollowing ? 1 : -1)
          ),
        },
      }
    })

    if (followingQueryKey) {
      queryClient.setQueryData(followingQueryKey, (old: any) => {
        const list = old?.data || []
        const exists = list.some(
          (followedUser: any) =>
            (followedUser.id || followedUser._id) === user.id
        )

        if (isNowFollowing && !exists) {
          return {
            ...old,
            data: [...list, user],
          }
        }

        if (!isNowFollowing) {
          return {
            ...old,
            data: list.filter(
              (followedUser: any) =>
                (followedUser.id || followedUser._id) !== user.id
            ),
          }
        }

        return old
      })
    }

    try {
      await mutation.mutateAsync({ id: user.id })
      toast.success(isNowFollowing ? "Subscribed!" : "Unsubscribed!")
    } catch (err) {
      queryClient.setQueryData(getGetUsersIdQueryKey(user.id), previousUser)
      queryClient.setQueryData(
        getGetUsersCurrentQueryKey(),
        previousCurrentUser
      )
      if (followingQueryKey) {
        queryClient.setQueryData(followingQueryKey, previousFollowing)
      }
      toast.error("Action failed")
      console.error(err)
    } finally {
      queryClient.invalidateQueries({
        queryKey: getGetUsersIdQueryKey(user.id),
      })
      queryClient.invalidateQueries({
        queryKey: getGetUsersIdFollowersQueryKey(user.id),
      })
      queryClient.invalidateQueries({
        queryKey: getGetUsersCurrentQueryKey(),
      })
      if (followingQueryKey) {
        queryClient.invalidateQueries({ queryKey: followingQueryKey })
      }
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
          queryClient.invalidateQueries({
            queryKey: getGetUsersCurrentQueryKey(),
          })
          queryClient.invalidateQueries({
            queryKey: getGetUsersIdQueryKey(user.id),
          })
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
              src={user.avatarURL || "/fallback_ava.png"}
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
          onClick={openLogOut}
          className="w-full rounded-[30px] bg-primary py-4 font-bold text-primary-foreground uppercase hover:opacity-90"
        >
          Log Out
        </Button>
      ) : (
        <Button
          onClick={handleFollowToggle}
          variant={isFollowed ? "outlineBlack" : "outlineWhite"}
          disabled={followMutation.isPending || unfollowMutation.isPending}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  )
}
