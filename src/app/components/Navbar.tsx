import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface NavbarProps {
  variant?: "hero" | "default";
}

const Navbar = ({ variant = "hero" }: NavbarProps) => {
  const { theme, toggle } = useTheme();
  const isHero = variant === "hero";

  const textClass = isHero ? "text-hero-foreground" : "text-foreground";
  const mutedClass = isHero ? "text-hero-muted" : "text-muted-foreground";
  const hoverClass = isHero ? "hover:text-hero-foreground" : "hover:text-foreground";

  return (
    <nav className={isHero ? "absolute top-0 left-0 right-0 z-50" : "sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm"}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link href="/" className={`text-lg font-semibold ${textClass}`}>
          AetherCare
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/" className={`text-sm font-medium ${mutedClass} transition-colors ${hoverClass}`}>
            Home
          </Link>
          <button
            onClick={toggle}
            className={`flex h-9 w-9 items-center justify-center rounded-full ${mutedClass} transition-colors ${hoverClass}`}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <Link
            href="/chat"
            className="inline-flex h-9 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Start Diagnosis
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
