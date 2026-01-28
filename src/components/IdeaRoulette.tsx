"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { rouletteData as initialRouletteData, PlatformData } from "../data/rouletteData";
import { fetchAndParseCSV } from "../utils/csvParser";
import { appendJosa } from "../utils/josa";

const WEBNOVEL_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZVAfssnNjnavLHdi_1MpwKz-IbvFEFEhxPWWEjslhgqC4tIubeLXSrcygOEfIdrNrWbw3WpyjATLc/pub?gid=0&single=true&output=csv";
const YOUTUBE_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZVAfssnNjnavLHdi_1MpwKz-IbvFEFEhxPWWEjslhgqC4tIubeLXSrcygOEfIdrNrWbw3WpyjATLc/pub?gid=630298339&single=true&output=csv";
const INSTAGRAM_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZVAfssnNjnavLHdi_1MpwKz-IbvFEFEhxPWWEjslhgqC4tIubeLXSrcygOEfIdrNrWbw3WpyjATLc/pub?gid=1324285709&single=true&output=csv";
const TIKTOK_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZVAfssnNjnavLHdi_1MpwKz-IbvFEFEhxPWWEjslhgqC4tIubeLXSrcygOEfIdrNrWbw3WpyjATLc/pub?gid=261152106&single=true&output=csv";

interface IdeaRouletteProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function IdeaRoulette({ isOpen, onClose }: IdeaRouletteProps) {
    const [selectedPlatform, setSelectedPlatform] = useState("WebNovel");
    const [rouletteDataState, setRouletteDataState] = useState<Record<string, PlatformData>>(initialRouletteData);
    const [results, setResults] = useState<Record<string, string>>({});
    const [isSpinning, setIsSpinning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const dataFetchedRef = useRef<Record<string, boolean>>({ WebNovel: false, YouTube: false, Instagram: false, TikTok: false });

    // Initial spin when opening
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Animate in
            gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            gsap.fromTo(modalRef.current,
                { scale: 0.9, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
            );
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Fetch data when platform changes or opens
    useEffect(() => {
        if (isOpen && !dataFetchedRef.current[selectedPlatform]) {
            const csvUrl = selectedPlatform === "WebNovel" ? WEBNOVEL_CSV_URL :
                selectedPlatform === "YouTube" ? YOUTUBE_CSV_URL :
                    selectedPlatform === "Instagram" ? INSTAGRAM_CSV_URL :
                        selectedPlatform === "TikTok" ? TIKTOK_CSV_URL : null;

            if (csvUrl) {
                setIsLoading(true);
                fetchAndParseCSV(csvUrl).then(slots => {
                    if (slots.length > 0) {
                        setRouletteDataState(prev => ({
                            ...prev,
                            [selectedPlatform]: {
                                ...prev[selectedPlatform],
                                slots: slots
                            }
                        }));
                    }
                    setIsLoading(false);
                    dataFetchedRef.current[selectedPlatform] = true;
                });
            }
        }
    }, [isOpen, selectedPlatform]);

    const handleClose = () => {
        gsap.to(modalRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.3 });
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            onComplete: onClose
        });
    };

    const spinAll = (animate: boolean = true) => {
        if (isSpinning || isLoading) return;

        const data = rouletteDataState[selectedPlatform];
        if (!data || data.slots.length === 0) {
            // Handle empty platforms (Phase 2)
            return;
        }

        if (animate) {
            setIsSpinning(true);

            // Simple visual effect: rapid random changes
            const duration = 1000; // 1 second spin
            const interval = 50;
            const startTime = Date.now();

            const spinInterval = setInterval(() => {
                const tempResults: Record<string, string> = {};
                data.slots.forEach(slot => {
                    tempResults[slot.name] = slot.values[Math.floor(Math.random() * slot.values.length)];
                });
                setResults(tempResults);

                if (Date.now() - startTime > duration) {
                    clearInterval(spinInterval);
                    // Final result
                    const finalResults: Record<string, string> = {};
                    data.slots.forEach(slot => {
                        finalResults[slot.name] = slot.values[Math.floor(Math.random() * slot.values.length)];
                    });
                    setResults(finalResults);
                    setIsSpinning(false);
                }
            }, interval);
        } else {
            const newResults: Record<string, string> = {};
            data.slots.forEach(slot => {
                newResults[slot.name] = slot.values[Math.floor(Math.random() * slot.values.length)];
            });
            setResults(newResults);
        }
    };

    const generatedSentence = (() => {
        if (Object.keys(results).length === 0) return "";

        if (selectedPlatform === "WebNovel") {
            const genre = results["장르"] || "";
            const personality = results["주인공 개성"] || "";
            const ability = results["특수능력"] || "";
            const world = results["세계관"] || "";
            const goal = results["목표"] || "";
            const lack = results["결핍"] || "";
            const cider = results["사이다 포인트"] || "";
            const narrative = results["서사 장치"] || "";
            const hook = results["3화 후킹"] || "";
            const villain = results["빌런"] || "";

            if (!genre || !personality || !ability || !world || !goal || !lack || !cider || !narrative || !hook || !villain) {
                return "";
            }

            const goalWithJosa = appendJosa(goal, '을/를');
            const narrativeWithJosa = appendJosa(narrative, '과/와');

            return `${world} 배경의 ${genre}물. ${lack} 상황에 처한 ${personality} 주인공이 ${ability} 능력을 각성하여 ${goalWithJosa} 향해 나아간다. ${villain} 성향의 적과 대립하며 ${cider}의 카타르시스를 선사하고, ${narrativeWithJosa} ${hook} 전개로 흥미를 유발한다.`;
        } else if (selectedPlatform === "YouTube") {
            const topic = results["핵심 주제"] || "";
            const persona = results["타겟 페르소나"] || "";
            const hook = results["썸네일 후킹 문구"] || "";
            const conflict = results["오프닝 갈등 제시"] || "";
            const format = results["영상 포맷"] || "";
            const tone = results["톤앤매너"] || "";
            const insight = results["핵심 통찰(Insight)"] || "";
            const style = results["시각적 스타일"] || "";
            const twist = results["의외의 반전/사실"] || "";
            const cta = results["시청 후 행동(CTA)"] || "";

            if (!topic || !persona || !hook || !conflict || !format || !tone || !insight || !style || !twist || !cta) {
                return "";
            }

            const personaWithJosa = appendJosa(persona, '을/를');

            return `${personaWithJosa} 타겟으로 한 ${topic} 주제의 영상. '${conflict}' 상황을 제시하며 시작해, ${format} 형식으로 풀어낸다. ${tone} 톤으로 '${insight}'라는 핵심 메시지를 전달하며, ${style} 스타일로 시각적 몰입을 더한다. '${twist}' 내용을 반전으로 넣고, 마지막엔 '${cta}' 행동을 유도한다. 썸네일 카피는 '${hook}'.`;
        } else if (selectedPlatform === "Instagram") {
            const format = results["콘텐츠 형태"] || "";
            const visual = results["키 비주얼(분위기)"] || "";
            const headline = results["첫 장 헤드라인"] || "";
            const saveInfo = results["'저장' 유도 정보"] || "";
            const caption = results["공감 한 줄(Caption)"] || "";
            const message = results["핵심 메시지"] || "";
            const audio = results["오디오/배경음악"] || "";
            const cta = results["참여 장치(CTA)"] || "";
            const daily = results["일상 연결점"] || "";
            const persona = results["페르소나"] || "";

            if (!format || !visual || !headline || !saveInfo || !caption || !message || !audio || !cta || !daily || !persona) {
                return "";
            }

            const personaWithJosa = appendJosa(persona, '으로/로');
            const visualWithJosa = appendJosa(visual, '으로/로');
            const dailyWithJosa = appendJosa(daily, '에서');

            return `${personaWithJosa} 빙의하여 ${dailyWithJosa} 느끼는 감정을 담는다. ${visualWithJosa} ${format}를 제작한다. 첫 장엔 '${headline}' 문구로 시선을 잡고, '${message}' 메시지를 전한다. '${saveInfo}' 정보를 담아 저장을 유도하고, 배경음악은 ${audio}를 깐다. 캡션엔 '${caption}' 공감 문구를, 마지막엔 '${cta}'로 참여를 이끈다.`;
        } else if (selectedPlatform === "TikTok") {
            const trend = results["유행 챌린지/음원"] || "";
            const hook = results["3초 후킹 (시각/청각)"] || "";
            const twist = results["영상 반전 (Twist)"] || "";
            const replication = results["따라하기 포인트"] || "";
            const style = results["자막/이펙트 스타일"] || "";
            const empathy = results["현실 공감 (Hyper-real)"] || "";
            const character = results["등장 인물/아바타"] || "";
            const replay = results["반복 시청 포인트"] || "";
            const tempo = results["속도감 (Tempo)"] || "";
            const comment = results["댓글 반응 유도"] || "";

            if (!trend || !hook || !twist || !replication || !style || !empathy || !character || !replay || !tempo || !comment) {
                return "";
            }

            const tempoWithJosa = appendJosa(tempo, '으로/로');
            const characterWithJosa = appendJosa(character, '이/가');
            const empathyWithJosa = appendJosa(empathy, '을/를');
            const styleWithJosa = appendJosa(style, '으로/로');
            const replicationWithJosa = appendJosa(replication, '을/를');
            const twistWithJosa = appendJosa(twist, '으로/로');
            const replayWithJosa = appendJosa(replay, '으로/로');

            return `${trend}에 맞춰 ${tempoWithJosa} 진행된다. ${characterWithJosa} 등장해 ${empathyWithJosa} 보여준다. 초반 '${hook}'으로 시선을 뺏고, ${styleWithJosa} 몰입감을 높인다. ${replicationWithJosa} 따라하게 만들며, ${twistWithJosa} 반전을 준다. ${replayWithJosa} 무한 반복을 유도하고, 마지막엔 '${comment}'으로 댓글을 부른다.`;
        }

        return "";
    })();

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            style={{
                position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: "rgba(0,0,0,0.85)",
                backdropFilter: "blur(5px)",
                zIndex: 9999,
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: 0 // Initial state for GSAP
            }}
            onClick={(e) => {
                if (e.target === overlayRef.current) handleClose();
            }}
        >
            <div
                ref={modalRef}
                style={{
                    backgroundColor: "#0f1115",
                    padding: "2.5rem",
                    borderRadius: "1.5rem",
                    maxWidth: "95%",
                    width: "1000px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    position: "relative"
                }}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    style={{
                        position: "absolute",
                        top: "1.5rem",
                        right: "1.5rem",
                        background: "none",
                        border: "none",
                        color: "#666",
                        cursor: "pointer",
                        fontSize: "2rem",
                        lineHeight: 1,
                        transition: "color 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#666"}
                >
                    &times;
                </button>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <h2 style={{
                        color: "#fff",
                        margin: "0 0 0.5rem 0",
                        fontSize: "2rem",
                        fontWeight: 700
                    }}>
                        Idea Spark <span style={{ color: "var(--color-primary)" }}>Roulette</span> ⚡️
                    </h2>
                    <p style={{ color: "#888", margin: 0 }}>
                        키워드를 조합하여 새로운 영감을 발견하세요.
                    </p>
                </div>

                {/* Tabs */}
                <div style={{
                    display: "flex",
                    gap: "0.75rem",
                    marginBottom: "2rem",
                    justifyContent: "center",
                    flexWrap: "wrap"
                }}>
                    {Object.keys(rouletteDataState).map(platform => (
                        <button key={platform}
                            onClick={() => {
                                setSelectedPlatform(platform);
                                setResults({}); // Reset results on platform change
                            }}
                            style={{
                                padding: "0.75rem 1.5rem",
                                backgroundColor: selectedPlatform === platform ? "rgba(0, 212, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
                                color: selectedPlatform === platform ? "var(--color-primary)" : "#888",
                                border: `1px solid ${selectedPlatform === platform ? "var(--color-primary)" : "rgba(255, 255, 255, 0.1)"}`,
                                borderRadius: "100px",
                                cursor: "pointer",
                                fontSize: "0.95rem",
                                fontWeight: selectedPlatform === platform ? 600 : 400,
                                transition: "all 0.2s ease"
                            }}
                        >
                            {platform}
                        </button>
                    ))}
                </div>

                {/* Slots Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "1rem",
                    marginBottom: "3rem",
                    minHeight: "200px"
                }}>
                    {isLoading ? (
                        <div style={{
                            gridColumn: "1 / -1",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "200px",
                            color: "#888"
                        }}>
                            구글 시트에서 데이터를 불러오는 중... 🔄
                        </div>
                    ) : rouletteDataState[selectedPlatform]?.slots.length > 0 ? (
                        rouletteDataState[selectedPlatform].slots.map((slot, index) => (
                            <div key={slot.name} style={{
                                backgroundColor: "#16181c",
                                padding: "1.25rem",
                                borderRadius: "1rem",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                minHeight: "120px",
                                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)"
                            }}>
                                <div style={{
                                    color: "#666",
                                    fontSize: "0.85rem",
                                    marginBottom: "0.75rem",
                                    fontWeight: 500
                                }}>
                                    {slot.name}
                                </div>
                                <div style={{
                                    color: results[slot.name] ? "#fff" : "#444",
                                    fontSize: "1.1rem",
                                    fontWeight: 700,
                                    wordBreak: "keep-all",
                                    lineHeight: 1.4
                                }}>
                                    {results[slot.name] || "?"}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{
                            gridColumn: "1 / -1",
                            textAlign: "center",
                            padding: "4rem",
                            color: "#666"
                        }}>
                            🚧 {selectedPlatform} 모드는 준비 중입니다. (Phase 2)
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div style={{ textAlign: "center" }}>
                    <button
                        onClick={() => spinAll(true)}
                        disabled={isSpinning || isLoading || rouletteDataState[selectedPlatform]?.slots.length === 0}
                        style={{
                            padding: "1.25rem 4rem",
                            fontSize: "1.25rem",
                            fontWeight: 800,
                            background: (isSpinning || isLoading)
                                ? "#333"
                                : "linear-gradient(135deg, #00D4FF, #0099CC)",
                            color: (isSpinning || isLoading) ? "#666" : "#000",
                            border: "none",
                            borderRadius: "100px",
                            cursor: (isSpinning || isLoading) ? "not-allowed" : "pointer",
                            boxShadow: (isSpinning || isLoading)
                                ? "none"
                                : "0 0 30px rgba(0, 212, 255, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)",
                            transition: "all 0.3s ease",
                            transform: (isSpinning || isLoading) ? "scale(0.98)" : "scale(1)"
                        }}
                    >
                        {isSpinning ? "SPINNING..." : "SPIN ALL 🎲"}
                    </button>

                    {!isSpinning && generatedSentence && (
                        <div style={{
                            marginTop: "2rem",
                            padding: "1.5rem",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "1rem",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            textAlign: "left"
                        }}>
                            <div style={{
                                color: "#888",
                                fontSize: "0.9rem",
                                marginBottom: "0.5rem",
                                fontWeight: 500
                            }}>
                                ✨ 한 줄 요약
                            </div>
                            <div style={{
                                color: "#fff",
                                fontSize: "1.1rem",
                                lineHeight: "1.6",
                                marginBottom: "1rem",
                                wordBreak: "keep-all"
                            }}>
                                {generatedSentence}
                            </div>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(generatedSentence);
                                    alert("문장이 복사되었습니다!");
                                }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "rgba(0, 212, 255, 0.1)",
                                    color: "var(--color-primary)",
                                    border: "1px solid rgba(0, 212, 255, 0.3)",
                                    borderRadius: "0.5rem",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                    transition: "all 0.2s"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(0, 212, 255, 0.2)"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(0, 212, 255, 0.1)"}
                            >
                                📋 문장 복사하기
                            </button>
                        </div>
                    )}

                    {!isSpinning && Object.keys(results).length > 0 && (
                        <div style={{ marginTop: "1.5rem" }}>
                            <button
                                onClick={() => {
                                    const text = Object.entries(results)
                                        .map(([key, value]) => `${key}: ${value}`)
                                        .join("\n");
                                    navigator.clipboard.writeText(text);
                                    alert("결과가 클립보드에 복사되었습니다!");
                                }}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#888",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                    fontSize: "0.9rem"
                                }}
                            >
                                전체 결과 복사하기
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
