import { LucideIcon, TableOfContents, FileUser } from "lucide-react";

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
          icon: FileUser,
          submenus: [
            {
              href: "/dashboard/resume/educations",
              label: "All Educations",
              active: pathname === "/dashboard/resume/educations",
            },
            {
              href: "/dashboard/resume/experiences",
              label: "All Experiences",
              active: pathname === "/dashboard/resume/experiences",
            },
            {
              href: "/dashboard/resume/add-experience",
              label: "Add Experience",
              active: pathname === "/dashboard/resume/add-experience",
            },
            {
              href: "/dashboard/resume/add-education",
              label: "Add Education",
              active: pathname === "/dashboard/resume/add-education",
            },
          ],
        },
        {
          href: "",
          label: "Blogs",
          active: pathname === "/blogs",
          icon: TableOfContents,
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
