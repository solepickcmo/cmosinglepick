"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
];

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".nav-item", {
                y: -20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.5,
            });
        }, headerRef);

        return () => ctx.revert();
    }, []);

    return (
        <header
            ref={headerRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: "1rem 2rem",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                background: isScrolled ? "rgba(10, 10, 15, 0.9)" : "transparent",
                backdropFilter: isScrolled ? "blur(20px)" : "none",
                borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
            }}
        >
            <nav
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <Link
                    href="#hero"
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textDecoration: "none",
                    }}
                >
                    singlepick
                </Link>

                <ul
                    style={{
                        display: "flex",
                        gap: "2rem",
                        listStyle: "none",
                    }}
                >
                    {navItems.map((item) => (
                        <li key={item.name} className="nav-item">
                            <Link
                                href={item.href}
                                style={{
                                    color: "var(--color-text-secondary)",
                                    textDecoration: "none",
                                    fontWeight: 500,
                                    fontSize: "0.9rem",
                                    transition: "color 0.3s ease",
                                    position: "relative",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "var(--color-primary)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "var(--color-text-secondary)";
                                }}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <a
                    href="https://forms.gle/4N7w4Jr8RLch1QrV7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ fontSize: "0.875rem", padding: "0.75rem 1.5rem", textDecoration: "none" }}
                >
                    무료 상담
                </a>
            </nav>
        </header>
    );
}
