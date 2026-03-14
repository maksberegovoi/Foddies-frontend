import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes"

export default [
  layout("./layout.tsx", [
    index("routes/home/route.tsx"),

    route("category/:id", "routes/temp.tsx", { id: "category-route" }),
  ]),

  route(".well-known/appspecific/com.chrome.devtools.json", "routes/temp.tsx", {
    id: "chrome-devtools-fix",
  }),
] satisfies RouteConfig
