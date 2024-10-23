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
          label: "Blogs",
          active: pathname === "/blogs",
          icon: SquarePen,
          submenus: [
            {
              href: "/dashboard/blogs",
              label: "All Blogs",
              active: pathname === "/dashboard/blogs",
            },
            {
              href: "/dashboard/blogs/add-blog",
              label: "Add Blog",
              active: pathname === "/dashboard/blogs/add-blog",
            },
          ],
        },
      ],
    },
  ];
}
