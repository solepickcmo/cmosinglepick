import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Credentials from "@/components/Credentials";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";

export default function Home() {
    return (
        <main>
            <Header />
            <Hero />
            <About />
            <Testimonials />
            <Credentials />
            <Pricing />
            <Contact />
        </main>
    );
}
