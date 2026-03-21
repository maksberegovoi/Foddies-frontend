import { useSearchParams } from "react-router"
import type { Route } from "./+types/route"
import { Tabs, TabsContent } from "~/components/ui/tabs"

import PathInfo from "~/components/PathInfo"
import UserInfo from "./components/UserInfo"
import TabsList from "./components/TabsList"
import ListItems from "./components/ListItems"
import Title from "~/components/Title"

import { 
  useGetUsersCurrent, 
  useGetUsersId, 
  useGetUsersIdFollowers, 
  useGetUsersIdFollowing 
} from "~/api/generated/endpoints/user/user"

import { 
  useGetRecipesMy, 
  useGetRecipesFavorite,
  useGetRecipes
} from "~/api/generated/endpoints/recipes/recipes"

export default function UserProfilePage({ params }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get("tab") || "my-recipes"
  const page = Number(searchParams.get("page") || "1")
  
  const userIdFromUrl = params.id;

  const { data: currentUserRes, isLoading: isMeLoading } = useGetUsersCurrent();
  const currentUser = currentUserRes?.data; 
  const myId = currentUser?.id || (currentUser as any)?._id;

  const isOwn = !userIdFromUrl || userIdFromUrl === "profile" || userIdFromUrl === myId;
  const targetId = isOwn ? myId : userIdFromUrl;

  const { data: targetUserRes, isLoading: isTargetLoading } = useGetUsersId(targetId as string, {
    query: { enabled: !!targetId && !isOwn }
  });

  const activeUser = isOwn ? currentUser : targetUserRes?.data;

  const { data: myFollowingRes } = useGetUsersIdFollowing(myId as string, {}, {
    query: { enabled: !!myId }
  });
  const myFollowingIds = (myFollowingRes?.data || []).map((u: any) => u.id || u._id);

  const { data: myRecipesRes } = useGetRecipesMy({ page }, {
    query: { enabled: isOwn && currentTab === "my-recipes" }
  });
  
  const { data: targetRecipesRes } = useGetRecipes({ authorId: targetId, page }, {
    query: { enabled: !isOwn && currentTab === "my-recipes" && !!targetId }
  });

  const { data: favoriteRecipesRes } = useGetRecipesFavorite({ page }, {
    query: { enabled: isOwn && currentTab === "my-favorites" }
  });

  const { data: followersRes } = useGetUsersIdFollowers(targetId as string, { page }, {
    query: { enabled: currentTab === "followers" && !!targetId }
  });

  const { data: followingRes } = useGetUsersIdFollowing(targetId as string, { page }, {
    query: { enabled: currentTab === "following" && !!targetId }
  });

  if (isMeLoading || (isTargetLoading && !isOwn)) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!activeUser) return null;

  let items: any[] = [];
  let type: "recipe" | "user" = "recipe";

  switch (currentTab) {
    case "followers":
      items = followersRes?.data || [];
      type = "user";
      break;
    case "following":
      items = followingRes?.data || [];
      type = "user";
      break;
    case "my-favorites":
      items = isOwn ? (favoriteRecipesRes?.data || []) : [];
      type = "recipe";
      break;
    case "my-recipes":
    default:
      items = isOwn ? (myRecipesRes?.data || []) : (targetRecipesRes?.data || []);
      type = "recipe";
  }

  return (
    <div key={activeUser.id} className="bg-background text-foreground">
      <div className="flex w-full max-w-7xl flex-col items-start gap-10">
        <PathInfo currentPageName={"Profile"} />
        
        <Title as="h2" className="text-[28px] lg:text-[40px] text-foreground">
          Profile
        </Title>

        <div className="flex w-full flex-col items-start gap-10 lg:flex-row">
          <aside className="w-full mx-auto lg:mx-0 md:w-auto max-w-[394px]">
            <UserInfo 
              user={{
                ...activeUser,
                totalFavoriteRecipes: (activeUser as any).totalFavoriteRecipes ?? 0,
                totalFollowing: (activeUser as any).totalFollowing ?? 0,
                isFollowed: myFollowingIds.includes(activeUser.id || (activeUser as any)._id)
              }} 
              isOwnProfile={isOwn} 
            />
          </aside>

          <div className="flex w-full flex-1 flex-col gap-10">
            <Tabs value={currentTab} onValueChange={(v) => setSearchParams({ tab: v })} className="w-full">
              <TabsList isOwnProfile={isOwn} />
              <div className="mt-10">
                <TabsContent value={currentTab} className="p-0 outline-none border-none">
                  <ListItems 
                    items={items} 
                    type={type} 
                    isOwnProfile={isOwn}
                    currentTab={currentTab}
                    myFollowingIds={myFollowingIds}
                    myId={myId}
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