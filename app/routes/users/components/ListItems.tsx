import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import FIcon from "~/components/FIcon"; 

function UserRecipePreviews({ userId, totalRecipes }: { userId: string; totalRecipes: number }) {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (!totalRecipes || totalRecipes === 0) return;
    const controller = new AbortController();

    fetch(`https://foddies-backend.onrender.com/api/v1/recipes?authorId=${userId}&limit=4`, { 
      signal: controller.signal,
      credentials: "include" 
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          const images = res.data.map((r: any) => r.image?.phone || r.image?.original);
          setPreviews(images);
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort();
  }, [userId, totalRecipes]);

  return (
    <div className="hidden md:grid flex-1 grid-cols-4 gap-2 lg:gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="aspect-square overflow-hidden rounded-xl bg-gray-50 lg:rounded-2xl">
          {previews[i] ? (
            <img src={previews[i]} className="h-full w-full object-cover" alt="" />
          ) : (
            <div className="flex h-full w-full items-center justify-center border-2 border-dashed border-gray-100 text-gray-200">
              <span className="text-xs uppercase font-bold tracking-tighter">Empty</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ListItems({ items, type, isOwnProfile, currentTab, myFollowingIds = [], myId }: any) {
  const navigate = useNavigate();
  const [localItems, setLocalItems] = useState<any[]>([]);

  useEffect(() => {
    if (items) {
      setLocalItems(items.map((item: any) => ({
        ...item,
        isFollowed: myFollowingIds.includes(item.id || item._id)
      })));
    }
  }, [items, myFollowingIds]);

  const handleDeleteItem = async (itemId: string) => {
    const isFavoriteTab = currentTab === "my-favorites";
    const confirmMsg = isFavoriteTab 
      ? "Видалити цей рецепт з обраного?" 
      : "Ви впевнені, що хочете видалити цей рецепт?";

    if (!confirm(confirmMsg)) return;

    try {
      const url = isFavoriteTab 
        ? `https://foddies-backend.onrender.com/api/v1/recipes/${itemId}/favorite` 
        : `https://foddies-backend.onrender.com/api/v1/recipes/${itemId}`;

      const res = await fetch(url, {
        method: 'DELETE',
        credentials: "include"
      });

      if (res.ok) {
        setLocalItems((prev) => prev.filter(item => (item.id !== itemId && item._id !== itemId)));
      }
    } catch (err) {
      console.error("Помилка при видаленні:", err);
    }
  };

  const handleFollowToggle = async (id: string, currentlyFollowing: boolean) => {
    const method = currentlyFollowing ? 'DELETE' : 'POST'; 
    try {
      const res = await fetch(`https://foddies-backend.onrender.com/api/v1/users/${id}/follow`, {
        method,
        credentials: "include" 
      });

      if (res.ok) {
        setLocalItems((prev) => prev.map(item => 
          (item.id === id || item._id === id) ? { ...item, isFollowed: !currentlyFollowing } : item
        ));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!localItems || localItems.length === 0) {
    let emptyMessage = "Nothing found here yet.";
    switch (currentTab) {
      case "my-recipes":
        emptyMessage = "Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future.";
        break;
      case "my-favorites":
        emptyMessage = "Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for easy access in the future.";
        break;
      case "followers":
        emptyMessage = "There are currently no followers on your account.";
        break;
      case "following":
        emptyMessage = "Your account currently has no subscriptions to other users.";
        break;
    }

    return (
      <div className="py-20 text-center max-w-[600px] mx-auto">
        <p className="text-[#BFBEBE] text-[14px] leading-[20px] md:text-[#1A1A1A] md:text-[16px]">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col divide-y divide-[#BFBEBE]">
      {localItems.map((item: any) => {
        const itemId = item.id || item._id;
        if (type === "recipe" || currentTab === "my-favorites") {
          return (
            <div key={itemId} className="py-[20px] first:pt-0 last:border-none">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 lg:gap-6">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[20px] md:h-30 md:w-30 lg:h-30 lg:w-30">
                    <img 
                      src={item.image?.phone || item.image?.original || "/fallback_recipe.png"} 
                      className="h-full w-full object-cover" 
                      alt={item.title} 
                    />
                  </div>
                  <div className="flex flex-col gap-1 lg:gap-2">
                    <h4 className="text-[18px] md:text-[20px] font-bold uppercase tracking-tight text-black">
                      {item.title}
                    </h4>
                    <p className="line-clamp-2 text-[14px] md:text-[16px] text-gray-500 leading-relaxed font-medium">
                      {item.instructions}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 lg:gap-3 shrink-0 pt-1">
                  <Link 
                    to={`/recipe/${itemId}`} 
                    className="group flex h-[36px] w-[36px] bg-transparent items-center justify-center rounded-full border border-[#BFBEBE] transition-all hover:bg-black lg:h-[42px] lg:w-[42px]"
                  >
                    <FIcon iconName="arrow-up-right" className="size-[16px] stroke-black transition-colors group-hover:stroke-white lg:size-[18px]" />
                  </Link>
                  {isOwnProfile && (currentTab === "my-recipes" || currentTab === "my-favorites") && (
                    <Button 
                      onClick={() => handleDeleteItem(itemId)} 
                      className="group flex h-[36px] w-[36px] bg-transparent items-center justify-center rounded-full border border-[#BFBEBE] transition-all hover:bg-black lg:h-[42px] lg:w-[42px]"
                    >
                      <FIcon iconName="trash" className="size-[18px] stroke-black transition-colors group-hover:stroke-white lg:size-[20px]" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        }

        return (
          <div key={itemId} className="py-[20px] first:pt-0 last:border-none">
            <div className="flex flex-col gap-0 md:flex-row md:items-center md:gap-[60px] lg:gap-[75px]">
              <div className="flex w-full items-start justify-between md:flex-1 md:items-center lg:gap-6">
                <div className="flex items-center gap-[16px]">
                  <div 
                    className="h-[60px] w-[60px] md:h-[85px] md:w-[85px] shrink-0 overflow-hidden rounded-full cursor-pointer"
                    onClick={() => navigate(`/user/${itemId}`)}
                  >
                    <img src={item.avatarURL || "/fallback_ava.png"} className="h-full w-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex flex-col">
                    <h4 
                      className="text-[16px] md:text-[20px] font-extrabold uppercase tracking-tight text-black cursor-pointer"
                      onClick={() => navigate(`/user/${itemId}`)}
                    >
                      {item.name}
                    </h4>
                    <p className="text-[12px] md:text-[14px] font-medium leading-[20px] text-[#BFBEBE]">
                      Own recipes: <span className="text-dark">{item.totalRecipes || 0}</span>
                    </p>
                    {itemId !== myId && (
                      <Button
                        onClick={() => handleFollowToggle(itemId, !!item.isFollowed)}
                        className="mt-2 h-auto w-fit min-w-[130px] rounded-full px-[24px] py-[10px] text-[14px] border transition-colors bg-transparent border-[#BFBEBE] text-dark hover:bg-black hover:text-white"
                      >
                        {item.isFollowed ? "Unfollow" : "Follow"}
                      </Button>
                    )}
                  </div>
                </div>

                <Link to={`/user/${itemId}`} className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 transition-all hover:bg-black md:hidden">
                  <FIcon iconName="arrow-up-right" className="size-6 stroke-black transition-colors group-hover:stroke-white" />
                </Link>
              </div>

              <div className="hidden items-start md:flex md:flex-[2] md:gap-[60px] lg:gap-[75px]">
                <UserRecipePreviews userId={itemId} totalRecipes={item.totalRecipes || 0} />
                <Link to={`/user/${itemId}`} className="group flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[#E8E8E8] transition-all hover:bg-black lg:h-[42px] lg:w-[42px]">
                  <FIcon iconName="arrow-up-right" className="size-[16px] stroke-black transition-colors group-hover:stroke-white lg:size-[18px]" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}