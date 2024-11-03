/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { ModeToggle } from "../mode-toggle";
import { useEffect, useState } from "react";
import { getUser } from "@/actions/auth/get-admin";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await getUser();
        setUser(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          <UserNav user={user as any} />
        </div>
      </div>
    </header>
  );
}
