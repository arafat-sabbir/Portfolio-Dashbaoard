import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { ModeToggle } from "../mode-toggle";
import { getUser } from "@/actions/auth/get-admin";
import { TUser } from "@/interface/user.interface";

interface NavbarProps {
  title: string;
}

export async function Navbar({ title }: NavbarProps) {
  let user;
  try {
    const res = await getUser();
    user = res?.data as TUser;
  } catch (error) {
    console.log(error);
  }
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
