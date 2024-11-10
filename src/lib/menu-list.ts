import {
  LucideIcon,
  BadgeInfo,
  FilePen,
  BookOpenText,
  Computer,
  CircleUserRound,
} from "lucide-react";

import { MdOutlineFormatListBulleted } from "react-icons/md";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  subIcon: LucideIcon | any;
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
          label: "Profile",
          active: pathname === "/social",
          icon: CircleUserRound as any,
          submenus: [
            {
              href: "/dashboard/profile",
              label: "Manage Profile",
              active: pathname === "/dashboard/profile",
              subIcon: MdOutlineFormatListBulleted as any,
            },
            {
              href: "/dashboard/social",
              label: "Manage Social",
              active: pathname === "/dashboard/social",
              subIcon: MdOutlineFormatListBulleted as any,
            },
          ],
        },
        {
          href: "",
          label: "About",
          active: pathname === "/blog",
          icon: BadgeInfo as any,
          submenus: [
            {
              href: "/dashboard/about/client",
              label: "Manage Client",
              active: pathname.startsWith("/dashboard/about/client"),
              subIcon: MdOutlineFormatListBulleted as any,
            },
            {
              href: "/dashboard/about/work",
              label: "Manage Work",
              active: pathname.startsWith("/dashboard/about/work"),
              subIcon: MdOutlineFormatListBulleted as any,
            },
          ],
        },
        {
          href: "",
          label: "Resume",
          active: pathname === "/resumes",
          icon: FilePen,
          submenus: [
            {
              href: "/dashboard/resume/education",
              label: "Manage Education",
              active: pathname.startsWith("/dashboard/resume/education"),
              subIcon: MdOutlineFormatListBulleted as any,
            },
            {
              href: "/dashboard/resume/experience",
              label: "Manage Experience",
              active: pathname.startsWith("/dashboard/resume/experience"),
              subIcon: MdOutlineFormatListBulleted as any,
            },
            {
              href: "/dashboard/resume/skill",
              label: "Manage Skill",
              active: pathname.startsWith("/dashboard/resume/skill"),
              subIcon: MdOutlineFormatListBulleted as any,
            },
          ],
        },
        {
          href: "",
          label: "Blog",
          active: pathname === "/blog",
          icon: BookOpenText as any,
          submenus: [
            {
              href: "/dashboard/blog",
              label: "Manage Blog",
              active: pathname.startsWith("/dashboard/blog"),
              subIcon: MdOutlineFormatListBulleted as any,
            },
          ],
        },
        {
          href: "",
          label: "Portfolio",
          active: pathname === "/portfolio",
          icon: Computer as any,
          submenus: [
            {
              href: "/dashboard/portfolio",
              label: "Manage Portfolio",
              active: pathname.startsWith("/dashboard/portfolio"),
              subIcon: MdOutlineFormatListBulleted as any,
            },
          ],
        },
      ],
    },
  ];
}
