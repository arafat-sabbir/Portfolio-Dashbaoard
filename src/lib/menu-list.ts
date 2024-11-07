import { LucideIcon, FileUser } from "lucide-react";
import { LiaBlogSolid, LiaProjectDiagramSolid } from "react-icons/lia";
import { MdOutlineFormatListBulleted } from "react-icons/md"
import { FiPlus } from "react-icons/fi";

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
          label: "About",
          active: pathname === "/blogs",
          icon: LiaBlogSolid as any,
          submenus: [
            {
              href: "/dashboard/blogs",
              label: "Manage Client",
              active: pathname === "/dashboard/blogs",
              subIcon: MdOutlineFormatListBulleted as any,
            },
            {
              href: "/dashboard/blogs/add-blog",
              label: "Add Client",
              active: pathname === "/dashboard/blogs/add-blog",
              subIcon: FiPlus as any,
            },
          ],
        },
        {
          href: "",
          label: "Resume",
          active: pathname === "/resumes",
          icon: FileUser,
          submenus: [
            {
              href: "/dashboard/resume/educations",
              label: "Manage Educations",
              active: pathname === "/dashboard/resume/educations",
              subIcon: MdOutlineFormatListBulleted as any,
            },
            {
              href: "/dashboard/resume/experiences",
              label: "Manage Experiences",
              active: pathname === "/dashboard/resume/experiences",
              subIcon: MdOutlineFormatListBulleted as any,
            },
            {
              href: "/dashboard/resume/skills",
              label: "Manage Skills",
              active: pathname === "/dashboard/resume/skills",
              subIcon: MdOutlineFormatListBulleted as any,
            },
            {
              href: "/dashboard/resume/add-experience",
              label: "Add Experience",
              active: pathname === "/dashboard/resume/add-experience",
              subIcon: FiPlus as any,
            },
            {
              href: "/dashboard/resume/add-education",
              label: "Add Education",
              active: pathname === "/dashboard/resume/add-education",
              subIcon: FiPlus as any,
            },
            {
              href: "/dashboard/resume/add-skill",
              label: "Add Skill",
              active: pathname === "/dashboard/resume/add-skill",
              subIcon: FiPlus as any,
            },
          ],
        },
        {
          href: "",
          label: "Blogs",
          active: pathname === "/blogs",
          icon: LiaBlogSolid as any,
          submenus: [
            {
              href: "/dashboard/blogs",
              label: "Manage Blogs",
              active: pathname === "/dashboard/blogs",
              subIcon: MdOutlineFormatListBulleted as any,
            },
            {
              href: "/dashboard/blogs/add-blog",
              label: "Add Blog",
              active: pathname === "/dashboard/blogs/add-blog",
              subIcon: FiPlus as any,
            },
          ],
        },
        {
          href: "",
          label: "Portfolios",
          active: pathname === "/portfolios",
          icon: LiaProjectDiagramSolid as any,
          submenus: [
            {
              href: "/dashboard/portfolios",
              label: "Manage Portfolios",
              active: pathname === "/dashboard/portfolios",
              subIcon: MdOutlineFormatListBulleted as any,
            },
            {
              href: "/dashboard/portfolios/add-portfolio",
              label: "Add Portfolio",
              active: pathname === "/dashboard/portfolios/add-portfolio",
              subIcon: FiPlus as any,
            },
          ],
        },
      ],
    },
  ];
}
