import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { MoveUpRight, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";

function UserRecipePreviews({ userId, totalRecipes }: { userId: string; totalRecipes: number }) {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (!totalRecipes || totalRecipes === 0) return;
    const controller = new AbortController();

    fetch(`https://foddies-backend.onrender.com/api/v1/recipes?ownerId=${userId}&limit=4`, { 
      signal: controller.signal,
      credentials: "include" 
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          const images = res.data
            .filter((recipe: any) => {
              const remoteAuthorId = recipe.ownerId || (typeof recipe.author === 'object' ? recipe.author?._id : recipe.author);
              return remoteAuthorId === userId;
            })
            .map((r: any) => r.image?.phone || r.image?.original);
          
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

export default function ListItems({ items, type, isOwnProfile, currentTab }: any) {
  const navigate = useNavigate();
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const handleDeleteRecipe = async (recipeId: string) => {
    if (!confirm("Ви впевнені, що хочете видалити цей рецепт?")) return;

    try {
      const res = await fetch(`https://foddies-backend.onrender.com/api/v1/recipes/${recipeId}`, {
        method: 'DELETE',
        credentials: "include"
      });

      if (res.ok) {
        setLocalItems((prev: any[]) => prev.filter(item => (item.id !== recipeId && item._id !== recipeId)));
      } else {
        const errorData = await res.json();
        alert(`Помилка видалення: ${errorData.message || res.status}`);
      }
    } catch (err) {
      console.error("Помилка при видаленні:", err);
    }
  };

  const handleFollowToggle = async (id: string, currentlyFollowing: boolean) => {
    const method = currentlyFollowing ? 'DELETE' : 'POST';
    try {
      const res = await fetch(`https://foddies-backend.onrender.com/api/v1/users/follow/${id}`, {
        method,
        credentials: "include" 
      });
      if (res.ok) {
        setLocalItems((prev: any[]) => prev.map(item => 
          (item.id === id || item._id === id) ? { ...item, isFollowed: !currentlyFollowing } : item
        ));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!localItems || localItems.length === 0) {
    let emptyMessage = "";
    switch (currentTab) {
      case "my-recipes":
        emptyMessage = "Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future.";
        break;
      case "my-favorites":
        emptyMessage = "Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for easy access in the future.";
        break;
      case "followers":
        emptyMessage = "There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile.";
        break;
      case "following":
        emptyMessage = "Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you.";
        break;
      default:
        emptyMessage = "Nothing found here yet.";
    }

    return (
      <div className="py-20 text-center max-w-[600px] mx-auto">
        <p className="text-[#BFBEBE] text-[14px] leading-[20px] tracking-[-0.02em] md:text-[#1A1A1A] md:text-[16px] md:leading-[24px] md:tracking-[-0.02em]">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col divide-y divide-[#BFBEBE]/20">
      {localItems.map((item: any) => {
        const itemId = item.id || item._id;
        return (
          <div key={itemId} className="py-[20px] first:pt-0 last:border-none">
            {type === "recipe" ? (
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#BFBEBE] transition-all hover:bg-black hover:text-white lg:h-12 lg:w-12"
                  >
                    <MoveUpRight className="h-5 w-5 lg:h-6 lg:w-6" />
                  </Link>

                  {isOwnProfile && currentTab === "my-recipes" && (
                    <Button 
                      onClick={() => handleDeleteRecipe(itemId)}
                      className="flex h-10 w-10 bg-transparent items-center justify-center rounded-full border border-[#BFBEBE] transition-all hover:bg-black hover:text-white lg:h-12 lg:w-12 group"
                    >
                      <Trash2 className="h-5 w-5 text-black group-hover:text-white lg:h-6 lg:w-6" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-0 lg:flex-row lg:items-center lg:gap-6">
                <div className="flex w-full items-start justify-between lg:flex-1 lg:items-center lg:gap-6">
                  <div className="flex items-center gap-4 lg:gap-6">
                    <div 
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-full lg:h-28 lg:w-28 cursor-pointer"
                      onClick={() => navigate(`/user/${itemId}`)}
                    >
                      <img 
                        src={item.avatarURL || "/fallback_ava.png"} 
                        className="h-full w-full object-cover" 
                        alt={item.name} 
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 
                        className="text-[16px] md:text-[20px] font-extrabold uppercase tracking-tight text-black cursor-pointer"
                        onClick={() => navigate(`/user/${itemId}`)}
                      >
                        {item.name}
                      </h4>
                      <p className="text-[12px] md:text-[14px] font-medium leading-[20px] tracking-[-0.02em] text-[#BFBEBE]">
                        Own recipes: <span className="text-dark">{item.totalRecipes || 0}</span>
                      </p>
                      <Button
                        variant="outlineBlack"
                        onClick={() => handleFollowToggle(itemId, item.isFollowed)}
                        className="mt-2 h-auto w-fit rounded-full px-[24px] py-[10px] text-[14px] md:text-[16px] font-bold uppercase tracking-[-0.02em] border border-[#BFBEBE] hover:bg-black hover:text-white transition-colors"
                      >
                        {item.isFollowed ? "Unfollow" : "Follow"}
                      </Button>
                    </div>
                  </div>

                  <Link 
                    to={`/user/${itemId}`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 transition-colors hover:bg-black hover:text-white lg:hidden"
                  >
                    <MoveUpRight className="h-6 w-6" />
                  </Link>
                </div>

                <div className="hidden items-center gap-4 md:flex lg:flex-[2] lg:gap-10">
                  <UserRecipePreviews 
                    userId={itemId} 
                    totalRecipes={item.totalRecipes || 0} 
                  />

                  <Link 
                    to={`/user/${itemId}`}
                    className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 transition-colors hover:bg-black hover:text-white lg:flex lg:h-14 lg:w-14"
                  >
                    <MoveUpRight className="h-6 w-6 lg:h-8 lg:w-8" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}