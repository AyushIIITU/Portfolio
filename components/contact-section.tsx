"use client";

import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { ContactForm } from "./contact-form";
import { Mail, Phone } from "lucide-react";
import { motion, useInView } from "framer-motion";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
    <section id="contact" className="py-20" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
          <p className="mt-4 text-muted-foreground">Have a project in mind? Let&apos;s work together!</p>
        </motion.div>
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid gap-24 md:grid-cols-2"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Mail className="mb-4 h-10 w-10 text-primary" />
                  </motion.div>
                  <h3 className="mb-2 text-lg font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">ayush01122004@gmail.com</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Phone className="mb-4 h-10 w-10 text-primary" />
                  </motion.div>
                  <h3 className="mb-2 text-lg font-semibold">Phone</h3>
                  <p className="text-sm text-muted-foreground">+91 7352677279</p>
                </CardContent>
              </Card>
            </motion.div>
            {/* <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <MapPin className="mb-4 h-10 w-10 text-primary" />
                  </motion.div>
                  <h3 className="mb-2 text-lg font-semibold">Location</h3>
                  <p className="text-sm text-muted-foreground"></p>
                </CardContent>
              </Card>
            </motion.div> */}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12"
          >
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h3 className="mb-6 text-xl font-semibold">Send Me a Message</h3>
                <ContactForm />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
