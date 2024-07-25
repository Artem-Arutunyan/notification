import { IRoute, TRoutesNames } from "@/types";

export const ROUTES: Record<TRoutesNames, IRoute> = {
  task_description: {
    route: "/task_description",
    name: "Страница с описанием задачи",
  },
  task_completed: {
    route: "/task_completed",
    name: "Страница с выполненным заданием",
  }
} as const;
