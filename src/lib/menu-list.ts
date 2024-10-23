import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          active: pathname === "/posts",
          icon: SquarePen,
          submenus: [
            {
              href: "/dashboard/posts",
              label: "All Posts",
              active: pathname === "/dashboard/posts",
            },
            {
              href: "/dashboard/posts/add-post",
              label: "Add Post",
              active: pathname === "/dashboard/posts/add-post",
            },
          ],
        },
      ],
    },
  ];
}
