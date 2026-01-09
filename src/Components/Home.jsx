import React, { useState, useRef, useEffect } from "react";
import Nav from "./NavComponent/Nav";
import Footer from "./Footer.jsx";

function Home() {
  const [expanded, setExpanded] = React.useState(false);
  const cardRef = useRef(null);
  const expandedRef = useRef(null);
  useEffect(() => {
    if (!expanded || !cardRef.current || !expandedRef.current) return;

    setTimeout(() => {
      cardRef.current.scrollTo({
        top: expandedRef.current.offsetTop - 20,
        behavior: "smooth",
      });
    }, 200);
  }, [expanded]);

  return (
    <div className="bg-body max-h-screen overflow-hidden">
      <Nav />

      <section className="flex justify-center px-6 mt-28">
        <div
          ref={cardRef}
          className={`"
            relative max-w-7xl w-full
            bg-neutral-white
            border border-neutral-border
            rounded-2xl
            p-8 md:p-12
            shadow-md
            transition-all duration-500 ease-out
            hover:shadow-lg hover:-translate-y-1
            animate-[fadeInUp_0.6s_ease-out]
            ${expanded 
              ? "max-h-[70vh] overflow-y-auto" 
              : "max-h-[460px] overflow-hidden"}
          `}
        >
          {/* Accent bar */}
          <span className="absolute left-0 top-6 h-16 w-1 bg-primary rounded-r-full" />

          {/* Title */}
          <h1 className="font-[Gagalin] text-4xl md:text-5xl text-primary-default text-center">
            WealthGrow Fintax Services
          </h1>

          {/* Intro paragraph */}
          <p className="mt-6 text-base md:text-lg text-neutral-textSecondary text-center leading-relaxed max-w-5xl mx-auto">
            <span className="font-medium text-primary-dark">
              WealthGrow Fintax Services (WFS)
            </span>{" "}
            is a professionally managed, multidisciplinary consultancy firm
            delivering integrated solutions across taxation, financial
            management, legal advisory, insurance, technology consulting, and
            engineering services. We serve individuals, startups, and
            established enterprises with a strong focus on regulatory
            compliance, financial discipline, and long-term value creation.
          </p>

          {/* Supporting paragraph */}
          <p className="mt-4 text-base md:text-lg text-neutral-textSecondary text-center leading-relaxed max-w-5xl mx-auto">
            With a network of experienced professionals and domain specialists,
            WFS operates with a deep understanding of India’s regulatory,
            financial, and business environments. Our advisory approach combines
            technical expertise with practical insight, enabling clients to
            navigate complex regulations, mitigate risk, and make informed
            strategic decisions with confidence.
          </p>

          <div
           ref={expandedRef}
            className={`
              transition-opacity duration-300
              ${expanded ? "opacity-100 mt-4" : "opacity-0 h-0 overflow-hidden"}
            `}
          >
            <p className="mt-4 text-base md:text-lg text-neutral-textSecondary text-center leading-relaxed max-w-5xl mx-auto">
              At WFS, we believe sustainable growth is built on accuracy,
              transparency, and responsible planning. Every engagement is
              approached with diligence and accountability, ensuring our clients
              receive reliable guidance aligned with statutory requirements and
              industry best practices.
            </p>

            <p className="mt-4 text-base md:text-lg text-neutral-textSecondary text-center leading-relaxed max-w-5xl mx-auto">
              From tax planning and audits to financial structuring, legal
              compliance, and engineering consultancy, WFS functions as a
              single-window advisory partner. Our objective is not only to solve
              immediate challenges, but also to build long-term professional
              relationships grounded in trust, integrity, and measurable
              outcomes.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 flex justify-center gap-20">
            <button
              className="
                bg-primary-default text-accent-gold font-semibold hover:text-white
                px-10 py-3 rounded-lg
                hover:bg-primary-light
                transition-all duration-300
                shadow hover:shadow-md
              "
            >
              Let’s Talk
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="
                border border-primary text-primary font-semibold
                px-10 py-3 rounded-lg
                hover:bg-primary hover:text-accent-goldLight
                transition-all duration-300
              "
            >
              {expanded ? "Show Less" : "Learn More"}
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(16px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;
