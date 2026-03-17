import { useParams } from "react-router"
import { cn } from "~/lib/utils"

import PathInfo from "~/components/PathInfo"
import MainTitle from "~/components/MainTitle"
import Subtitle from "~/components/Subtitle"

import UserInfo from "./components/UserInfo"
import TabsList from "./components/TabsList"
import ListItems from "./components/ListItems"

export default function UserPage() {
  useParams()

  return (
    <div className="container mx-auto flex flex-col items-center gap-30 px-4 py-42.5">
      {/* Header Section */}
      <div className="flex w-full max-w-7xl flex-col items-start gap-10">
        <div className="flex w-full flex-col items-start gap-10">
          <PathInfo currentPageName="profile" />
          <div className="flex flex-col items-start gap-5">
            <MainTitle>Profile</MainTitle>
            <Subtitle className="max-w-110.75">
              Reveal your culinary art, share your favorite recipe and create
              gastronomic masterpieces with us.
            </Subtitle>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex w-full flex-col items-start gap-10 lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-auto lg:min-w-110">
            <UserInfo />
          </div>

          {/* Content Area */}
          <div className="flex w-full flex-1 flex-col gap-10">
            <TabsList />
            <ListItems />

            {/* Pagination Placeholder */}
            <div className="mt-10 flex justify-center">
              <div className="flex gap-1.5">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full border border-gray text-sm",
                      page === 1 ? "bg-white text-light-dark" : "text-dark"
                    )}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
