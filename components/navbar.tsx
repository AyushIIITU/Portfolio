"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import Image from "next/image";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl pl-5 font-bold">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </Link>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Link href="#experience" className="text-sm font-medium transition-colors hover:text-primary">
            Experience
          </Link>
          <Link href="#projects" className="text-sm font-medium transition-colors hover:text-primary">
            Projects
          </Link>
          <Link href="#skills" className="text-sm font-medium transition-colors hover:text-primary">
            Skills
          </Link>
          <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 z-50 flex flex-col space-y-4 bg-background p-4 shadow-lg md:hidden">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary" onClick={toggleMenu}>
              About
            </Link>
            <Link href="#experience" className="text-sm font-medium transition-colors hover:text-primary" onClick={toggleMenu}>
              Experience
            </Link>
            <Link href="#projects" className="text-sm font-medium transition-colors hover:text-primary" onClick={toggleMenu}>
              Projects
            </Link>
            <Link href="#skills" className="text-sm font-medium transition-colors hover:text-primary" onClick={toggleMenu}>
              Skills
            </Link>
            <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary" onClick={toggleMenu}>
              Contact
            </Link>
            <div className="py-2">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}