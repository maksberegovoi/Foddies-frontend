import { redirect, useNavigate, useSearchParams } from "react-router"
import type { Route } from "./+types/route"
import { Tabs, TabsContent } from "~/components/ui/tabs"

import PathInfo from "~/components/PathInfo"
import UserInfo from "./components/UserInfo"
import TabsList from "./components/TabsList"
import ListItems from "./components/ListItems"
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
} from "~/api/generated/endpoints/user/user"

import { queryClient } from "~/api/query-client"
import type {
  GetRecipes200,
  GetRecipesFavorite200,
  GetRecipesParams,
  GetUsersIdFollowers200,
  GetUsersIdFollowing200,
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
import { useEffect } from "react"

export type LoaderResult =
  | {
      isOwnProfile: true
      user: UserProfileDto
      favoriteRecipes: GetRecipesFavorite200
      following: GetUsersIdFollowing200
      recipes: GetRecipes200
      followers: GetUsersIdFollowers200
    }
  | {
      isOwnProfile: false
      user: UserProfilePublicDto
      recipes: GetRecipes200
      followers: GetUsersIdFollowers200
    }

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs): Promise<LoaderResult> {
  const paramsUserId = params.id

  try {
    const currentUserData = await withErrorHandling(
      queryClient.ensureQueryData({
        queryKey: getGetUsersCurrentQueryKey(),
        queryFn: () => getUsersCurrent(),
      })
    )
    const currentUser = currentUserData.data
    const isOwnProfile = currentUser.id === paramsUserId

    const recipesQuery = queryClient.ensureQueryData({
      queryKey: getGetRecipesQueryKey(),
      queryFn: () =>
        getRecipes({ authorId: paramsUserId } satisfies GetRecipesParams),
    })

    const followersQuery = queryClient.ensureQueryData({
      queryKey: getGetUsersIdFollowersQueryKey(),
      queryFn: () => getUsersIdFollowers(paramsUserId),
    })

    if (isOwnProfile) {
      const [recipes, followers, favoriteRecipes, following] =
        await withErrorHandling(
          Promise.all([
            recipesQuery,
            followersQuery,
            queryClient.ensureQueryData({
              queryKey: getGetRecipesFavoriteQueryKey(),
              queryFn: () => getRecipesFavorite(),
            }),
            queryClient.ensureQueryData({
              queryKey: getGetUsersIdFollowingQueryKey(),
              queryFn: () => getUsersIdFollowing(paramsUserId),
            }),
          ])
        )

      return {
        isOwnProfile: true,
        user: currentUser as UserProfileDto,
        recipes,
        favoriteRecipes,
        followers,
        following,
      }
    }

    const [recipes, followers, publicUser] = await withErrorHandling(
      Promise.all([
        recipesQuery,
        followersQuery,
        queryClient.ensureQueryData({
          queryKey: getGetUsersIdQueryKey(),
          queryFn: () => getUsersId(paramsUserId),
        }),
      ])
    )

    return {
      isOwnProfile: false,
      user: publicUser.data as UserProfilePublicDto,
      recipes,
      followers,
    }
  } catch {
    const destinationUrl = new URL(request.url)

    const currentUrl = new URL(window.location.href)
    if (currentUrl.pathname === destinationUrl.pathname) {
      throw redirect("/?modal=sign-in")
    }

    currentUrl.searchParams.set("modal", "sign-in")
    throw redirect(currentUrl.pathname + currentUrl.search)
  }
}

export default function UserProfilePage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate()
  const data = loaderData as LoaderResult

  const favoriteRecipes = data.isOwnProfile ? data.favoriteRecipes : undefined
  const following = data.isOwnProfile ? data.following : undefined
  const { isOwnProfile, user, recipes, followers } = data

  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get("tab") || "my-recipes"
  // const page = Number(searchParams.get("page") || "1")

  let items: any[] = []
  let type: "recipe" | "user" = "recipe"

  switch (currentTab) {
    case "followers":
      items = followers?.data || []
      type = "user"
      break
    case "following":
      items = following?.data || []
      type = "user"
      break
    case "my-favorites":
      items = isOwnProfile ? favoriteRecipes?.data || [] : []
      type = "recipe"
      break
    case "my-recipes":
    default:
      items = recipes?.data || []
      type = "recipe"
  }

  const followingIds = following?.data.map((i) => i.id)

  const isSignedIn = useIsSignedIn()

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/?modal=sign-in")
    }
  }, [isSignedIn])

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
              value={currentTab}
              onValueChange={(v) => setSearchParams({ tab: v })}
              className="w-full"
            >
              <TabsList isOwnProfile={isOwnProfile} />
              <div className="mt-10">
                <TabsContent
                  value={currentTab}
                  className="border-none p-0 outline-none"
                >
                  <ListItems
                    items={items}
                    type={type}
                    isOwnProfile={isOwnProfile}
                    currentTab={currentTab}
                    myFollowingIds={followingIds}
                    myId={isOwnProfile ? user.id : null}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}