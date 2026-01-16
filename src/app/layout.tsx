import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://singlepick.space"),
    title: "singlepick | 마케팅은 쉽습니다",
    description:
        "2년 만에 40억 매출을 달성한 실전 유통 전문가의 마케팅 진단 서비스. 당신의 제품과 고객 사이의 다리를 놓아드립니다.",
    keywords: ["마케팅", "컨설팅", "진단", "유통", "브랜딩", "사업자", "중소기업"],
    authors: [{ name: "singlepick" }],
    openGraph: {
        title: "singlepick | 마케팅은 쉽습니다",
        description: "실전 유통 전문가의 마케팅 진단 서비스",
        url: "https://singlepick.space",
        siteName: "singlepick",
        locale: "ko_KR",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "singlepick - 마케팅은 쉽습니다",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "singlepick | 마케팅은 쉽습니다",
        description: "실전 유통 전문가의 마케팅 진단 서비스",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "https://singlepick.space",
    },
};

// JSON-LD 구조화 데이터
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "singlepick",
    description:
        "2년 만에 40억 매출을 달성한 실전 유통 전문가의 마케팅 진단 서비스",
    url: "https://singlepick.space",
    logo: "https://singlepick.space/logo.png",
    image: "https://singlepick.space/og-image.png",
    priceRange: "₩₩",
    areaServed: {
        "@type": "Country",
        name: "South Korea",
    },
    serviceType: ["마케팅 컨설팅", "브랜딩 전략", "유통 진단"],
    sameAs: [
        "https://www.instagram.com/singlepick_marketing/",
        "https://youtube.com/@왕쉬운경제학",
    ],
    contactPoint: {
        "@type": "ContactPoint",
        email: "singlepick.marketing@gmail.com",
        contactType: "customer service",
        availableLanguage: ["Korean"],
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
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Google Analytics */}
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-CXWKT5E1LW"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-CXWKT5E1LW');
                    `}
                </Script>
            </head>
            <body>
                <div className="noise-overlay" />
                {children}
            </body>
        </html>
    );
}
