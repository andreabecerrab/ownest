import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("manager", "routes/manager.tsx"),
	route("mobile-app", "routes/mobile-app.tsx"),
	route("car-app", "routes/car-app.tsx"),
] satisfies RouteConfig;
