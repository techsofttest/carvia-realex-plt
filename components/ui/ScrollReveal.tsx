"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export function BlurReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay, ease: premiumEase }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerChildren({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 },
                },
            }}
            className="h-full w-full"
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
                show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: premiumEase } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
