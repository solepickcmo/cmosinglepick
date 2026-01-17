"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const plans = [
    {
        name: "무료",
        price: "0",
        description: "첫 방문 고객을 위한 무료 질문권",
        features: ["1회 무료 질문권", "텍스트 답변 제공", "48시간 내 응답"],
        cta: "무료로 시작하기",
        popular: false,
        accent: false,
        requiresConsultation: false,
    },
    {
        name: "기본",
        price: "5만",
        description: "간단한 마케팅 진단이 필요할 때",
        features: ["1:1 심층 텍스트 진단", "맞춤형 실행안 1개", "24시간 내 응답", "1회 추가 질문"],
        cta: "신청하기",
        popular: false,
        accent: false,
        limit: "매일 3자리 한정",
        requiresConsultation: true,
    },
    {
        name: "프리미엄",
        price: "50만",
        description: "체계적인 마케팅 진단 리포트",
        features: [
            "종합 마케팅 진단 리포트",
            "경쟁사 분석 포함",
            "실행 로드맵 제공",
            "30분 화상 컨설팅",
            "2주간 팔로업 지원",
        ],
        cta: "가장 인기 있는 플랜",
        popular: true,
        accent: true,
        limit: "매월 10명 한정",
        requiresConsultation: true,
    },
    {
        name: "1:1 비즈니스 빌드업",
        price: "80만",
        description: "퇴사/창업 준비를 위한 맞춤형 컨설팅",
        features: [
            "비즈니스 모델(BM) 수익 구조 설계",
            "퇴사/창업 준비 맞춤형 실행 로드맵",
            "1:1 심층 컨설팅 (90분, 화상/대면)",
            "실행 지원 템플릿 5종 제공",
            "1개월 밀착 피드백 및 질의응답",
        ],
        cta: "신청하기",
        popular: false,
        accent: false,
        limit: "매월 5명 한정",
        requiresConsultation: true,
    },
];

export default function Pricing() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!cardsRef.current) return;

        const cards = cardsRef.current.querySelectorAll(".pricing-card");

        const ctx = gsap.context(() => {
            gsap.set(cards, { opacity: 1, y: 0 });

            gsap.from(cards, {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
            });

            const popularCard = cardsRef.current?.querySelector(".popular-glow");
            if (popularCard) {
                gsap.to(popularCard, {
                    boxShadow: "0 0 60px rgba(0, 212, 255, 0.4)",
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handlePaidPlanClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowModal(true);
    };

    return (
        <section id="pricing" ref={sectionRef} className="section">
            <div className="container">
                {/* Section Header */}
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <span
                        style={{
                            color: "var(--color-accent)",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                        }}
                    >
                        Pricing
                    </span>
                    <h2 style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
                        당신에게 맞는 <span className="text-gradient-primary">플랜</span>을 선택하세요
                    </h2>
                    <p style={{ maxWidth: "500px", margin: "0 auto" }}>
                        모든 플랜은 100% 만족 보장. 결과에 만족하지 못하시면 전액 환불해 드립니다.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div
                    ref={cardsRef}
                    className="pricing-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "1.5rem",
                        alignItems: "stretch",
                    }}
                >
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`pricing-card card ${plan.popular ? "popular-glow" : ""}`}
                            style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                padding: "2rem 1.5rem",
                                paddingTop: plan.popular ? "2.5rem" : "2rem",
                                border: plan.popular ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                                background: plan.popular
                                    ? "linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(255, 184, 0, 0.03))"
                                    : "var(--color-bg-secondary)",
                                borderRadius: "20px",
                                zIndex: plan.popular ? 10 : 1,
                            }}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-14px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                                        color: "var(--color-bg)",
                                        fontSize: "0.75rem",
                                        fontWeight: 700,
                                        padding: "0.5rem 1.25rem",
                                        borderRadius: "100px",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    🔥 가장 인기
                                </div>
                            )}

                            {/* Plan Name */}
                            <div style={{ marginBottom: "1rem" }}>
                                <h3 style={{
                                    color: plan.accent ? "var(--color-primary)" : "var(--color-text)",
                                    fontSize: "1.25rem",
                                    marginBottom: "0.5rem",
                                }}>
                                    {plan.name}
                                </h3>
                                <p style={{ fontSize: "0.85rem", marginTop: "0.5rem", lineHeight: 1.5 }}>{plan.description}</p>
                            </div>

                            {/* Price */}
                            <div style={{ marginBottom: "1.5rem" }}>
                                <span
                                    style={{
                                        fontSize: "2.5rem",
                                        fontWeight: 800,
                                        color: "#FFFFFF",
                                    }}
                                >
                                    {plan.price}
                                </span>
                                <span style={{ color: "var(--color-text-secondary)", fontSize: "1rem", marginLeft: "2px" }}>원</span>
                            </div>

                            {/* Limit Badge - Always show container for alignment */}
                            <div
                                style={{
                                    height: "40px",
                                    marginBottom: "1.5rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {plan.limit && (
                                    <div
                                        style={{
                                            background: "rgba(255, 184, 0, 0.15)",
                                            border: "1px solid rgba(255, 184, 0, 0.4)",
                                            borderRadius: "8px",
                                            padding: "0.5rem 1rem",
                                            fontSize: "0.8rem",
                                            color: "var(--color-accent)",
                                            textAlign: "center",
                                            fontWeight: 600,
                                            width: "100%",
                                        }}
                                    >
                                        ⚡ {plan.limit}
                                    </div>
                                )}
                            </div>

                            {/* Features */}
                            <ul
                                style={{
                                    listStyle: "none",
                                    marginBottom: "2rem",
                                    flex: 1,
                                }}
                            >
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: "0.75rem",
                                            marginBottom: "0.75rem",
                                            fontSize: "0.875rem",
                                            color: "var(--color-text-secondary)",
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        <span style={{ color: "var(--color-primary)", flexShrink: 0 }}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            {plan.requiresConsultation ? (
                                <button
                                    onClick={handlePaidPlanClick}
                                    className={plan.popular ? "btn-primary" : "btn-secondary"}
                                    style={{
                                        width: "100%",
                                        padding: "0.875rem 1rem",
                                        fontSize: "0.9rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    {plan.popular ? "시작하기" : plan.cta}
                                </button>
                            ) : (
                                <a
                                    href="https://forms.gle/4N7w4Jr8RLch1QrV7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                    style={{
                                        width: "100%",
                                        padding: "0.875rem 1rem",
                                        fontSize: "0.9rem",
                                        textDecoration: "none",
                                        display: "block",
                                        textAlign: "center",
                                    }}
                                >
                                    {plan.cta}
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* Notice */}
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "3rem",
                        fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                    }}
                >
                    * 모든 서비스는 &apos;설계/진단&apos;에 집중하며, 광고 세팅 등의 실행은 포함되지 않습니다.
                </p>
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0, 0, 0, 0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                        padding: "1rem",
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        style={{
                            background: "var(--color-bg-secondary)",
                            borderRadius: "20px",
                            padding: "2.5rem",
                            maxWidth: "450px",
                            width: "100%",
                            border: "1px solid var(--color-border)",
                            textAlign: "center",
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>📋</div>
                        <h3 style={{ marginBottom: "1rem", fontSize: "1.25rem", color: "var(--color-text)" }}>
                            안내드립니다
                        </h3>
                        <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.8, marginBottom: "2rem" }}>
                            <strong style={{ color: "var(--color-primary)" }}>무료 질문, 무료상담이 완료된 분들</strong>에 한해서
                            <br />
                            개별적으로 연락드립니다.
                        </p>
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                            <button
                                onClick={() => setShowModal(false)}
                                className="btn-secondary"
                                style={{ padding: "0.75rem 1.5rem" }}
                            >
                                닫기
                            </button>
                            <a
                                href="https://forms.gle/4N7w4Jr8RLch1QrV7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                                style={{ padding: "0.75rem 1.5rem", textDecoration: "none" }}
                            >
                                무료 상담 신청하기
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        @media (max-width: 1024px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
        }
        @media (max-width: 640px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
        </section>
    );
}
