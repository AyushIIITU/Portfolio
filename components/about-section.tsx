"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { Download } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-20 bg-muted/50" ref={ref}>
      <div className="container px-4 sm:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
        >
          About Me
        </motion.h2>
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-48 w-full overflow-hidden rounded-lg sm:h-56 md:h-auto md:w-1/2 flex items-center justify-center"
          >
            <DotLottieReact
      src="/Developer.lottie"
      loop
      autoplay

      className="w-full h-full object-contain"
    />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col px-4 sm:px-6 justify-center space-y-4 md:w-1/2 items-center md:items-start text-center md:text-left"
          >
            <h3 className="text-xl sm:text-2xl font-semibold">My Journey</h3>
            <p className="text-muted-foreground text-base sm:text-[1.05rem]">
              As a college student passionate about technology, I&apos;ve immersed myself in the world of web development and artificial intelligence. My journey began with the MERN stack, where I honed my skills in building dynamic and responsive web applications.
            </p>
            <p className="text-muted-foreground text-base sm:text-[1.05rem]">
              In addition to web development, I have a strong interest in Python and Go, which I use for backend development and data analysis. My exploration into AI has led me to work with TensorFlow and Generative AI, where I enjoy creating innovative solutions and exploring the potential of machine learning.
            </p>
            <p className="text-muted-foreground text-base sm:text-[1.05rem]">
              Outside of academics, I enjoy participating in hackathons, contributing to innovative projects, and staying updated with the latest tech trends. In my free time, I love playing chess, exploring new music, and reading books.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-full flex justify-center md:justify-start"
            >
              <Button asChild>
                <Link href="https://drive.google.com/file/d/1NAtVKFQdl_TaHJB3HwQca1QukV-NtAUC/view?usp=sharing" target="_blank" rel="noopener noreferrer">
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