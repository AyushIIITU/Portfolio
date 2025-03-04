"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/AyushIIITU", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
    // { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:ayush01122004@gmail.com", label: "Email" }
  ];
  
  return (
    <footer className="border-t bg-muted/50 py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2 md:items-start"
          >
            <Link href="/" className="text-xl font-bold">
              DevPortfolio
            </Link>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              Building exceptional digital experiences with code.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-4 md:items-end"
          >
            <div className="flex gap-2">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.3 + index * 0.1 
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.icon}
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Ayush. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}