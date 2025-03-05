"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "CAmpus Management System",
    description: "A full-featured management platform with complient and application management, laundary management, bus booking management and task assignment menagement.",
    image: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "Node.js", "Bootstrap"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "web",
  },
  {
    id: 2,
    title: "Productivity Management App",
    description: "A collaborative productivty management application with real-time study timer, profile sharing and daily entery.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069&auto=format&fit=crop",
    tags: ["React", "tailwind css", "nodejs","BERT","Python","tenserflow"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "web",
  },
  {
    id: 3,
    title: "Virtual Card Sharing",
    description: "A virtual card sharing website were user can createa virtual card like greeting,wishing and enagment card and share over diffrent platform.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop",
    tags: ["JavaScript", "Gemini API", "tailwind css", "React js","Node  js"],
    liveUrl: "https://metacard.me",
    githubUrl: "https://github.com",
    category: "web",
  },
  {
    id: 4,
    title: "Automatic RoadDamege Detection Mobile App",
    description: "A mobile application for tracking roaddamege,reporing roaddameg and alert",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop",
    tags: ["React Native", "Expo", "python", "yolo","web-socket"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "mobile",
  },
  {
    id: 5,
    title: "AI ChatBot on Youtube Video and PDF",
    description: "An AI-powered application that generates content based on user provide link of youtube or pdf and it can generate mcq based on provide link.",
    image: "https://images.unsplash.com/photo-1677442135136-760c813028c0?q=80&w=2070&auto=format&fit=crop",
    tags: ["Python", "Ollama", "LangChain", "Flutter"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "ai",
  },
  {
    id: 6,
    title: "E-Comerce Website for Visually imapared people",
    description: "An intrative website in which the website guide the user and a keyboard which produce key sound on every key pressed",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tags: ["D3.js", "React", "Node.js", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "data",
  },
];

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(project => project.category === activeTab);

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="projects" className="py-20" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">My Projects</h2>
          <p className="mt-4 text-muted-foreground">A showcase of my recent work and side projects</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveTab}>
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="web">Web</TabsTrigger>
                <TabsTrigger value="mobile">Mobile</TabsTrigger>
                <TabsTrigger value="ai">AI</TabsTrigger>
                {/* <TabsTrigger value="data">Data</TabsTrigger> */}
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="web" className="mt-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="mobile" className="mt-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="ai" className="mt-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="data" className="mt-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}

interface Project {
          id: number;
          title: string;
          description: string;
          image: string;
          tags: string[];
          githubUrl: string;
          liveUrl: string;
        }
function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag:string, index:number) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge variant="secondary">{tag}</Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> Code
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}