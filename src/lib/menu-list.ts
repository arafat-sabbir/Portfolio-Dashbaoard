import {
  LucideIcon,
  FileUser,
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
          active: pathname === "/socials",
          icon: CircleUserRound as any,
          submenus: [
            {
              href: "/dashboard/profile",
              label: "Manage Profile",
              active: pathname === "/dashboard/profile",
              subIcon: MdOutlineFormatListBulleted as any,
            },
            {
              href: "/dashboard/socials",
              label: "Manage Social",
              active: pathname === "/dashboard/socials",
              subIcon: MdOutlineFormatListBulleted as any,
            },
          ],
        },
        {
          href: "",
          label: "About",
          active: pathname === "/blogs",
          icon: BadgeInfo as any,
          submenus: [
            {
              href: "/dashboard/blogs",
              label: "Manage Client",
              active: pathname === "/dashboard/blogs",
              subIcon: MdOutlineFormatListBulleted as any,
            },
            {
              href: "/dashboard/blogs/add-blog",
              label: "Manage Work",
              active: pathname === "/dashboard/blogs/add-blog",
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
              href: "/dashboard/resume/educations",
              label: "Manage Educations",
              active: pathname.startsWith("/dashboard/resume/educations"),
              subIcon: MdOutlineFormatListBulleted as any,
            },
            {
              href: "/dashboard/resume/experiences",
              label: "Manage Experiences",
              active: pathname.startsWith("/dashboard/resume/experiences"),
              subIcon: MdOutlineFormatListBulleted as any,
            },
            {
              href: "/dashboard/resume/skills",
              label: "Manage Skills",
              active: pathname.startsWith("/dashboard/resume/skills"),
              subIcon: MdOutlineFormatListBulleted as any,
            },
          ],
        },
        {
          href: "",
          label: "Blog",
          active: pathname === "/blogs",
          icon: BookOpenText as any,
          submenus: [
            {
              href: "/dashboard/blogs",
              label: "Manage Blogs",
              active: pathname.startsWith("/dashboard/blogs"),
              subIcon: MdOutlineFormatListBulleted as any,
            },
          ],
        },
        {
          href: "",
          label: "Portfolio",
          active: pathname === "/portfolios",
          icon: Computer as any,
          submenus: [
            {
              href: "/dashboard/portfolios",
              label: "Manage Portfolios",
              active: pathname.startsWith("/dashboard/portfolios"),
              subIcon: MdOutlineFormatListBulleted as any,
            },
          ],
        },
      ],
    },
  ];
}
