"use client"
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  MapPin 
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import Image from "next/image";

const experiences = [
  {
    id: 1,
    role: "Backend Lead",
    company: "Indian Indtitue of Information and Tecnology",
    logo:"https://iiitu.ac.in/Indian_Institute_of_Information_Technology,_Una_logo.png",
    location: "Hybrid",
    period: "Apr 2024 - Present",
    description: "Assisted in developing backend,admin panel and faculty panel, focusing on back-end development and admin panel interfaces.",
    achievements: [
      "Collaborated and led a team to implement a new feature that improved response time and security",
      "Implement Image optimisation metods to reduce the load time with 500%",
      "Apply DSA conceps for reducing and managing complex data structure"
    ],
    skills: ["React", "TailWind","Nodejs","JavaScript", "CSS", "Git", "Agile"]
  }
  // {
  //   id: 2,
  //   role: "Research Assistant",
  //   company: "University of Example",
  //   location: "City, State",
  //   period: "Sep 2022 - May 2023",
  //   description: "Conducted research on machine learning algorithms and their applications in data analysis.",
  //   achievements: [
  //     "Co-authored a paper published in a peer-reviewed journal",
  //     "Developed a Python script to automate data collection and analysis",
  //     "Presented research findings at a university symposium"
  //   ],
  //   skills: ["Python", "Machine Learning", "Data Analysis", "Research"]
  // },
  // {
  //   id: 3,
  //   role: "Volunteer Web Developer",
  //   company: "Non-Profit Organization",
  //   location: "City, State",
  //   period: "Jan 2022 - Aug 2022",
  //   description: "Volunteered to develop and maintain the organization's website, ensuring it was user-friendly and up-to-date.",
  //   achievements: [
  //     "Redesigned the website, improving navigation and user experience",
  //     "Implemented a content management system to streamline updates",
  //     "Increased website traffic by 30% through SEO improvements"
  //   ],
  //   skills: ["HTML", "CSS", "WordPress", "SEO"]
  // }
];

export function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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
    <section id="experience" className="py-20">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Work Experience</h2>
          <p className="mt-4 text-muted-foreground">My professional journey and career highlights</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative mx-auto max-w-4xl"
        >
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 ml-7 w-0.5 bg-border md:ml-[7.5rem]"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="relative mb-12 last:mb-0"
            >
              <ExperienceCard 
                experience={exp} 
                isExpanded={expandedId === exp.id}
                onToggle={() => toggleExpand(exp.id)}
                isLast={index === experiences.length - 1}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  experience: typeof experiences[0];
  isExpanded: boolean;
  onToggle: () => void;
  isLast: boolean;
}

function ExperienceCard({ experience, isExpanded, onToggle }: ExperienceCardProps) {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Timeline dot and date */}
      <div className="flex flex-row items-center md:w-60 md:flex-col md:items-end md:pr-10">
        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-background shadow-md">
          {/* <Briefcase className="h-6 w-6 text-primary" />
           */}
           <Image src={experience.logo} alt="logo" width={100} height={100} />
        </div>
        <div className="ml-4 md:ml-0 md:mt-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            {experience.period}
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="mt-4 flex-1 md:mt-0">
        <motion.div
          layout
          transition={{ layout: { duration: 0.3, type: "spring" } }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-xl font-semibold">{experience.role}</h3>
                  <p className="text-lg font-medium text-primary">{experience.company}</p>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {experience.location}
                </div>
              </div>

              <p className="mt-4 text-muted-foreground">{experience.description}</p>

              <motion.div
                initial={false}
                animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {isExpanded && (
                  <div className="mt-4 space-y-4">
                    <Separator />
                    <div>
                      <h4 className="mb-2 font-semibold">Key Achievements</h4>
                      <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
                        {experience.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Badge variant="secondary">{skill}</Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              <Button
                variant="ghost"
                size="sm"
                className="mt-4"
                onClick={onToggle}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="mr-1 h-4 w-4" /> Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-1 h-4 w-4" /> Show More
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}