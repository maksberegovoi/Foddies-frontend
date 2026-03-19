import { Button } from "~/components/ui/button";

interface UserInfoProps {
  user: {
    id: string;
    _id?: string;
    name: string;
    email: string;
    avatarURL: string | null;
    totalRecipes: number;
    totalFavoriteRecipes: number;
    totalFollowers: number;
    totalFollowing: number;
    isFollowed?: boolean;
  };
  isOwnProfile: boolean;
}

export default function UserInfo({ user, isOwnProfile }: UserInfoProps) {
  const stats = [
    ...(isOwnProfile ? [{ label: "Email:", value: user.email }] : []),
    { label: "Added recipes:", value: user.totalRecipes || 0 },
    ...(isOwnProfile ? [{ label: "Favorites:", value: user.totalFavoriteRecipes || 0 }] : []),
    { label: "Followers:", value: user.totalFollowers || 0 },
    { label: "Following:", value: user.totalFollowing || 0 },
  ];

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      await fetch('https://foddies-backend.onrender.com/api/v1/users/avatar', {
        method: 'PATCH',
        body: formData,
        credentials: "include"
      });
      window.location.reload(); 
    } catch (err) {
      console.error("Avatar upload failed:", err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4 rounded-[30px] bg-white p-6 shadow-sm border border-gray/5">
        <div className="relative group">
          <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-gray/10 md:h-28 md:w-28">
            <img src={user.avatarURL || "/fallback_ava.png"} className="h-full w-full object-cover" alt={user.name} />
          </div>
          {isOwnProfile && (
            <label className="absolute bot-0 left-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-dark p-2.5 hover:bg-black transition-colors">
              <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
              <div className="flex size-4.5 items-center justify-center rounded-full bg-white text-[10px] font-bold">+</div>
            </label>
          )}
        </div>

        <h3 className="text-[18px] md:text-[20px] font-extrabold tracking-[-0.4px] text-dark uppercase text-center">
          {user.name}
        </h3>

        <div className="flex w-full flex-col gap-2">
          {stats.map((item) => (
            <div key={item.label} className="flex items-center gap-2 border-b border-gray/10 pb-1.5 last:border-none px-[69px] md:px-[80px] ">
              <span className="text-sm font-medium tracking-tight text-gray">{item.label}</span>
              <span className="text-sm font-bold tracking-tight text-dark truncate max-w-[180px]">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {isOwnProfile ? (
        <Button 
          onClick={() => { localStorage.clear(); window.location.href = "/"; }}
          className="w-full rounded-[30px] py-4 uppercase font-bold"
        >
          Log Out
        </Button>
      ) : (
        <Button className="w-full rounded-[30px] py-4 uppercase font-bold">
          Follow
        </Button>
      )}
    </div>
  );
}