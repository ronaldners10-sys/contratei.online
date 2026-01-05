"use client";

import { useUser } from "@/context/user-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, Search, Bell } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { AppSidebar } from "./app-sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function AppHeader() {
  const { user, logout } = useUser();
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const parts = pathname.split('/').filter(p => p);
    if (parts[0] !== 'dashboard') parts.unshift('dashboard');
    
    let currentPath = '';
    return parts.map((part, index) => {
      currentPath += `/${part}`;
      const isLast = index === parts.length - 1;
      const name = part.charAt(0).toUpperCase() + part.slice(1).replace('-', ' ');
      return (
        <li key={part}>
          <div className="flex items-center">
            <svg className="mx-1 h-3 w-3 text-muted-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 9 4-4-4-4"/>
            </svg>
             <Link href={isLast ? '#' : currentPath} className={`text-sm font-medium ${isLast ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {name}
            </Link>
          </div>
        </li>
      );
    });
  }, [pathname]);

  if (!user) {
    return null;
  }
  
  const userInitial = user.name?.charAt(0).toUpperCase() || '?';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle><VisuallyHidden>Menu</VisuallyHidden></SheetTitle>
            <AppSidebar isMobile />
          </SheetContent>
        </Sheet>
      </div>

      <nav className="hidden md:flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1">
          <li>
            <div>
              <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
            </div>
          </li>
          {breadcrumbs.slice(1)}
        </ol>
      </nav>


      <div className="flex flex-1 items-center justify-end gap-4">
        <form className="hidden sm:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar vagas ou candidatos..."
              className="w-full appearance-none bg-secondary pl-8 pr-3 h-10 rounded-md border-none text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </form>
        <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notificações</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/profile">Perfil</Link></DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
