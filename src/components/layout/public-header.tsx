"use client"

import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";

export function PublicHeader() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/#features" className="text-foreground/80 transition-colors hover:text-foreground">
            Funcionalidades
          </Link>
          <Link href="/#pricing" className="text-foreground/80 transition-colors hover:text-foreground">
            Preços
          </Link>
          <Link href="/#faq" className="text-foreground/80 transition-colors hover:text-foreground">
            FAQ
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          {user ? (
            <Button onClick={() => router.push('/dashboard')}>Acessar Painel</Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Criar Conta</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
