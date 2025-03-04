"use client";

import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { 
  Code, 
  Database, 
  Globe, 
  Layout, 
  Server, 
  Smartphone, 
  Terminal, 
  TestTube 
} from "lucide-react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    name: "Frontend",
    icon: <Layout className="h-8 w-8 text-primary" />,
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Material UI", "Redux"]
  },
  {
    name: "Backend",
    icon: <Server className="h-8 w-8 text-primary" />,
    skills: ["Node.js", "Express", "NestJS", "Python", "GraphQL", "REST API","Go Lang"]
  },
  {
    name: "Database",
    icon: <Database className="h-8 w-8 text-primary" />,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis"]
  },
  {
    name: "DevOps",
    icon: <Terminal className="h-8 w-8 text-primary" />,
    skills: ["Git", "GitHub Actions", "Docker",  "AWS", "Vercel"]
  },
  {
    name: "Mobile",
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    skills: ["React Native", "Expo", "Android", "iOS"]
  },
  {
    name: "Testing",
    icon: <TestTube className="h-8 w-8 text-primary" />,
    skills: ["Jest", "React Testing Library"]
  },
  {
    name: "Languages",
    icon: <Code className="h-8 w-8 text-primary" />,
    skills: ["JavaScript", "TypeScript", "Python", "C++", "Go Lang"]
  },
  {
    name: "Other",
    icon: <Globe className="h-8 w-8 text-primary" />,
    skills: ["UI/UX Design", "Performance Optimization", "WebSockets", "WebRTC"]
  }
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
    <section id="skills" className="py-20 bg-muted/50" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Skills & Expertise</h2>
          <p className="mt-4 text-muted-foreground">Technologies and tools I work with</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              custom={index}
            >
              <SkillCard category={category} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: string[];
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="mb-4 flex items-center gap-3"
          >
            {category.icon}
            <h3 className="text-xl font-semibold">{category.name}</h3>
          </motion.div>
          <ul className="space-y-2">
            {category.skills.map((skill, skillIndex) => (
              <motion.li 
                key={skill} 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 + skillIndex * 0.03, duration: 0.3 }}
                className="flex items-center"
              >
                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span className="text-sm text-muted-foreground">{skill}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}