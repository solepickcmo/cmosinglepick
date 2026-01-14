import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "singlepick | 마케팅은 쉽습니다",
    description: "2년 만에 40억 매출을 달성한 실전 유통 전문가의 마케팅 진단 서비스. 당신의 제품과 고객 사이의 다리를 놓아드립니다.",
    keywords: ["마케팅", "컨설팅", "진단", "유통", "브랜딩", "사업자", "중소기업"],
    authors: [{ name: "singlepick" }],
    openGraph: {
        title: "singlepick | 마케팅은 쉽습니다",
        description: "실전 유통 전문가의 마케팅 진단 서비스",
        locale: "ko_KR",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <head>
                <link rel="icon" href="/favicon.png" type="image/png" />
                <link
                    rel="stylesheet"
                    as="style"
                    crossOrigin="anonymous"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
                />
            </head>
            <body>
                <div className="noise-overlay" />
                {children}
            </body>
        </html>
    );
}
