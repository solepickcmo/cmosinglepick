"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const taxRecords = [
    {
        period: "2024년 2기",
        dateRange: "2024.10.01 ~ 2024.12.31",
        taxBase: "11억 1,884만원",
        taxBaseValue: 1118845757,
    },
    {
        period: "2025년 1기",
        dateRange: "2025.01.01 ~ 2025.03.31",
        taxBase: "11억 4,354만원",
        taxBaseValue: 1143549573,
    },
    {
        period: "2025년 1기",
        dateRange: "2025.04.01 ~ 2025.06.30",
        taxBase: "9억 9,788만원",
        taxBaseValue: 997880371,
    },
    {
        period: "2025년 2기",
        dateRange: "2025.07.01 ~ 2025.09.30",
        taxBase: "18억 1,402만원",
        taxBaseValue: 1814023060,
    },
];

// Calculate total
const totalTaxBase = taxRecords.reduce((sum, record) => sum + record.taxBaseValue, 0);
const formattedTotal = `${Math.floor(totalTaxBase / 100000000)}억 ${Math.floor((totalTaxBase % 100000000) / 10000).toLocaleString()}만원`;

export default function Credentials() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !cardsRef.current) return;

        const cards = cardsRef.current.querySelectorAll(".record-card");

        const ctx = gsap.context(() => {
            gsap.set(cards, { opacity: 1, y: 0 });

            gsap.from(cards, {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                y: 40,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
            });

            // Counter animation for total
            gsap.from(".total-value", {
                scrollTrigger: {
                    trigger: ".total-value",
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                padding: "5rem 2rem",
                background: "linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-secondary) 100%)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background Gradient */}
            <div
                style={{
                    position: "absolute",
                    width: "600px",
                    height: "600px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%)",
                    top: "50%",
                    left: "20%",
                    transform: "translate(-50%, -50%)",
                    filter: "blur(60px)",
                    pointerEvents: "none",
                }}
            />

            <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                {/* Section Header */}
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <span
                        style={{
                            color: "var(--color-primary)",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                        }}
                    >
                        Verified Results
                    </span>
                    <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                        <span style={{ color: "#FFFFFF", fontWeight: 700 }}>실적</span>으로 증명합니다
                    </h2>
                    <p style={{ color: "var(--color-text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
                        국세청 부가가치세 신고 자료 기반 실제 매출 데이터입니다.
                    </p>
                </div>

                {/* Total Highlight */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "3rem",
                        padding: "2rem",
                        background: "#FFFFFF",
                        borderRadius: "20px",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                >
                    <p style={{ color: "#333333", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                        12개월 누적 과세표준 (매출)
                    </p>
                    <div
                        className="total-value"
                        style={{
                            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                            fontWeight: 800,
                            color: "#0A0A0F",
                        }}
                    >
                        {formattedTotal}
                    </div>
                    <p style={{ color: "#666666", marginTop: "0.5rem", fontSize: "0.8rem" }}>
                        2024년 4분기 ~ 2025년 3분기
                    </p>
                </div>

                {/* Records Grid */}
                <div
                    ref={cardsRef}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "1rem",
                    }}
                >
                    {taxRecords.map((record, index) => (
                        <div
                            key={index}
                            className="record-card"
                            style={{
                                background: "var(--color-bg)",
                                borderRadius: "16px",
                                padding: "1.5rem",
                                border: "1px solid var(--color-border)",
                                textAlign: "center",
                            }}
                        >
                            {/* Period Badge */}
                            <div
                                style={{
                                    display: "inline-block",
                                    background: "rgba(0, 212, 255, 0.1)",
                                    color: "var(--color-primary)",
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    padding: "0.25rem 0.75rem",
                                    borderRadius: "100px",
                                    marginBottom: "1rem",
                                }}
                            >
                                {record.period}
                            </div>

                            {/* Date Range */}
                            <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>
                                {record.dateRange}
                            </p>

                            {/* Tax Base Label */}
                            <p style={{ fontSize: "0.7rem", color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>
                                과세표준
                            </p>

                            {/* Tax Base Value */}
                            <p
                                style={{
                                    fontSize: "1.25rem",
                                    fontWeight: 700,
                                    color: "var(--color-text)",
                                }}
                            >
                                {record.taxBase}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Disclaimer */}
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "2rem",
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                    }}
                >
                    * 본 자료는 국세청 홈택스 부가가치세 신고 내역을 기반으로 작성되었습니다.
                    <br />
                    * 세액 관련 정보는 개인정보 보호를 위해 비공개 처리되었습니다.
                </p>
            </div>

            <style jsx>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(4"] {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            padding-bottom: 1rem !important;
            gap: 0.75rem !important;
          }
          div[style*="grid-template-columns: repeat(4"] > div {
            flex: 0 0 140px !important;
            scroll-snap-align: start !important;
          }
        }
      `}</style>
        </section>
    );
}
