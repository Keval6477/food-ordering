import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  HandPlatter,
  Loader2,
  Menu,
  PackageIcon,
  ShoppingCart,
  SquareMenu,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  const admin = true;
  const loading = false;
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14">
        <Link to={"/"} className="font-bold md:font-extrabold text-2xl">
          Eats.com
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/order/status"}>Orders</Link>

            {admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>dashobard</MenubarTrigger>
                  <MenubarContent>
                    <Link to={"/admin/restaturant"}>
                      <MenubarItem>Restaurant</MenubarItem>
                    </Link>
                    <Link to={"/admin/menu"}>
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to={"/admin/orders"}>
                      <MenubarItem>Order</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div>
              <Link to={"/cart"} className="relative cursor-pointer">
                <ShoppingCart />
                <Button
                  className="absolute -inset-y-3 left-2 text-xs rounded-full w-4 h-4 bg-red-500 hover:bg-red-500"
                  size={"icon"}
                >
                  5
                </Button>
              </Link>
            </div>
            <div>
              <Avatar>
                <AvatarImage />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <Button className="bg-orange">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                  </>
                ) : (
                  "Logout"
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          {/* mobile responsive */}
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  // const user = true;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col ">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>Eats.com</SheetTitle>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link
            to={"/profile"}
            className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to={"/profile"}
            className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to={"/profile"}
            className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer"
          >
            <ShoppingCart />
            <span>Cart(0)</span>
          </Link>
          <Link
            to={"/profile"}
            className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer"
          >
            <UtensilsCrossed />
            <span>Restaurant</span>
          </Link>
          <Link
            to={"/profile"}
            className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer"
          >
            <SquareMenu />
            <span>Menu</span>
          </Link>
          <Link
            to={"/profile"}
            className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer"
          >
            <PackageIcon />
            <span>Restaurant Orders</span>
          </Link>
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-2">
          <>
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarImage />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-bold">Kevl</h1>
            </div>
          </>

          <SheetClose asChild>
            <Button type="submit" className="bg-orange w-full">
              Logout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
