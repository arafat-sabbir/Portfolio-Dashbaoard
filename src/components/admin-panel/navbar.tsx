import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { getDecodedUser } from "@/lib/utils";
import { getServerToken } from "@/lib/get-server-token";
import { IUser } from "@/interface/user.interface";
import { ModeToggle } from "../mode-toggle";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const token = getServerToken();
  const user = token ? getDecodedUser(token) as IUser : null;
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          <UserNav user={user!}/>
        </div>
      </div>
    </header>
  );
}
