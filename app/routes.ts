import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes"

export default [
  layout("./layout.tsx", [
    route("/", "routes/home/route.tsx", [
      index("routes/home/categories.tsx"),
      route("category/:cid", "routes/home/category.tsx"),
    ]),

    ...prefix("recipe", [
      index("routes/recipe/index.tsx"),
      route("add", "routes/recipe/add.tsx"),
      route(":id", "routes/recipe/details.tsx"),
    ]),

    route("user/:id", "routes/users/route.tsx"),
  ]),
  route("*", "routes/not-found/route.tsx"),

  route(".well-known/appspecific/com.chrome.devtools.json", "routes/temp.tsx", {
    id: "chrome-devtools-fix",
  }),
] satisfies RouteConfig
