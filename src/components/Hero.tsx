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
                        padding: "0.5rem 1rem",
                        background: "rgba(0, 212, 255, 0.1)",
                        borderRadius: "100px",
                        border: "1px solid rgba(0, 212, 255, 0.3)",
                        marginBottom: "2rem",
                    }}
                >
                    <span style={{ color: "var(--color-primary)", fontSize: "0.875rem", fontWeight: 500 }}>
                        💼 연 매출 50억, 마케팅 총괄
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
                    마케팅은 어려운 숙제가 아닙니다.
                    <br />
                    <span style={{ color: "#FFFFFF", fontWeight: 700 }}>상품과 고객이 만나는</span>
                    <br />
                    <span style={{ color: "#FFFFFF", fontWeight: 700 }}>&apos;길&apos;</span>을 터주는 일입니다.
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    style={{
                        fontSize: "1.15rem",
                        maxWidth: "680px",
                        margin: "0 auto 3rem",
                        lineHeight: 1.9,
                    }}
                >
                    고객은 이미 당신을 찾고 있습니다.
                    <br />
                    다만 그들이 당신에게 도달할 <strong style={{ color: "var(--color-accent)" }}>방법(How)</strong>을 모를 뿐입니다.
                    <br /><br />
                    복잡한 기술을 배우기 전에,
                    <br />
                    <strong style={{ color: "var(--color-primary)" }}>고객의 발걸음이 머무는 길목</strong>을 먼저 설계하십시오.
                </p>

                {/* CTA Buttons */}
                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "center",
                        marginBottom: "4rem",
                        flexWrap: "wrap",
                    }}
                >
                    <a
                        href="https://forms.gle/4N7w4Jr8RLch1QrV7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ textDecoration: "none" }}
                    >
                        무료 질문 신청하기
                    </a>
                    <button className="btn-secondary">서비스 알아보기</button>
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
                        { value: "50억+", label: "2년 누적 매출" },
                        { value: "10년", label: "유통 경력" },
                        { value: "500+", label: "컨설팅 케이스" },
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
                                    color: "#FFFFFF",
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
