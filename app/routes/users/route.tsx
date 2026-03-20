import { useLoaderData, useSearchParams } from "react-router"
import type { Route } from "./+types/route"
import { Tabs, TabsContent } from "~/components/ui/tabs"

import PathInfo from "~/components/PathInfo"
import MainTitle from "~/components/MainTitle"
import UserInfo from "./components/UserInfo"
import TabsList from "./components/TabsList"
import ListItems from "./components/ListItems"

const API_BASE_URL = "https://foddies-backend.onrender.com/api/v1";

const apiFetch = async (endpoint: string) => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
  });

  if (!res.ok) {
    throw new Error(`Помилка API: ${res.status}`);
  }
  return res.json();
};

export async function clientLoader({ request, params }: Route.ClientLoaderArgs) {
  const url = new URL(request.url)
  const tab = url.searchParams.get("tab") || "my-recipes"
  const page = url.searchParams.get("page") || "1"
  
  const userIdFromUrl = params.id;

  try {
    const currentUserRes = await apiFetch('/users/current');
    const currentUser = currentUserRes.data;
    const myId = currentUser.id || currentUser._id;

    // ДОДАЄМО: Отримуємо список підписок поточного юзера
    const myFollowingRes = await apiFetch(`/users/${myId}/following`);
    const myFollowingIds = (myFollowingRes.data || []).map((u: any) => u.id || u._id);

    const isOwn = !userIdFromUrl || userIdFromUrl === "profile" || userIdFromUrl === myId;

    let targetUser = currentUser;
    if (!isOwn) {
      const targetUserRes = await apiFetch(`/users/${userIdFromUrl}`);
      targetUser = targetUserRes.data;
    }

    // Оновлюємо статус підписки для цільового профілю
    targetUser.isFollowed = myFollowingIds.includes(targetUser.id || targetUser._id);

    const targetId = targetUser.id || targetUser._id;
    let itemsData;
    let type: "recipe" | "user" = "recipe";

    switch (tab) {
      case "followers":
        itemsData = await apiFetch(`/users/${targetId}/followers?page=${page}`);
        type = "user";
        break;
      case "following":
        itemsData = await apiFetch(`/users/${targetId}/following?page=${page}`);
        type = "user";
        break;
      case "my-favorites":
        itemsData = isOwn ? await apiFetch(`/recipes/favorite?page=${page}`) : { data: [] };
        type = "recipe";
        break;
      case "my-recipes":
      default:
        itemsData = await apiFetch(isOwn ? `/recipes/my?page=${page}` : `/recipes?authorId=${targetId}&page=${page}`);
        type = "recipe";
    }

    return { 
      user: targetUser, 
      items: itemsData.data || [], 
      isOwn, 
      type,
      myFollowingIds // ПЕРЕДАЄМО ДАЛІ
    };
  } catch (error) {
    console.error("Loader Error:", error);
    return null;
  }
}

export default function UserProfilePage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get("tab") || "my-recipes"

  if (!loaderData) {
    return (
      <div className="py-20 text-center text-gray-400">
        Loading...
      </div>
    );
  }

  const profileKey = loaderData.user.id || loaderData.user._id;

  return (
    <div key={profileKey} className="container mx-auto flex flex-col items-center gap-10 px-4 py-10 lg:gap-30 lg:py-42.5">
      <div className="flex w-full max-w-7xl flex-col items-start gap-10">
        <PathInfo currentPageName={"Profile"} />
        
        <div className="flex flex-col items-start gap-5">
          <MainTitle className="text-[28px] lg:text-[40px]">
            Profile
          </MainTitle>
        </div>

        <div className="flex w-full flex-col items-start gap-10 lg:flex-row">
          <aside className="w-full lg:w-auto lg:min-w-110">
            <UserInfo user={loaderData.user} isOwnProfile={loaderData.isOwn} />
          </aside>

          <main className="flex w-full flex-1 flex-col gap-10">
            <Tabs value={currentTab} onValueChange={(v) => setSearchParams({ tab: v })} className="w-full">
              <TabsList isOwnProfile={loaderData.isOwn} />
              <div className="mt-10">
                <TabsContent value={currentTab} className="p-0 outline-none">
                  <ListItems 
                    items={loaderData.items} 
                    type={loaderData.type} 
                    isOwnProfile={loaderData.isOwn}
                    currentTab={currentTab}
                    myFollowingIds={loaderData.myFollowingIds} // ДОДАНО СЮДИ
                  />
                </TabsContent>
              </div>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}