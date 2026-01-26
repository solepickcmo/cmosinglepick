"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.from(titleRef.current, {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                delay: 0.3,
            });

            // Subtitle animation
            gsap.from(subtitleRef.current, {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.6,
            });

            // Stats animation
            gsap.from(".stat-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.9,
            });

            // Floating animation for background elements
            gsap.to(".floating-orb", {
                y: -20,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="section"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background Gradient Orbs */}
            <div
                className="floating-orb"
                style={{
                    position: "absolute",
                    width: "600px",
                    height: "600px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)",
                    top: "-200px",
                    right: "-200px",
                    filter: "blur(60px)",
                    pointerEvents: "none",
                }}
            />
            <div
                className="floating-orb"
                style={{
                    position: "absolute",
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255, 184, 0, 0.1) 0%, transparent 70%)",
                    bottom: "-100px",
                    left: "-100px",
                    filter: "blur(60px)",
                    pointerEvents: "none",
                    animationDelay: "1.5s",
                }}
            />

            <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                {/* Badge */}
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem 1.25rem",
                        background: "rgba(0, 212, 255, 0.1)",
                        borderRadius: "100px",
                        border: "1px solid rgba(0, 212, 255, 0.3)",
                        marginBottom: "2rem",
                    }}
                >
                    <span style={{ color: "var(--color-primary)", fontSize: "0.875rem", fontWeight: 500 }}>
                        🧭 AI 시대, 비즈니스 디렉터
                    </span>
                </div>

                {/* Title */}
                <h1
                    ref={titleRef}
                    style={{
                        marginBottom: "1.5rem",
                        maxWidth: "900px",
                        margin: "0 auto 1.5rem",
                        fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                    }}
                >
                    AI 시대, 문제는 정보가 아니라{" "}
                    <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>&apos;선택&apos;</span>입니다.
                    <br />
                    <span style={{ color: "#FFFFFF", fontWeight: 700 }}>
                        수만 가지 길 중 당신이 압도적으로 성공할
                    </span>
                    <br />
                    <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>단 한 가지 길</span>을 찾아드립니다.
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    style={{
                        fontSize: "1.15rem",
                        maxWidth: "720px",
                        margin: "0 auto 1.5rem",
                        lineHeight: 1.9,
                        color: "var(--color-text-secondary)",
                    }}
                >
                    할 수 있는 것은 많아졌지만, 해야 할 일은 더 안 보입니다.
                    <br />
                    혼란을 걷어내고, 당신의 강점이 성과로 이어지는{" "}
                    <strong style={{ color: "var(--color-primary)" }}>&apos;Single Pick&apos;</strong>에만 집중하세요.
                </p>

                {/* Quote */}
                <p
                    style={{
                        fontSize: "1rem",
                        color: "var(--color-primary)",
                        fontStyle: "italic",
                        marginBottom: "3rem",
                        opacity: 0.9,
                    }}
                >
                    &quot;모두가 AI를 말할 때, 우리는 당신의 &apos;본질&apos;을 묻습니다.&quot;
                </p>

                {/* CTA Button - Single Large Primary */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "4rem",
                    }}
                >
                    <a
                        href="https://forms.gle/4N7w4Jr8RLch1QrV7"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-block",
                            background: "linear-gradient(135deg, #00D4FF, #0099CC)",
                            color: "#000",
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            padding: "1.25rem 3.5rem",
                            borderRadius: "12px",
                            textDecoration: "none",
                            boxShadow: "0 0 30px rgba(0, 212, 255, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow = "0 0 50px rgba(0, 212, 255, 0.6), 0 12px 40px rgba(0, 0, 0, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 0 30px rgba(0, 212, 255, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)";
                        }}
                    >
                        내게 맞는 &apos;단 하나&apos; 찾기
                    </a>
                </div>

                {/* Stats */}
                <div
                    ref={statsRef}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "3rem",
                        flexWrap: "wrap",
                    }}
                >
                    {[
                        { value: "50억+", label: "누적 매출 기여액" },
                        { value: "10년", label: "전략 경력" },
                        { value: "500+", label: "컨설팅 사례" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="stat-item"
                            style={{
                                textAlign: "center",
                                padding: "1.5rem",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "2.5rem",
                                    fontWeight: 800,
                                    color: "var(--color-primary)",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                {stat.value}
                            </div>
                            <div style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                style={{
                    position: "absolute",
                    bottom: "2rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                    opacity: 0.5,
                }}
            >
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>Scroll</span>
                <div
                    style={{
                        width: "1px",
                        height: "40px",
                        background: "linear-gradient(to bottom, var(--color-primary), transparent)",
                    }}
                />
            </div>
        </section>
    );
}
