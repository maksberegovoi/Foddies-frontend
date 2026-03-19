import { useLoaderData, useSearchParams } from "react-router"
import type { Route } from "./+types/route"
import { Tabs, TabsContent } from "~/components/ui/tabs"

import PathInfo from "~/components/PathInfo"
import MainTitle from "~/components/MainTitle"
import UserInfo from "./components/UserInfo"
import TabsList from "./components/TabsList"
import ListItems from "./components/ListItems"

const API_BASE_URL = "https://foddies-backend.onrender.com/api/v1";

const apiFetch = async (endpoint: string, withCredentials = true) => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: withCredentials ? "include" : "omit", 
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
    const currentUserRes = await apiFetch('/users/current', true);
    const currentUser = currentUserRes.data;
    const myId = currentUser.id || currentUser._id;

    const isOwn = !userIdFromUrl || userIdFromUrl === "profile" || userIdFromUrl === myId;

    let targetUser;
    let itemsData;
    let type: "recipe" | "user" = "recipe";

    if (isOwn) {
      targetUser = currentUser;
      
      switch (tab) {
        case "followers":
          itemsData = await apiFetch(`/users/${myId}/followers?page=${page}`, true);
          type = "user";
          break;
        case "following":
          itemsData = await apiFetch(`/users/${myId}/following?page=${page}`, true);
          type = "user";
          break;
        case "my-favorites":
          itemsData = await apiFetch(`/recipes/favorite?page=${page}`, true);
          type = "recipe";
          break;
        case "my-recipes":
        default:
          itemsData = await apiFetch(`/recipes/my?page=${page}`, true);
          type = "recipe";
      }
    } else {
      const targetUserRes = await apiFetch(`/users/${userIdFromUrl}`, false);
      targetUser = targetUserRes.data;
      const targetId = targetUser.id || targetUser._id;

      switch (tab) {
        case "followers":
          itemsData = await apiFetch(`/users/${targetId}/followers?page=${page}`, false);
          type = "user";
          break;
        case "my-recipes":
        default:
          itemsData = await apiFetch(`/recipes?ownerId=${targetId}&page=${page}`, false);
          type = "recipe";
      }
    }

    return { 
      user: targetUser, 
      items: itemsData?.data || [], 
      meta: itemsData?.meta, 
      isOwn, 
      type 
    };
  } catch (error) {
    console.error("Loader Error:", error);
    if (userIdFromUrl && userIdFromUrl !== "profile") {
        try {
            const publicUserRes = await apiFetch(`/users/${userIdFromUrl}`, false);
            const recipesRes = await apiFetch(`/recipes?ownerId=${userIdFromUrl}`, false);
            return {
                user: publicUserRes.data,
                items: recipesRes.data || [],
                isOwn: false,
                type: "recipe"
            };
        } catch (e) {
            return null;
        }
    }
    return null;
  }
}

export default function UserProfilePage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get("tab") || "my-recipes"

  if (!loaderData) return <div className="py-20 text-center text-gray-400">Користувача не знайдено або помилка доступу.</div>;

  const profileKey = loaderData.user.id || loaderData.user._id;

  return (
    <div key={profileKey} className="container mx-auto flex flex-col items-center gap-10 px-4 py-10 lg:gap-30 lg:py-42.5">
      <div className="flex w-full max-w-7xl flex-col items-start gap-10">
        <PathInfo currentPageName={loaderData.isOwn ? "profile" : loaderData.user.name} />
        
        <div className="flex flex-col items-start gap-5">
          <MainTitle className="text-[28px] lg:text-[40px]">
            {loaderData.isOwn ? "Profile" : "User Profile"}
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