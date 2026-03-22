import type { GetUsersIdFollowersParams } from "~/api/generated/model"
import {
  getGetUsersCurrentQueryKey,
  getGetUsersIdFollowersQueryKey,
  getGetUsersIdQueryKey,
  useDeleteUsersIdFollow,
  useGetUsersIdFollowers,
  usePostUsersIdFollow,
} from "~/api/generated/endpoints/user/user"
import TabEmptyState from "../TabEmptyState"
import UserListItems from "../UserListItems"
import { queryClient } from "~/api/query-client"
import TabPagination from "./TabPagination"
import {
  getTotalPages,
  useResetPageOnOutOfRange,
  useTabPage,
} from "./useTabPagination"

type FollowersTabProps = {
  profileId: string
  myId: string | null
}

const USERS_ITEMS_PER_PAGE = 5

export default function FollowersTab({ profileId, myId }: FollowersTabProps) {
  const { page, setPage } = useTabPage()

  const usersParams = {
    page,
    limit: USERS_ITEMS_PER_PAGE,
  } satisfies GetUsersIdFollowersParams

  const { data: followersResponse } = useGetUsersIdFollowers(
    profileId,
    usersParams,
    {
      query: {
        placeholderData: (previousData) => previousData,
      },
    }
  )
  const items = followersResponse?.data || []
  const meta = followersResponse?.meta
  const totalPages = getTotalPages(meta)
  const followersQueryKey = getGetUsersIdFollowersQueryKey(
    profileId,
    usersParams
  )
  const followMutation = usePostUsersIdFollow()
  const unfollowMutation = useDeleteUsersIdFollow()

  useResetPageOnOutOfRange(page, totalPages, meta, setPage)

  const handleFollowToggle = async (
    id: string,
    currentlyFollowing: boolean
  ) => {
    const mutate = currentlyFollowing ? unfollowMutation : followMutation
    const isNowFollowing = !currentlyFollowing

    await Promise.all([
      queryClient.cancelQueries({ queryKey: followersQueryKey }),
      queryClient.cancelQueries({ queryKey: getGetUsersIdQueryKey(id) }),
      queryClient.cancelQueries({ queryKey: getGetUsersCurrentQueryKey() }),
    ])

    const previousFollowers = queryClient.getQueryData(followersQueryKey)
    const previousTargetUser = queryClient.getQueryData(
      getGetUsersIdQueryKey(id)
    )
    const previousCurrentUser = queryClient.getQueryData(
      getGetUsersCurrentQueryKey()
    )

    queryClient.setQueryData(followersQueryKey, (oldData: any) => {
      const previousItems = oldData?.data || []
      return {
        ...oldData,
        data: previousItems.map((userItem: any) => {
          if ((userItem.id || userItem._id) !== id) return userItem
          return {
            ...userItem,
            isFollowing: isNowFollowing,
            isFollowed: isNowFollowing,
            totalFollowers: Math.max(
              0,
              (userItem.totalFollowers || 0) + (isNowFollowing ? 1 : -1)
            ),
          }
        }),
      }
    })

    queryClient.setQueryData(getGetUsersIdQueryKey(id), (oldData: any) => {
      if (!oldData?.data) return oldData
      return {
        ...oldData,
        data: {
          ...oldData.data,
          isFollowing: isNowFollowing,
          totalFollowers: Math.max(
            0,
            (oldData.data.totalFollowers || 0) + (isNowFollowing ? 1 : -1)
          ),
        },
      }
    })

    queryClient.setQueryData(getGetUsersCurrentQueryKey(), (oldData: any) => {
      if (!oldData?.data) return oldData
      return {
        ...oldData,
        data: {
          ...oldData.data,
          totalFollowing: Math.max(
            0,
            (oldData.data.totalFollowing || 0) + (isNowFollowing ? 1 : -1)
          ),
        },
      }
    })

    try {
      await mutate.mutateAsync({ id })
    } catch {
      queryClient.setQueryData(followersQueryKey, previousFollowers)
      queryClient.setQueryData(getGetUsersIdQueryKey(id), previousTargetUser)
      queryClient.setQueryData(
        getGetUsersCurrentQueryKey(),
        previousCurrentUser
      )
      throw new Error("Follow toggle failed")
    } finally {
      queryClient.invalidateQueries({ queryKey: followersQueryKey })
      queryClient.invalidateQueries({ queryKey: getGetUsersIdQueryKey(id) })
      queryClient.invalidateQueries({ queryKey: getGetUsersCurrentQueryKey() })
      queryClient.invalidateQueries({
        queryKey: getGetUsersIdFollowersQueryKey(profileId),
      })
    }
  }

  return (
    <>
      {items.length === 0 ? (
        <TabEmptyState currentTab="followers" />
      ) : (
        <UserListItems
          items={items}
          myId={myId}
          onFollowToggle={handleFollowToggle}
          isUpdatingFollow={
            followMutation.isPending || unfollowMutation.isPending
          }
        />
      )}

      <TabPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  )
}
