"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { rouletteData as initialRouletteData, PlatformData } from "../data/rouletteData";
import { fetchAndParseCSV } from "../utils/csvParser";

const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZVAfssnNjnavLHdi_1MpwKz-IbvFEFEhxPWWEjslhgqC4tIubeLXSrcygOEfIdrNrWbw3WpyjATLc/pub?gid=0&single=true&output=csv";

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
    const dataFetchedRef = useRef(false);

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

            if (Object.keys(results).length === 0) {
                if (!dataFetchedRef.current) {
                    setIsLoading(true);
                    fetchAndParseCSV(GOOGLE_SHEET_CSV_URL).then(slots => {
                        if (slots.length > 0) {
                            setRouletteDataState(prev => ({
                                ...prev,
                                WebNovel: {
                                    ...prev.WebNovel,
                                    slots: slots
                                }
                            }));
                        }
                        setIsLoading(false);
                        dataFetchedRef.current = true;
                    });
                }
            }
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

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
                                결과 복사하기
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
