import { SquarePen, LucideIcon } from "lucide-react";

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
          label: "Resume",
          active: pathname === "/resumes",
          icon: SquarePen,
          submenus: [
            {
              href: "/dashboard/resumes",
              label: "All Blogs",
              active: pathname === "/dashboard/resumes",
            },
            {
              href: "/dashboard/blogs/add-resume",
              label: "Add Blog",
              active: pathname === "/dashboard/blogs/add-resume",
            },
          ],
        },
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
