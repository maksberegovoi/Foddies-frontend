import { Button } from "~/components/ui/button";

interface UserInfoProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatarURL: string | null;
    totalRecipes: number;
    totalFavoriteRecipes: number;
    totalFollowers: number;
    totalFollowing: number;
  };
  isOwnProfile: boolean;
}

export default function UserInfo({ user, isOwnProfile }: UserInfoProps) {
  const stats = [
    { label: "Email:", value: user.email },
    { label: "Added recipes:", value: user.totalRecipes || 0 },
    { label: "Favorites:", value: user.totalFavoriteRecipes || 0 },
    { label: "Followers:", value: user.totalFollowers || 0 },
    { label: "Following:", value: user.totalFollowing || 0 },
  ];

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await fetch('https://foddies-backend.onrender.com/api/v1/users/avatar', {
        method: 'PATCH',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (res.ok) window.location.reload();
    } catch (err) {
      console.error("Avatar upload failed", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full flex-col items-center gap-5 rounded-[30px] border border-gray px-[69px] py-[30px] lg:px-[80px] py-[40px]">
        <div className="relative h-20 w-20 md:h-30 md:w-30 shrink-0 overflow-hidden rounded-full group">
          <img
            src={user.avatarURL || "/fallback_ava.png"}
            alt={user.name}
            className="size-full object-cover"
          />
          {isOwnProfile && (
            <label className="absolute bottom-0.5 left-1/2 -translate-x-1/2 rounded-[30px] bg-dark p-2.5 cursor-pointer hover:bg-black transition-colors">
              <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
              <div className="flex size-4.5 items-center justify-center rounded-full bg-white text-[10px] font-bold">+</div>
            </label>
          )}
        </div>

        <h3 className="text-[18px] md:text-[20px] font-extrabold tracking-[-0.4px] text-dark uppercase text-center md:text-left">
          {user.name}
        </h3>

        <div className="flex w-full flex-col gap-2">
          {stats.map((item) => (
            <div key={item.label} className="flex items-center gap-2 border-b border-gray/10 pb-1.5 last:border-none">
              <span className="text-sm font-medium tracking-tight text-gray">{item.label}</span>
              <span className="text-sm font-bold tracking-tight text-dark truncate max-w-[188px]">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {isOwnProfile && (
        <Button onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; }} variant="default" className="h-auto w-full rounded-[30px] py-4 text-base font-bold uppercase">
          Log Out
        </Button>
      )}
    </div>
  );
}