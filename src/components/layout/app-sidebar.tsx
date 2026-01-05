
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/user-context";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  LayoutDashboard,
  Users,
  User,
  Settings,
  Building,
  FileText
} from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";

const candidateNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/jobs", icon: Briefcase, label: "Buscar Vagas" },
  { href: "/applications", icon: FileText, label: "Minhas Candidaturas" },
  { href: "/profile", icon: User, label: "Meu Perfil" },
  { href: "/settings", icon: Settings, label: "Configurações" },
];

const companyNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/jobs", icon: Briefcase, label: "Vagas Publicadas" },
  { href: "/candidates", icon: Users, label: "Candidatos" },
  { href: "/profile", icon: Building, label: "Perfil da Empresa" },
  { href: "/settings", icon: Settings, label: "Configurações" },
];

export function AppSidebar({ isMobile = false }) {
  const { user } = useUser();
  const pathname = usePathname();
  const navItems = user?.role === "company" ? companyNavItems : candidateNavItems;
  
  const navLinkClasses = (href: string) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      {
        "bg-sidebar-accent text-sidebar-accent-foreground": pathname === href || (pathname.startsWith(href) && href !== '/dashboard'),
      }
    );

  const content = (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={navLinkClasses(item.href)}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto flex flex-col items-center gap-2 border-t border-sidebar-border p-4">
          <ThemeSwitcher />
      </div>
    </div>
  );

  if (isMobile) {
    return content;
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block lg:w-64 lg:border-r lg:bg-sidebar">
      {content}
    </div>
  );
}
