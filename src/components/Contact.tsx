"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const socialLinks = [
    {
        name: "YouTube",
        icon: "▶",
        url: "https://youtube.com/@왕쉬운경제학",
        description: "왕쉬운 경제학",
        color: "#FF0000",
    },
    {
        name: "Instagram",
        icon: "📸",
        url: "https://www.instagram.com/singlepick_marketing/",
        description: "@singlepick_marketing",
        color: "#E4405F",
    },
    {
        name: "Email",
        icon: "✉",
        url: "mailto:singlepick.marketing@gmail.com",
        description: "singlepick.marketing@gmail.com",
        color: "#00D4FF",
    },
];

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !linksRef.current) return;

        const links = linksRef.current.querySelectorAll(".social-link");

        const ctx = gsap.context(() => {
            gsap.set(links, { opacity: 1, y: 0 });

            gsap.from(".contact-content", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            });

            gsap.from(links, {
                scrollTrigger: {
                    trigger: linksRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="section"
            style={{
                background: "var(--color-bg-secondary)",
                position: "relative",
                overflow: "hidden",
                padding: "6rem 2rem",
            }}
        >
            {/* Background Gradient */}
            <div
                style={{
                    position: "absolute",
                    width: "800px",
                    height: "800px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255, 184, 0, 0.08) 0%, transparent 70%)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />

            <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
                <div className="contact-content" style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <span
                        style={{
                            color: "var(--color-accent)",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                        }}
                    >
                        Contact
                    </span>
                    <h2 style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
                        <span className="text-gradient-accent">다리</span>를 놓을 준비가 되셨나요?
                    </h2>
                    <p style={{ maxWidth: "500px", margin: "0 auto", color: "var(--color-text-secondary)" }}>
                        제품과 고객 사이의 다리, 지금 바로 상담을 시작하세요.
                        <br />
                        48시간 내에 답변 드립니다.
                    </p>
                </div>

                {/* Social Links */}
                <div
                    ref={linksRef}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "1.5rem",
                        marginBottom: "4rem",
                        maxWidth: "900px",
                        margin: "0 auto 4rem",
                    }}
                >
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                padding: "1.5rem",
                                textDecoration: "none",
                                background: "var(--color-bg)",
                                borderRadius: "16px",
                                border: "1px solid var(--color-border)",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = link.color;
                                e.currentTarget.style.transform = "translateY(-3px)";
                                e.currentTarget.style.boxShadow = `0 10px 40px ${link.color}30`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "var(--color-border)";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <div
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "12px",
                                    background: `${link.color}20`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.5rem",
                                    flexShrink: 0,
                                }}
                            >
                                {link.icon}
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.25rem" }}>
                                    {link.name}
                                </div>
                                <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                                    {link.description}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ textAlign: "center" }}>
                    <a
                        href="https://forms.gle/4N7w4Jr8RLch1QrV7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ fontSize: "1.1rem", padding: "1.25rem 3rem", textDecoration: "none", display: "inline-block" }}
                    >
                        무료 질문 신청하기
                    </a>
                    <p
                        style={{
                            marginTop: "1rem",
                            fontSize: "0.875rem",
                            color: "var(--color-text-muted)",
                        }}
                    >
                        * 첫 방문 고객 한정 1회 무료 질문권 제공
                    </p>
                </div>

                {/* Footer */}
                <footer
                    style={{
                        marginTop: "5rem",
                        paddingTop: "2rem",
                        borderTop: "1px solid var(--color-border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <div style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                        © 2026 singlepick. All rights reserved.
                    </div>
                    <Image
                        src="/logo.png"
                        alt="singlepick"
                        width={120}
                        height={32}
                        style={{ objectFit: "contain" }}
                    />
                </footer>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}
