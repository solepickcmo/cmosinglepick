"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const philosophyItems = [
    {
        icon: "🧭",
        title: "나침반이 되어드립니다",
        description:
            "AI의 바다에서 표류하지 마세요. 수많은 정보 중 당신에게 맞는 단 하나의 방향을 제시합니다.",
    },
    {
        icon: "🎯",
        title: "최적의 해답 설계",
        description:
            "모두에게 맞는 정답은 없습니다. 당신의 상황, 리소스, 목표에 맞춘 최적의 해답을 찾아드립니다.",
    },
    {
        icon: "⚡",
        title: "거침없는 실행",
        description:
            "고민만 하다 지치셨나요? 막연함을 걷어내고 바로 실행할 수 있는 구체적인 액션 플랜을 제공합니다.",
    },
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !cardsRef.current) return;

        const cards = cardsRef.current.querySelectorAll(".philosophy-card");

        const ctx = gsap.context(() => {
            // Ensure cards are visible
            gsap.set(cards, { opacity: 1, y: 0 });

            // "Chaos to Order" animation - scattered texts merge into one
            gsap.from(".chaos-text", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "center center",
                    scrub: 1,
                },
                x: () => gsap.utils.random(-100, 100),
                y: () => gsap.utils.random(-50, 50),
                rotation: () => gsap.utils.random(-15, 15),
                opacity: 0.3,
                scale: 0.8,
            });

            // Philosophy cards animation
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power3.out",
            });

            // Bridge animation
            gsap.from(".bridge-line", {
                scrollTrigger: {
                    trigger: ".bridge-visual",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
                scaleX: 0,
                duration: 1.5,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="section"
            style={{
                background: "var(--color-bg-secondary)",
                position: "relative",
            }}
        >
            <div className="container">
                {/* Section Header */}
                <div style={{ textAlign: "center", marginBottom: "5rem" }}>
                    <span
                        style={{
                            color: "var(--color-primary)",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                        }}
                    >
                        Our Philosophy
                    </span>
                    <h2 style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
                        <span className="chaos-text" style={{ display: "inline-block" }}>AI 시대,</span>{" "}
                        <span className="text-gradient-accent chaos-text" style={{ display: "inline-block" }}>유일한 나침반</span>
                    </h2>
                    <p style={{ maxWidth: "700px", margin: "0 auto", lineHeight: 1.9 }}>
                        AI라는 거대한 조류 속에서 표류하는 리더를 위한 유일한 나침반.
                        <br />
                        모두가 정답을 말하지만, 오직 <strong style={{ color: "var(--color-primary)" }}>당신만을 위한 &apos;최적의 해답&apos;</strong>은 따로 있습니다.
                    </p>
                    <p style={{ maxWidth: "600px", margin: "1.5rem auto 0", lineHeight: 1.9 }}>
                        막연한 가능성을 <strong style={{ color: "var(--color-accent)" }}>선명한 수익 구조</strong>로,
                        <br />
                        정체된 고민을 <strong style={{ color: "var(--color-accent)" }}>거침없는 실행</strong>으로 설계해 드립니다.
                    </p>
                </div>

                {/* Bridge Visualization */}
                <div className="bridge-visual" style={{ marginBottom: "5rem" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "1rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <div
                            style={{
                                padding: "1.5rem 2rem",
                                background: "var(--color-bg)",
                                borderRadius: "16px",
                                border: "1px solid var(--color-border)",
                                textAlign: "center",
                                minWidth: "140px",
                            }}
                        >
                            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📦</div>
                            <div style={{ fontWeight: 600 }}>당신의 제품</div>
                        </div>

                        <div
                            className="bridge-line"
                            style={{
                                width: "150px",
                                height: "4px",
                                background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
                                borderRadius: "2px",
                                transformOrigin: "left center",
                            }}
                        />

                        <div
                            style={{
                                padding: "1.5rem 2rem",
                                background: "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 184, 0, 0.1))",
                                borderRadius: "16px",
                                border: "1px solid var(--color-primary)",
                                textAlign: "center",
                                minWidth: "140px",
                            }}
                        >
                            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🌉</div>
                            <div style={{ fontWeight: 600, color: "var(--color-primary)" }}>다리 (Bridge)</div>
                        </div>

                        <div
                            className="bridge-line"
                            style={{
                                width: "150px",
                                height: "4px",
                                background: "linear-gradient(90deg, var(--color-accent), var(--color-primary))",
                                borderRadius: "2px",
                                transformOrigin: "left center",
                            }}
                        />

                        <div
                            style={{
                                padding: "1.5rem 2rem",
                                background: "var(--color-bg)",
                                borderRadius: "16px",
                                border: "1px solid var(--color-border)",
                                textAlign: "center",
                                minWidth: "140px",
                            }}
                        >
                            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👥</div>
                            <div style={{ fontWeight: 600 }}>당신의 고객</div>
                        </div>
                    </div>
                </div>

                {/* Philosophy Cards */}
                <div
                    ref={cardsRef}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "2rem",
                    }}
                >
                    {philosophyItems.map((item) => (
                        <div
                            key={item.title}
                            className="philosophy-card card"
                            style={{
                                background: "var(--color-bg)",
                                borderRadius: "20px",
                                padding: "2rem",
                                border: "1px solid var(--color-border)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "3rem",
                                    marginBottom: "1.5rem",
                                }}
                            >
                                {item.icon}
                            </div>
                            <h3 style={{ marginBottom: "1rem", color: "var(--color-text)", fontSize: "1.25rem" }}>
                                {item.title}
                            </h3>
                            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--color-text-secondary)" }}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}
