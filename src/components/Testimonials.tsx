"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const testimonials = [
    {
        quote: "나침반 없이 항해하던 기분이었습니다.",
        content: "유튜브에서 하라는 대로 다 해봤지만 제자리였는데, 대표님을 만나고 우리 회사에 맞는 '단 하나의 핵심'을 찾았습니다. 이제야 안개가 걷힌 기분입니다.",
        author: "IT 스타트업 대표 A님",
    },
    {
        quote: "정보가 독이 될 수 있다는 걸 깨달았습니다.",
        content: "AI니 자동화니 쏟아지는 정보에 머리만 아팠는데, 불필요한 걸 걷어내고 나니 비즈니스의 본질이 보이더군요. 심플함이 가장 강력한 무기라는 걸 배웠습니다.",
        author: "디자인 에이전시 대표 B님",
    },
    {
        quote: "복잡한 기획서 10장보다 명확한 문장 한 줄의 힘.",
        content: "어렵게만 생각했던 마케팅이 대표님의 솔루션으로 너무나 명쾌해졌습니다. 덕분에 사업 방향이 180도 바뀌었고 매출로 증명되고 있습니다.",
        author: "제조업 대표 C님",
    },
    {
        quote: "막연한 불안감을 확신으로 바꿔주는 곳.",
        content: "다들 잘된다고 하는 방식이 왜 저에게만 안 맞는지 답답했습니다. 제 사업의 특성을 정확히 꿰뚫어 보시는 통찰력에 소름이 돋았습니다.",
        author: "온라인 클래스 운영자 D님",
    },
    {
        quote: "리더의 시간을 벌어주는 서비스입니다.",
        content: "공부할 게 너무 많아 정작 사업 운영에 집중을 못 했는데, 깔끔하게 정리된 로드맵 덕분에 의사결정 시간이 절반으로 줄었습니다.",
        author: "F&B 프랜차이즈 대표 E님",
    },
    {
        quote: "우리 가게 문턱이 낮아진 느낌입니다.",
        content: "좋은 제품만 만들면 알아줄 줄 알았어요. 고객이 들어오는 통로를 어떻게 설계하느냐가 얼마나 중요한지 이제야 알게 되었습니다.",
        author: "수제 가구 공방 운영 F님",
    },
    {
        quote: "마케팅은 설득이 아니라 연결이라는 말, 체감합니다.",
        content: "억지로 팔려고 애쓰지 않아도 고객이 먼저 찾아오는 구조를 만들었습니다. '다리'가 없었을 뿐이라는 말이 정답이었네요.",
        author: "전문직 세무사 G님",
    },
    {
        quote: "광고비만 낭비하던 시절이 후회됩니다.",
        content: "무작정 광고만 돌리는 게 능사가 아니더군요. 고객의 결핍과 내 서비스가 만나는 지점을 정확히 연결하니 전환율이 3배 올랐습니다.",
        author: "코스메틱 브랜드 대표 H님",
    },
    {
        quote: "고객의 언어로 말하는 법을 배웠습니다.",
        content: "제가 하고 싶은 말만 하느라 고객의 마음을 놓치고 있었어요. 서비스의 철학을 고객이 이해하기 쉽게 번역해 주신 덕분에 상담 문의가 끊이지 않습니다.",
        author: "심리상담센터 원장 I님",
    },
    {
        quote: "끊어진 다리를 수리한 기분입니다.",
        content: "콘텐츠는 많은데 왜 매출로 안 이어질까 고민했습니다. 흐트러진 동선을 정리하고 고객이 오는 길을 터주니 비즈니스가 다시 흐르기 시작했습니다.",
        author: "라이프스타일 편집숍 대표 J님",
    },
    {
        quote: "AI 도구의 노예에서 주인이 되었습니다.",
        content: "온갖 툴을 다 써봐도 업무량은 줄지 않았는데, 핵심 공정을 단순화하는 법을 배우고 나니 비로소 AI가 제 비서 역할을 하기 시작했습니다.",
        author: "1인 지식 창업가 K님",
    },
    {
        quote: "단순함이 곧 프리미엄이라는 사실.",
        content: "덕더덕 붙어있던 군더더기를 떼어내니 브랜드가 훨씬 고급스러워졌습니다. 대표님의 감각적인 카피와 전략에 매번 감탄합니다.",
        author: "프리미엄 주얼리 대표 M님",
    },
    {
        quote: "디테일이 다른 컨설팅입니다.",
        content: "뻔한 마케팅 공식이 아니라, 우리 회사만이 가질 수 있는 독보적인 위치를 찾아주셨습니다. 결과물이 나오기까지 과정이 너무 깔끔합니다.",
        author: "수출 전문 기업 대표 O님",
    },
    {
        quote: "월 매출 앞자리가 바뀌었습니다.",
        content: "단순히 마케팅을 도와주는 수준이 아닙니다. 사업의 구조 자체를 수익형으로 재설계해 주셔서 기대 이상의 성과를 거두고 있습니다.",
        author: "교육 서비스 대표 P님",
    },
    {
        quote: "투자 대비 성과(ROI)가 가장 확실한 투자.",
        content: "처음엔 반신반의했지만, 첫 번째 프로젝트 이후 모든 비즈니스 결정을 대표님과 논의하고 있습니다. 신뢰 그 자체입니다.",
        author: "IT 솔루션 업체 Q님",
    },
    {
        quote: "직원들도 명확한 목표를 갖게 되었습니다.",
        content: "리더인 저조차 모호했던 방향성을 정리하고 나니, 조직 전체가 한 방향으로 움직이기 시작했습니다. 내부 결속력까지 좋아졌네요.",
        author: "중소기업 경영지원팀 R님",
    },
    {
        quote: "정체기였던 비즈니스의 돌파구.",
        content: "3년간 매출이 제자리였는데, 연결의 '다리'를 새로 놓은 지 3개월 만에 신규 고객 유입이 폭발했습니다. 진심으로 감사합니다.",
        author: "피트니스 센터 프랜차이즈 S님",
    },
    {
        quote: "진정한 비즈니스 파트너를 만났습니다.",
        content: "단순 대행사가 아니라 내 일처럼 고민해 주는 든든한 조력자입니다. 대표님의 철학이 담긴 카피 하나하나가 제 사업의 자산이 되었습니다.",
        author: "건강기능식품 대표 T님",
    },
];

// 5 stars component
const Stars = () => (
    <div style={{ display: "flex", gap: "2px", marginBottom: "1rem" }}>
        {[...Array(5)].map((_, i) => (
            <span key={i} style={{ color: "var(--color-accent)", fontSize: "1rem" }}>★</span>
        ))}
    </div>
);

export default function Testimonials() {
    const track1Ref = useRef<HTMLDivElement>(null);
    const track2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!track1Ref.current || !track2Ref.current) return;

        const track1 = track1Ref.current;
        const track2 = track2Ref.current;

        // Pause on hover
        const handleMouseEnter1 = () => {
            track1.style.animationPlayState = "paused";
        };
        const handleMouseLeave1 = () => {
            track1.style.animationPlayState = "running";
        };
        const handleMouseEnter2 = () => {
            track2.style.animationPlayState = "paused";
        };
        const handleMouseLeave2 = () => {
            track2.style.animationPlayState = "running";
        };

        track1.addEventListener("mouseenter", handleMouseEnter1);
        track1.addEventListener("mouseleave", handleMouseLeave1);
        track2.addEventListener("mouseenter", handleMouseEnter2);
        track2.addEventListener("mouseleave", handleMouseLeave2);

        return () => {
            track1.removeEventListener("mouseenter", handleMouseEnter1);
            track1.removeEventListener("mouseleave", handleMouseLeave1);
            track2.removeEventListener("mouseenter", handleMouseEnter2);
            track2.removeEventListener("mouseleave", handleMouseLeave2);
        };
    }, []);

    const firstHalf = testimonials.slice(0, 9);
    const secondHalf = testimonials.slice(9);

    return (
        <section
            style={{
                padding: "5rem 0",
                background: "var(--color-bg)",
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Section Header */}
            <div style={{ textAlign: "center", marginBottom: "3rem", padding: "0 2rem" }}>
                <span
                    style={{
                        color: "var(--color-primary)",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                    }}
                >
                    대표님들의 솔직한 리뷰
                </span>
                <h2 style={{ marginTop: "1rem" }}>
                    <span style={{ color: "#FFFFFF", fontWeight: 700 }}>실제 대표님들</span>의 후기
                </h2>
            </div>

            {/* First Row - Left scroll */}
            <div style={{ marginBottom: "1.5rem", position: "relative" }}>
                <div
                    ref={track1Ref}
                    className="scroll-track-left"
                    style={{
                        display: "flex",
                        gap: "1.5rem",
                        width: "fit-content",
                    }}
                >
                    {[...firstHalf, ...firstHalf].map((item, index) => (
                        <div
                            key={`row1-${index}`}
                            style={{
                                minWidth: "380px",
                                maxWidth: "380px",
                                padding: "1.5rem",
                                background: "var(--color-bg-secondary)",
                                borderRadius: "16px",
                                border: "1px solid var(--color-border)",
                                flexShrink: 0,
                            }}
                        >
                            <Stars />
                            <p
                                style={{
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    color: "var(--color-text)",
                                    marginBottom: "0.75rem",
                                    lineHeight: 1.5,
                                }}
                            >
                                &ldquo;{item.quote}&rdquo;
                            </p>
                            <p
                                style={{
                                    fontSize: "0.9rem",
                                    color: "var(--color-text-secondary)",
                                    lineHeight: 1.7,
                                    marginBottom: "1rem",
                                }}
                            >
                                {item.content}
                            </p>
                            <p
                                style={{
                                    fontSize: "0.8rem",
                                    color: "var(--color-primary)",
                                    fontWeight: 500,
                                }}
                            >
                                — {item.author}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Second Row - Right scroll */}
            <div style={{ position: "relative" }}>
                <div
                    ref={track2Ref}
                    className="scroll-track-right"
                    style={{
                        display: "flex",
                        gap: "1.5rem",
                        width: "fit-content",
                    }}
                >
                    {[...secondHalf, ...secondHalf].map((item, index) => (
                        <div
                            key={`row2-${index}`}
                            style={{
                                minWidth: "380px",
                                maxWidth: "380px",
                                padding: "1.5rem",
                                background: "var(--color-bg-secondary)",
                                borderRadius: "16px",
                                border: "1px solid var(--color-border)",
                                flexShrink: 0,
                            }}
                        >
                            <Stars />
                            <p
                                style={{
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    color: "var(--color-text)",
                                    marginBottom: "0.75rem",
                                    lineHeight: 1.5,
                                }}
                            >
                                &ldquo;{item.quote}&rdquo;
                            </p>
                            <p
                                style={{
                                    fontSize: "0.9rem",
                                    color: "var(--color-text-secondary)",
                                    lineHeight: 1.7,
                                    marginBottom: "1rem",
                                }}
                            >
                                {item.content}
                            </p>
                            <p
                                style={{
                                    fontSize: "0.8rem",
                                    color: "var(--color-primary)",
                                    fontWeight: 500,
                                }}
                            >
                                — {item.author}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gradient Overlays */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "100px",
                    background: "linear-gradient(to right, var(--color-bg), transparent)",
                    pointerEvents: "none",
                    zIndex: 10,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "100px",
                    background: "linear-gradient(to left, var(--color-bg), transparent)",
                    pointerEvents: "none",
                    zIndex: 10,
                }}
            />

            <style jsx>{`
                @keyframes scrollLeft {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                @keyframes scrollRight {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
                .scroll-track-left {
                    animation: scrollLeft 40s linear infinite;
                }
                .scroll-track-right {
                    animation: scrollRight 40s linear infinite;
                }
            `}</style>
        </section>
    );
}
