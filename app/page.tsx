"use client";

import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { ThemeProvider } from "@/components/theme-provider";
import { Chatbot } from "@/components/chatbot";
import { useSearchParams } from "next/navigation";
// import Chat from '@/components/Chat';

export default function Home() {
  const searchParams = useSearchParams();
  const chatOpen = searchParams.get('open') === 'true';

  return (
    <ThemeProvider attribute="class">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
        <Chatbot open={chatOpen} />
      </div>
    </ThemeProvider>
  );
}
