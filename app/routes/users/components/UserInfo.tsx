import { Button } from "~/components/ui/button"

export default function UserInfo() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full flex-col items-center gap-5 rounded-[30px] border border-gray px-20 py-10">
        <div className="relative size-30 overflow-hidden rounded-full">
          <img
            src="/fallback_ava.png"
            alt="Victoria"
            className="size-full object-cover"
          />
          <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 rounded-[30px] bg-dark p-2.5">
            {/* Plus icon placeholder */}
            <div className="flex size-4.5 items-center justify-center rounded-full bg-white text-[10px] font-bold">
              +
            </div>
          </div>
        </div>

        <h3 className="text-xl font-extrabold tracking-[-0.4px] text-dark uppercase">
          Victoria
        </h3>

        <div className="flex w-full flex-col gap-1.5">
          {[
            { label: "Email:", value: "victoria28682@gmai.com" },
            { label: "Added recipes:", value: "9" },
            { label: "Favorites:", value: "9" },
            { label: "Followers:", value: "5" },
            { label: "Following:", value: "5" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <span className="text-sm font-medium tracking-[-0.28px] text-gray">
                {item.label}
              </span>
              <span className="text-base font-bold tracking-[-0.32px] text-light-dark">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="default"
        className="h-auto w-full rounded-[30px] py-4 text-base font-bold tracking-[-0.32px] uppercase"
      >
        Log Out
      </Button>
    </div>
  )
}
