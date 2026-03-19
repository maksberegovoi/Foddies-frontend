import { useEffect, useState } from "react";
import { Link } from "react-router";
import { MoveUpRight, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";

function UserRecipePreviews({ userId, totalRecipes }: { userId: string; totalRecipes: number }) {
  const [previews, setPreviews] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!totalRecipes || totalRecipes === 0) {
      setPreviews([]);
      return;
    }

    fetch(`https://foddies-backend.onrender.com/api/v1/recipes?author=${userId}&limit=4`)
      .then((res) => res.json())
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          const images = res.data
            .filter((recipe: any) => {
              const authorId = typeof recipe.author === 'object' ? recipe.author._id : recipe.author;
              return authorId === userId;
            })
            .map((r: any) => r.image?.phone || r.image?.original);
          
          setPreviews(images);
        }
      })
      .catch(() => console.error("Error fetching previews for:", userId))
      .finally(() => setLoading(false));
  }, [userId, totalRecipes]);

  return (
    <div className="hidden md:grid flex-1 grid-cols-4 gap-2 lg:gap-4">
      {[...Array(4)].map((_, i) => {
        const image = previews[i];
        
        if (image) {
          return (
            <div key={i} className="aspect-square overflow-hidden rounded-xl bg-gray-50 lg:rounded-2xl">
              <img 
                src={image} 
                className="h-full w-full object-cover transition-transform hover:scale-105" 
                alt="Recipe preview" 
              />
            </div>
          );
        }

        return (
          <div 
            key={i} 
            className={`aspect-square rounded-xl border-2 border-gray-100 bg-gray-50 lg:rounded-2xl ${
              loading ? "animate-pulse" : "border-dashed"
            }`} 
          />
        );
      })}
    </div>
  );
}

interface ListItemsProps {
  items: any[];
  type: "recipe" | "user";
  isOwnProfile?: boolean;
}

export default function ListItems({ items, type, isOwnProfile }: ListItemsProps) {
  if (!items || items.length === 0) {
    return (
      <div className="py-20 text-center text-gray-400 font-medium">
        Nothing found here yet.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col divide-y divide-[#BFBEBE]-100">
      {items.map((item) => (
        <div key={item.id || item._id} className="py-[20px] first:pt-0 last:border-none">
          {type === "recipe" ? (
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4 lg:gap-6">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[20px] md:h-30 md:w-30">
                  <img 
                    src={item.image?.phone || item.image?.original || "/fallback_recipe.png"} 
                    className="h-full w-full object-cover" 
                    alt={item.title} 
                  />
                </div>
                
                <div className="flex flex-col gap-1 lg:gap-2">
                  <h4 className="text-lg font-bold uppercase tracking-tight text-black lg:text-xl">
                    {item.title}
                  </h4>
                  <p className="line-clamp-2 text-sm text-gray-500 leading-relaxed lg:line-clamp-3">
                    {item.instructions}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-3 shrink-0 pt-1">
                <Link
                  to={`/recipes/${item.id || item._id}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#BFBEBE] transition-all hover:bg-black hover:text-white lg:h-12 lg:w-12"
                >
                  <span className="sr-only">View</span>
                  <MoveUpRight className="h-5 w-5" />
                </Link>
                {isOwnProfile && (
                  <Button
                    className="flex h-10 w-10 bg-transparent items-center justify-center rounded-full border border-[#BFBEBE] transition-all hover:bg-black hover:text-white lg:h-12 lg:w-12"
                  >
                    <Trash2 className="h-5 w-5 color-[#050505]" />
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-0 lg:flex-row lg:items-center lg:gap-6">
              <div className="flex w-full items-start justify-between lg:flex-1 lg:items-center lg:gap-6">
                <div className="flex items-center gap-4 lg:gap-6">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full lg:h-28 lg:w-28">
                    <img 
                      src={item.avatarURL || "/fallback_ava.png"} 
                      className="h-full w-full object-cover" 
                      alt={item.name} 
                    />
                  </div>
                  <div className="flex flex-col gap-1 lg:gap-2">
                    <h4 className="text-[16px] md:text-[20px] font-bold uppercase tracking-tight text-black">
                      {item.name}
                    </h4>
                    <p className="text-[12px] md:text-[14px] font-medium leading-[20px] tracking-[-0.02em] text-[#BFBEBE]">
                      Own recipes: <span>{item.totalRecipes || 0}</span>
                    </p>
                    <Button
                      variant="outlineBlack"
                      className="mt-2 h-auto w-fit rounded-full px-[24px] py-[10px] text-[14px] md:text-[16px] font-bold uppercase tracking-[-0.02em] border border-[#BFBEBE] hover:bg-black hover:text-white transition-colors"
                    >
                      Unfollow
                    </Button>
                  </div>
                </div>

                <Link 
                  to={`/users/${item.id || item._id}`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 transition-colors hover:bg-black hover:text-white lg:hidden"
                >
                  <MoveUpRight className="h-6 w-6" />
                </Link>
              </div>

              <div className="hidden items-center gap-4 md:flex lg:flex-[2] lg:gap-10">
                <UserRecipePreviews 
                  userId={item.id || item._id} 
                  totalRecipes={item.totalRecipes || 0} 
                />

                <Link 
                  to={`/users/${item.id || item._id}`}
                  className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 transition-colors hover:bg-black hover:text-white lg:flex lg:h-14 lg:w-14"
                >
                  <MoveUpRight className="h-6 w-6" />
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}