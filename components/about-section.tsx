"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Download } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-20 bg-muted/50" ref={ref}>
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
        >
          About Me
        </motion.h2>
        <div className="flex flex-col gap-12 md:flex-row">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-80 w-full overflow-hidden rounded-lg md:h-auto md:w-1/2"
          >
            <Image
              src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop"
              alt="Developer working"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6 md:w-1/2"
          >
            <h3 className="text-2xl font-semibold">My Journey</h3>
            <p className="text-muted-foreground">
              As a college student passionate about technology, I&apos;ve immersed myself in the world of web development and artificial intelligence. My journey began with the MERN stack, where I honed my skills in building dynamic and responsive web applications.
            </p>
            <p className="text-muted-foreground">
              In addition to web development, I have a strong interest in Python and Go, which I use for backend development and data analysis. My exploration into AI has led me to work with TensorFlow and Generative AI, where I enjoy creating innovative solutions and exploring the potential of machine learning.
            </p>
            <p className="text-muted-foreground">
              Outside of academics, I enjoy participating in hackathons, contributing to innovative projects, and staying updated with the latest tech trends. In my free time, I love playing chess, exploring new music, and reading books.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button asChild>
                <Link href="https://drive.google.com/file/d/1W23iG2cxQQ9ZzkxiLW28G1wWhMyTISFy/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}