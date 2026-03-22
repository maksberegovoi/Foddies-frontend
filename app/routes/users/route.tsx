import { redirect, useNavigate } from "react-router"
import type { Route } from "./+types/route"
import { Tabs, TabsContent } from "~/components/ui/tabs"

import PathInfo from "~/components/PathInfo"
import UserInfo from "./components/UserInfo"
import TabsList from "./components/TabsList"
import MyRecipesTab from "./components/tabs/MyRecipesTab"
import MyFavoritesTab from "./components/tabs/MyFavoritesTab"
import FollowersTab from "./components/tabs/FollowersTab"
import FollowingTab from "./components/tabs/FollowingTab"
import Title from "~/components/Title"

import {
  getGetUsersCurrentQueryKey,
  getGetUsersIdFollowersQueryKey,
  getGetUsersIdFollowingQueryKey,
  getGetUsersIdQueryKey,
  getUsersCurrent,
  getUsersId,
  getUsersIdFollowers,
  getUsersIdFollowing,
  useGetUsersCurrent,
  useGetUsersId,
} from "~/api/generated/endpoints/user/user"

import { queryClient } from "~/api/query-client"
import type {
  GetRecipesParams,
  GetUsersIdFollowersParams,
  UserProfileDto,
  UserProfilePublicDto,
} from "~/api/generated/model"
import { withErrorHandling } from "~/lib/api-error-handler"
import {
  getGetRecipesFavoriteQueryKey,
  getGetRecipesQueryKey,
  getRecipes,
  getRecipesFavorite,
} from "~/api/generated/endpoints/recipes/recipes"
import { useIsSignedIn } from "~/components/auth/sign-in-hooks"
import { useEffect, useState } from "react"

const RECIPE_ITEMS_PER_PAGE = 9
const USERS_ITEMS_PER_PAGE = 5

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs): Promise<void> {
  const profileId = params.id
  const recipesPageParams = {
    page: 1,
    limit: RECIPE_ITEMS_PER_PAGE,
  } satisfies Pick<GetRecipesParams, "page" | "limit">
  const usersPageParams = {
    page: 1,
    limit: USERS_ITEMS_PER_PAGE,
  } satisfies Pick<GetUsersIdFollowersParams, "page" | "limit">

  try {
    const currentUserData = await withErrorHandling(
      queryClient.ensureQueryData({
        queryKey: getGetUsersCurrentQueryKey(),
        queryFn: () => getUsersCurrent(),
      })
    )
    const currentUser = currentUserData.data
    const isOwnProfile = currentUser.id === profileId

    const recipesQuery = queryClient.ensureQueryData({
      queryKey: getGetRecipesQueryKey({
        authorId: profileId,
        ...recipesPageParams,
      }),
      queryFn: () =>
        getRecipes({
          authorId: profileId,
          ...recipesPageParams,
        } satisfies GetRecipesParams),
    })

    const followersQuery = queryClient.ensureQueryData({
      queryKey: getGetUsersIdFollowersQueryKey(profileId, usersPageParams),
      queryFn: () => getUsersIdFollowers(profileId, usersPageParams),
    })

    if (isOwnProfile) {
      await withErrorHandling(
        Promise.all([
          recipesQuery,
          followersQuery,
          queryClient.ensureQueryData({
            queryKey: getGetRecipesFavoriteQueryKey(recipesPageParams),
            queryFn: () => getRecipesFavorite(recipesPageParams),
          }),
          queryClient.ensureQueryData({
            queryKey: getGetUsersIdFollowingQueryKey(
              profileId,
              usersPageParams
            ),
            queryFn: () => getUsersIdFollowing(profileId, usersPageParams),
          }),
        ])
      )

      return
    }

    await withErrorHandling(
      Promise.all([
        recipesQuery,
        followersQuery,
        queryClient.ensureQueryData({
          queryKey: getGetUsersIdQueryKey(profileId),
          queryFn: () => getUsersId(profileId),
        }),
        queryClient.ensureQueryData({
          queryKey: getGetUsersIdFollowingQueryKey(currentUser.id),
          queryFn: () => getUsersIdFollowing(currentUser.id),
        }),
      ])
    )

    return
  } catch {
    const destinationUrl = new URL(request.url)

    const currentUrl = new URL(window.location.href)
    const scrollY = String(window.scrollY)
    if (currentUrl.pathname === destinationUrl.pathname) {
      throw redirect(`/?modal=sign-in&scrollY=${scrollY}`)
    }

    currentUrl.searchParams.set("modal", "sign-in")
    currentUrl.searchParams.set("scrollY", scrollY)
    throw redirect(currentUrl.pathname + currentUrl.search)
  }
}

export default function UserProfilePage({ params }: Route.ComponentProps) {
  const navigate = useNavigate()
  const profileId = params.id

  const { data: currentUserResponse } = useGetUsersCurrent()
  const currentUser = currentUserResponse?.data as UserProfileDto | undefined
  const currentUserId = currentUser?.id ?? null
  const isOwnProfile = currentUser?.id === profileId

  const { data: publicUserResponse } = useGetUsersId(profileId, {
    query: {
      enabled: !!currentUser && !isOwnProfile,
    },
  })

  const user = isOwnProfile
    ? currentUser
    : (publicUserResponse?.data as UserProfilePublicDto | undefined)

  const availableTabs = isOwnProfile
    ? ["my-recipes", "my-favorites", "followers", "following"]
    : ["my-recipes", "followers"]

  const [currentTab, setCurrentTab] = useState<string>("my-recipes")
  const activeTab = availableTabs.includes(currentTab)
    ? currentTab
    : "my-recipes"

  const isSignedIn = useIsSignedIn()

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/?modal=sign-in")
    }
  }, [isSignedIn, navigate])

  if (!user) {
    return null
  }

  return (
    <div className="bg-background text-foreground">
      <div className="flex w-full max-w-7xl flex-col items-start gap-10">
        <PathInfo currentPageName={"Profile"} />

        <Title as="h2" className="text-[28px] text-foreground lg:text-[40px]">
          Profile
        </Title>

        <div className="flex w-full flex-col items-start gap-10 lg:flex-row">
          <aside className="mx-auto w-full max-w-[394px] md:w-auto lg:mx-0">
            {isOwnProfile ? (
              <UserInfo
                key={user.id}
                isOwnProfile={true}
                user={user as UserProfileDto}
              />
            ) : (
              <UserInfo
                key={user.id}
                isOwnProfile={false}
                user={user as UserProfilePublicDto}
              />
            )}
          </aside>

          <div className="flex w-full flex-1 flex-col gap-10">
            <Tabs
              value={activeTab}
              onValueChange={(v) => {
                setCurrentTab(v)
              }}
              className="w-full"
            >
              <TabsList isOwnProfile={isOwnProfile} />
              <div className="mt-10">
                <TabsContent
                  value={activeTab}
                  className="border-none p-0 outline-none"
                >
                  {activeTab === "my-recipes" && (
                    <MyRecipesTab
                      profileId={profileId}
                      isOwnProfile={isOwnProfile}
                    />
                  )}

                  {activeTab === "my-favorites" && isOwnProfile && (
                    <MyFavoritesTab isOwnProfile={isOwnProfile} />
                  )}

                  {activeTab === "followers" && (
                    <FollowersTab profileId={profileId} myId={currentUserId} />
                  )}

                  {activeTab === "following" && isOwnProfile && (
                    <FollowingTab profileId={profileId} myId={currentUserId} />
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
