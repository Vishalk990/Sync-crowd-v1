"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Play, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { NavModal } from "./NavModal"; 
import GlobalLoader from "./GlobalLoader";

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [loading, setLoading] = useState(false);

  const redirectToAuth = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000); 
  };

  useEffect(() => {
   
  });

  return (
    <>
      {loading && <GlobalLoader />}
      <header className="mx-auto py-8 px-10 sticky top-0 z-40 bg-gradient-to-br from-blue-100 to-purple-100 shadow-md">
        <nav className="flex justify-between items-center">
          <div
            className="text-2xl font-bold cursor-pointer flex gap-9 items-center"
            onClick={() => router.push("/")}
          >
            SyncCrowd
            <NavModal />
          </div>

          <div className="hidden lg:flex space-x-4 items-center">
            {path === "/dashboard" && isLoaded && isSignedIn? (
              <UserButton />
            ) : (
              <Button onClick={redirectToAuth} disabled={loading}>
                {loading ? 'Loading...' : 'Get Started'} {!loading && <Play height={18} width={18} className="m-1"/>}
              </Button>
            )}
          </div>

          <div className="flex lg:hidden items-center">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" onClick={() => setIsSheetOpen(true)}>
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-4">
                <nav className="h-screen space-y-4 flex flex-col">
                  <Button onClick={() => {
                    setIsSheetOpen(false);
                    redirectToAuth();
                  }} disabled={loading}>
                    {loading ? 'Loading...' : 'Get Started'}
                  </Button>
                  <Button variant="ghost" onClick={() => setIsSheetOpen(false)}>
                    Platform
                  </Button>
                  <Button variant="ghost" onClick={() => setIsSheetOpen(false)}>
                    Use Cases
                  </Button>
                  <Button variant="ghost" onClick={() => setIsSheetOpen(false)}>
                    Resources
                  </Button>
                  <Button variant="ghost" onClick={() => setIsSheetOpen(false)}>
                    Pricing
                  </Button>
                  <Button variant="ghost" onClick={() => setIsSheetOpen(false)}>
                    Docs
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;