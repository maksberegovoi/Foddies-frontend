import type { GetUsersIdFollowingParams } from "~/api/generated/model"
import {
  getGetUsersCurrentQueryKey,
  getGetUsersIdFollowingQueryKey,
  getGetUsersIdQueryKey,
  useDeleteUsersIdFollow,
  useGetUsersIdFollowing,
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

type FollowingTabProps = {
  profileId: string
  myId: string | null
}

const USERS_ITEMS_PER_PAGE = 5

export default function FollowingTab({ profileId, myId }: FollowingTabProps) {
  const { page, setPage } = useTabPage()

  const usersParams = {
    page,
    limit: USERS_ITEMS_PER_PAGE,
  } satisfies GetUsersIdFollowingParams

  const { data: followingResponse } = useGetUsersIdFollowing(
    profileId,
    usersParams,
    {
      query: {
        placeholderData: (previousData) => previousData,
      },
    }
  )
  const items = followingResponse?.data || []
  const meta = followingResponse?.meta
  const totalPages = getTotalPages(meta)
  const followingQueryKey = getGetUsersIdFollowingQueryKey(
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
      queryClient.cancelQueries({ queryKey: followingQueryKey }),
      queryClient.cancelQueries({ queryKey: getGetUsersIdQueryKey(id) }),
      queryClient.cancelQueries({ queryKey: getGetUsersCurrentQueryKey() }),
    ])

    const previousFollowing = queryClient.getQueryData(followingQueryKey)
    const previousTargetUser = queryClient.getQueryData(
      getGetUsersIdQueryKey(id)
    )
    const previousCurrentUser = queryClient.getQueryData(
      getGetUsersCurrentQueryKey()
    )

    queryClient.setQueryData(followingQueryKey, (oldData: any) => {
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
      queryClient.setQueryData(followingQueryKey, previousFollowing)
      queryClient.setQueryData(getGetUsersIdQueryKey(id), previousTargetUser)
      queryClient.setQueryData(
        getGetUsersCurrentQueryKey(),
        previousCurrentUser
      )
      throw new Error("Follow toggle failed")
    } finally {
      queryClient.invalidateQueries({ queryKey: followingQueryKey })
      queryClient.invalidateQueries({ queryKey: getGetUsersIdQueryKey(id) })
      queryClient.invalidateQueries({ queryKey: getGetUsersCurrentQueryKey() })
    }
  }

  return (
    <>
      {items.length === 0 ? (
        <TabEmptyState currentTab="following" />
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
