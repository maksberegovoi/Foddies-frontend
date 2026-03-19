import { useLoaderData, useSearchParams } from "react-router"
import type { Route } from "./+types/route"
import { Tabs, TabsContent } from "~/components/ui/tabs"

import PathInfo from "~/components/PathInfo"
import MainTitle from "~/components/MainTitle"
import Subtitle from "~/components/Subtitle"
import UserInfo from "./components/UserInfo"
import TabsList from "./components/TabsList"
import ListItems from "./components/ListItems"

const API_BASE_URL = "https://foddies-backend.onrender.com/api/v1";

const apiFetch = async (endpoint: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    if (res.status === 401) console.error("Токен недійсний");
    throw new Error(`Помилка API: ${res.status}`);
  }
  return res.json();
};

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url)
  const tab = url.searchParams.get("tab") || "my-recipes"
  const page = url.searchParams.get("page") || "1"

  try {
    const userRes = await apiFetch('/users/current');
    const user = userRes.data;

    let itemsData;
    let type: "recipe" | "user" = "recipe";

    switch (tab) {
      case "my-recipes":
        itemsData = await apiFetch(`/recipes/my?page=${page}`);
        type = "recipe";
        break;
      case "my-favorites":
        itemsData = await apiFetch(`/recipes/favorite?page=${page}`);
        type = "recipe";
        break;
      case "followers":
        itemsData = await apiFetch(`/users/${user.id}/followers?page=${page}`);
        type = "user";
        break;
      case "following":
        itemsData = await apiFetch(`/users/${user.id}/following?page=${page}`);
        type = "user";
        break;
      default:
        itemsData = await apiFetch(`/recipes/my?page=${page}`);
    }

    return {
      user,
      items: itemsData.data || [],
      meta: itemsData.meta,
      isOwn: true,
      type
    };
  } catch (error) {
    console.error("Помилка завантаження профілю:", error);
    return null;
  }
}

export default function ProfilePage() {
  const loaderData = useLoaderData<typeof clientLoader>()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get("tab") || "my-recipes"

  if (!loaderData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray uppercase font-bold tracking-widest">Loading Profile...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex flex-col items-center gap-10 px-4 py-10 lg:gap-30 lg:py-42.5">
      <div className="flex w-full max-max-w-7xl flex-col items-start gap-10">
        <PathInfo currentPageName="profile" />
        
        <div className="flex flex-col items-start gap-5">
          <MainTitle className="text-[28px] lg:text-[40px]">Profile</MainTitle>
          <Subtitle className="max-w-110.75 text-[16px] text-[#BFBEBE]">
            Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
          </Subtitle>
        </div>

        <div className="flex w-full flex-col items-start gap-10 lg:flex-row">
          <aside className="w-full lg:w-auto lg:min-w-110">
            <UserInfo user={loaderData.user} isOwnProfile={loaderData.isOwn} />
          </aside>

          <main className="flex w-full flex-1 flex-col gap-10">
            <Tabs value={currentTab} onValueChange={(v) => setSearchParams({ tab: v })} className="text-[18px] md:text-[20px] w-full">
              <TabsList />
              <div className="mt-10">
                <TabsContent value={currentTab} className="p-0 outline-none">
                  <ListItems items={loaderData.items} type={loaderData.type} />
                </TabsContent>
              </div>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}