import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Search, MapPin, Home, Building2, Key, Phone,
  Mail, Star, Bed, Bath, Maximize2, ArrowRight,
  TrendingUp, Shield, Clock, Award, Users, HeartHandshake,
  Briefcase, CalendarCheck, Instagram, Facebook, Check, ChevronUp,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoImg from "@/imports/IMG-20260704-WA0001.jpg";

// ── Brand ────────────────────────────────────────────────────────────────────

const G = "#F0A500"; // gold
const DARK = "#080808";

// ── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Properties", href: "#properties" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const PROPERTIES = [
  {
    id: 1, title: "Kimihurura Luxury Villa", location: "Kimihurura, Kigali",
    price: "$850,000", period: "", type: "sale", beds: 5, baths: 4, sqft: 480,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=560&fit=crop&auto=format",
    tag: "Premium",
  },
  {
    id: 2, title: "Nyarutarama Executive Apt", location: "Nyarutarama, Kigali",
    price: "$1,800", period: "/mo", type: "rent", beds: 3, baths: 2, sqft: 210,
    image: "https://images.unsplash.com/photo-1757924461488-ef9ad0670978?w=800&h=560&fit=crop&auto=format",
    tag: "New Listing",
  },
  {
    id: 3, title: "Gacuriro Modern Home", location: "Gacuriro, Kigali",
    price: "$620,000", period: "", type: "sale", beds: 4, baths: 3, sqft: 380,
    image: "https://images.unsplash.com/photo-1767950470198-c9cd97f8ed87?w=800&h=560&fit=crop&auto=format",
    tag: "Featured",
  },
  {
    id: 4, title: "Gisozi Commercial Hub", location: "Gisozi, Kigali",
    price: "$3,200", period: "/mo", type: "commercial", beds: null, baths: null, sqft: 520,
    image: "https://images.unsplash.com/photo-1758691736933-bb0f88fe2e0c?w=800&h=560&fit=crop&auto=format",
    tag: "Commercial",
  },
  {
    id: 5, title: "Remera Penthouse Suite", location: "Remera, Kigali",
    price: "$2,400", period: "/mo", type: "rent", beds: 4, baths: 3, sqft: 320,
    image: "https://images.unsplash.com/photo-1646987916641-1f3c8992daa2?w=800&h=560&fit=crop&auto=format",
    tag: "Exclusive",
  },
  {
    id: 6, title: "Kanombe Hillside Villa", location: "Kanombe, Kigali",
    price: "$1,200,000", period: "", type: "sale", beds: 6, baths: 5, sqft: 620,
    image: "https://images.unsplash.com/photo-1720608596579-27fa1ef828e8?w=800&h=560&fit=crop&auto=format",
    tag: "Luxury",
  },
];

const SERVICES = [
  { icon: Home, title: "Apartments for Rent", desc: "Verified furnished & unfurnished apartments across Kigali's most sought-after districts." },
  { icon: Building2, title: "Houses & Villas", desc: "Exclusive standalone homes and luxury villas with premium finishes and prime addresses." },
  { icon: Key, title: "Property Sales", desc: "Expert guidance to purchase your ideal property at the best market-rate value." },
  { icon: Briefcase, title: "Commercial Properties", desc: "Office spaces, retail units, and commercial complexes for every business ambition." },
  { icon: Shield, title: "Property Management", desc: "Comprehensive management so your investment earns returns without the stress." },
  { icon: HeartHandshake, title: "Real Estate Consultation", desc: "Personalised advisory from our seasoned Kigali property specialists." },
  { icon: CalendarCheck, title: "Airbnb Management", desc: "Maximise short-term rental income with our end-to-end Airbnb service." },
  { icon: TrendingUp, title: "Property Marketing", desc: "Reach verified buyers and tenants through targeted digital marketing campaigns." },
];

const STATS = [
  { value: 500, suffix: "+", label: "Properties Listed" },
  { value: 300, suffix: "+", label: "Happy Clients" },
  { value: 50, suffix: "+", label: "Prime Locations" },
  { value: 100, suffix: "%", label: "Verified Listings" },
];

const TESTIMONIALS = [
  {
    name: "Jean-Pierre Habimana", role: "Property Investor",
    text: "Home Deals Daily found me an incredible villa in Nyarutarama within a week. Their professionalism and market knowledge is unmatched in Kigali.",
  },
  {
    name: "Amina Uwimana", role: "Business Owner",
    text: "The commercial space they sourced for our headquarters exceeded all expectations. Fast, reliable, and genuinely invested in our success.",
  },
  {
    name: "David Mutabazi", role: "Expatriate Resident",
    text: "Relocating to Kigali from abroad was daunting — Home Deals Daily made finding the perfect home entirely seamless and stress-free.",
  },
];

const TICKER = [
  "Quality Properties", "Affordable Prices", "Trusted Service",
  "Prime Kigali Locations", "Verified Listings", "Fast Response",
  "Professional Team", "Client Satisfaction",
];

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useScrolled(offset = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > offset);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [offset]);
  return scrolled;
}

function useCounter(target: number, run: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!run) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [run, target, duration]);
  return count;
}

// ── Shared primitives ─────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(44px)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px w-8" style={{ background: G }} />
      <span className="text-[10px] tracking-[0.28em] uppercase font-semibold" style={{ color: G }}>
        {children}
      </span>
      <div className="h-px w-8" style={{ background: G }} />
    </div>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-white ${className}`}
      style={{
        fontSize: "clamp(2rem, 4vw, 3.25rem)",
        fontFamily: "'Tenor Sans', serif",
        fontWeight: 400,
        lineHeight: 1.08,
      }}
    >
      {children}
    </h2>
  );
}

// ── Navigation ────────────────────────────────────────────────────────────────

function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(8,8,8,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(240,165,0,0.18)" : "transparent"}`,
        transition: "background 0.5s, border-color 0.5s, backdrop-filter 0.5s",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 flex-shrink-0 group">
          <ImageWithFallback
            src={logoImg}
            alt="Home Deals Daily"
            className="w-11 h-11 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden sm:block leading-[1.2]">
            <span className="text-white font-bold text-[15px] tracking-wide">
              Home<span style={{ color: G }}>Deals</span>
            </span>
            <div className="text-white/40 text-[9px] tracking-[0.28em] uppercase">Daily · Kigali</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="relative text-white/65 text-sm tracking-wide hover:text-white transition-colors duration-200 group"
            >
              {label}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: G }}
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/250780367259"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-[11px] tracking-[0.14em] uppercase font-bold transition-all duration-200"
            style={{ background: G, color: DARK }}
            onMouseEnter={e => (e.currentTarget.style.background = "#d4920a")}
            onMouseLeave={e => (e.currentTarget.style.background = G)}
          >
            <Phone size={12} strokeWidth={2.5} />
            WhatsApp Us
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2 transition-colors"
            aria-label="Toggle navigation"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <div
        className="lg:hidden overflow-hidden"
        style={{
          maxHeight: open ? "340px" : "0",
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
          background: "rgba(8,8,8,0.99)",
          borderBottom: open ? `1px solid rgba(240,165,0,0.15)` : "none",
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-white/75 text-base hover:text-white transition-colors tracking-wide"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="https://wa.me/250780367259"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 text-[11px] tracking-[0.16em] uppercase font-bold mt-2"
            style={{ background: G, color: DARK }}
          >
            <Phone size={13} /> WhatsApp Us
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

const HERO_TABS = ["For Sale", "For Rent", "Commercial"];

function Hero() {
  const [tab, setTab] = useState("For Sale");
  const [loc, setLoc] = useState("");

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&h=1080&fit=crop&auto=format"
          alt="Luxury property at night"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.55)" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(8,8,8,0.45)" }} />
      </div>

      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] hidden lg:block"
        style={{ background: G }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24">
        <div className="max-w-[640px]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="h-px w-10" style={{ background: G }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: G }}>
              Rwanda's Premier Real Estate Partner
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-white mb-7"
            style={{
              fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
              lineHeight: 1.03,
              fontFamily: "'Tenor Sans', serif",
              fontWeight: 400,
            }}
          >
            Find Your <br />
            <span style={{ color: G }}>Perfect Home</span>
            <br />in Kigali
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28 }}
            className="text-white/60 text-[1.05rem] leading-relaxed mb-10 max-w-[480px]"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            From luxury villas to modern apartments — every listing verified, every price transparent. Your dream property is one search away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.42 }}
            style={{ background: DARK }}
          >
            <div
              className="flex border-b"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              {HERO_TABS.map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-5 py-3.5 text-[10px] tracking-[0.22em] uppercase font-semibold transition-all duration-200"
                  style={{
                    color: tab === t ? G : "rgba(255,255,255,0.38)",
                    borderBottom: `2px solid ${tab === t ? G : "transparent"}`,
                    marginBottom: "-1px",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex">
              <div
                className="flex-1 flex items-center gap-3 px-5 py-4"
                style={{ borderRight: "1px solid rgba(255,255,255,0.08)" }}
              >
                <MapPin size={15} style={{ color: G, flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Location — e.g. Nyarutarama, Kigali"
                  value={loc}
                  onChange={e => setLoc(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-white/25 text-sm outline-none"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                />
              </div>
              <button
                className="flex items-center gap-2 px-6 py-4 text-[10px] tracking-[0.16em] uppercase font-bold transition-all duration-200 flex-shrink-0"
                style={{ background: G, color: DARK }}
                onMouseEnter={e => (e.currentTarget.style.background = "#d4920a")}
                onMouseLeave={e => (e.currentTarget.style.background = G)}
              >
                <Search size={13} /> Search
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex gap-8 mt-9"
          >
            {[["500+", "Properties"], ["300+", "Clients"], ["50+", "Locations"]].map(([n, l]) => (
              <div key={l}>
                <div
                  className="text-white font-bold text-2xl mb-0.5"
                  style={{ fontFamily: "'Tenor Sans', serif", color: G }}
                >
                  {n}
                </div>
                <div className="text-white/38 text-[10px] tracking-[0.22em] uppercase">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 overflow-hidden relative bg-white/10">
          <motion.div
            className="absolute inset-x-0 top-0 h-full"
            style={{ background: G }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <span className="text-white/28 text-[9px] tracking-[0.24em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}

// ── Ticker ─────────────────────────────────────────────────────────────────────

function Ticker() {
  const items = [...TICKER, ...TICKER, ...TICKER];
  return (
    <div style={{ background: G, overflow: "hidden" }} className="py-3.5">
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ animation: "hdd-ticker 35s linear infinite", width: "max-content" }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: DARK }}>
            <span className="px-7">{item}</span>
            <span className="opacity-30">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="py-28 px-6 lg:px-10" style={{ background: DARK }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp className="mb-16">
          <Tag>Our Services</Tag>
          <SectionTitle>
            Everything You Need<br />
            <span style={{ color: G }}>Under One Roof</span>
          </SectionTitle>
          <p className="text-white/45 mt-5 max-w-lg leading-relaxed text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
            From your first apartment to a full investment portfolio — our complete suite of real estate services has you covered across Kigali and beyond.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.04)" }}>
          {SERVICES.map((svc, i) => (
            <FadeUp key={svc.title} delay={i * 0.055}>
              <ServiceCard {...svc} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="p-8 cursor-pointer h-full"
      style={{
        background: hov ? "#111" : "#0c0c0c",
        borderTop: `2px solid ${hov ? G : "transparent"}`,
        transition: "background 0.3s, border-color 0.3s",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className="w-11 h-11 flex items-center justify-center mb-6"
        style={{
          border: `1px solid ${hov ? G : "rgba(255,255,255,0.1)"}`,
          transition: "border-color 0.3s",
        }}
      >
        <Icon size={20} style={{ color: hov ? G : "rgba(255,255,255,0.5)", transition: "color 0.3s" }} />
      </div>
      <h3
        className="text-white text-[15px] font-semibold mb-3"
        style={{ fontFamily: "'Tenor Sans', serif" }}
      >
        {title}
      </h3>
      <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>{desc}</p>
      <div
        className="mt-5 flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-semibold"
        style={{ color: hov ? G : "transparent", transition: "color 0.3s" }}
      >
        Learn More <ArrowRight size={11} />
      </div>
    </div>
  );
}

// ── Stats ─────────────────────────────────────────────────────────────────────

function StatsSection() {
  const { ref, inView } = useInView(0.25);
  return (
    <section
      ref={ref}
      style={{ background: "#0c0c0c", borderTop: `1px solid rgba(240,165,0,0.12)`, borderBottom: `1px solid rgba(240,165,0,0.12)` }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0" style={{ divideColor: "rgba(255,255,255,0.04)" }}>
        {STATS.map((s, i) => (
          <StatBox key={s.label} {...s} run={inView} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

function StatBox({ value, suffix, label, run, delay }: { value: number; suffix: string; label: string; run: boolean; delay: number }) {
  const count = useCounter(value, run);
  return (
    <div
      className="text-center py-14 px-8"
      style={{
        opacity: run ? 1 : 0,
        transform: run ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      <div
        className="text-[3.2rem] font-bold leading-none mb-2"
        style={{ color: G, fontFamily: "'Tenor Sans', serif" }}
      >
        {count}{suffix}
      </div>
      <div className="text-white/38 text-[10px] tracking-[0.24em] uppercase">{label}</div>
    </div>
  );
}

// ── Properties ────────────────────────────────────────────────────────────────

const PROP_TABS = ["All", "For Sale", "For Rent", "Commercial"];

function Properties() {
  const [tab, setTab] = useState("All");

  const filtered = PROPERTIES.filter(p => {
    if (tab === "All") return true;
    if (tab === "For Sale") return p.type === "sale";
    if (tab === "For Rent") return p.type === "rent";
    if (tab === "Commercial") return p.type === "commercial";
    return true;
  });

  return (
    <section id="properties" className="py-28 px-6 lg:px-10" style={{ background: DARK }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <Tag>Featured Properties</Tag>
              <SectionTitle>
                Handpicked Listings<br />
                <span style={{ color: G }}>Across Kigali</span>
              </SectionTitle>
            </div>
            <div
              className="flex gap-0.5 border self-start md:self-auto flex-shrink-0"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              {PROP_TABS.map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-4 py-2.5 text-[10px] tracking-[0.18em] uppercase font-semibold transition-all duration-200"
                  style={{
                    background: tab === t ? G : "transparent",
                    color: tab === t ? DARK : "rgba(255,255,255,0.38)",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.06}>
              <PropertyCard {...p} />
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div className="mt-14 flex justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-10 py-4 text-[11px] tracking-[0.18em] uppercase font-semibold transition-all duration-300 border text-white hover:text-black"
              style={{ borderColor: "rgba(240,165,0,0.35)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = G; (e.currentTarget as HTMLElement).style.borderColor = G; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,165,0,0.35)"; }}
            >
              Enquire About All Properties <ArrowRight size={13} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function PropertyCard({ title, location, price, period, type, beds, baths, sqft, image, tag }: typeof PROPERTIES[0]) {
  const [hov, setHov] = useState(false);
  const typeLabel = type === "sale" ? "For Sale" : type === "rent" ? "For Rent" : "Commercial";

  return (
    <div
      className="overflow-hidden cursor-pointer"
      style={{
        border: `1px solid ${hov ? "rgba(240,165,0,0.38)" : "rgba(255,255,255,0.06)"}`,
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hov ? "0 24px 64px rgba(0,0,0,0.6)" : "none",
        transition: "all 0.38s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="relative h-[220px] overflow-hidden bg-[#111]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          style={{ transform: hov ? "scale(1.07)" : "scale(1)", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `rgba(0,0,0,${hov ? 0.35 : 0.18})`, transition: "background 0.4s" }}
        />
        <div className="absolute top-4 left-4">
          <span
            className="text-[9px] tracking-[0.2em] uppercase font-bold px-2.5 py-1"
            style={{ background: G, color: DARK }}
          >
            {tag}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span
            className="text-[9px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 text-white"
            style={{
              background: type === "sale" ? "rgba(10,10,10,0.8)"
                : type === "commercial" ? "rgba(20,40,90,0.85)"
                : "rgba(10,50,20,0.85)",
            }}
          >
            {typeLabel}
          </span>
        </div>
      </div>

      <div className="p-6" style={{ background: "#0d0d0d" }}>
        <div className="flex items-center gap-1.5 text-white/35 text-[11px] mb-2.5" style={{ fontFamily: "'Jost', sans-serif" }}>
          <MapPin size={10} />
          {location}
        </div>
        <h3
          className="text-white text-[15px] font-semibold leading-snug mb-5"
          style={{ fontFamily: "'Tenor Sans', serif" }}
        >
          {title}
        </h3>

        <div
          className="flex gap-4 text-white/40 text-[11px] pb-5 mb-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", fontFamily: "'Jost', sans-serif" }}
        >
          {beds !== null && (
            <>
              <span className="flex items-center gap-1.5"><Bed size={11} /> {beds} Beds</span>
              <span className="flex items-center gap-1.5"><Bath size={11} /> {baths} Baths</span>
            </>
          )}
          <span className="flex items-center gap-1.5"><Maximize2 size={11} /> {sqft} m²</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span
              className="text-xl font-bold"
              style={{ color: G, fontFamily: "'Tenor Sans', serif" }}
            >
              {price}
            </span>
            {period && <span className="text-white/38 text-sm ml-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>{period}</span>}
          </div>
          <button
            className="text-[9px] tracking-[0.18em] uppercase font-bold px-4 py-2 transition-all duration-25 0"
            style={{
              border: `1px solid ${G}`,
              color: hov ? DARK : G,
              background: hov ? G : "transparent",
              transition: "all 0.25s",
            }}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ── About / Why Choose Us ──────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-28 px-6 lg:px-10" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <FadeUp>
          <Tag>Why Choose Us</Tag>
          <SectionTitle>
            We Don&apos;t Just Find You A Home.
            <br />
            <span style={{ color: G }}>We Find You Peace of Mind.</span>
          </SectionTitle>
          <p className="text-white/45 mt-6 mb-10 leading-relaxed text-sm max-w-[480px]" style={{ fontFamily: "'Jost', sans-serif" }}>
            At Home Deals Daily, every listing is verified, every agent is trained, and every client receives the care they deserve. We are Rwanda's most trusted real estate partner — built on transparency, expertise, and results.
          </p>

          <div className="space-y-3.5 mb-10">
            {[
              "Trusted & Professional Service",
              "100% Verified Property Listings",
              "Personalised Property Search",
              "Expert Local Market Knowledge",
              "Fast 24-Hour Response Guarantee",
              "Transparent Pricing — No Hidden Fees",
            ].map(item => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ background: G }}>
                  <Check size={11} color={DARK} strokeWidth={3} />
                </div>
                <span className="text-white/65 text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>{item}</span>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/250780367259"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 text-[11px] tracking-[0.16em] uppercase font-bold transition-opacity duration-200 hover:opacity-85"
            style={{ background: G, color: DARK }}
          >
            <Phone size={13} /> Talk to an Expert
          </a>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="relative">
            <div className="overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <img
                src="https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?w=760&h=960&fit=crop&auto=format"
                alt="Modern luxury bedroom interior"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.9)" }}
              />
            </div>

            <div
              className="absolute -bottom-7 -left-7 p-6 hidden md:block"
              style={{ background: "#0d0d0d", border: `1px solid rgba(240,165,0,0.3)`, minWidth: 200 }}
            >
              <div className="text-[2.5rem] font-bold leading-none mb-1" style={{ color: G, fontFamily: "'Tenor Sans', serif" }}>7+</div>
              <div className="text-white text-sm font-semibold mb-0.5">Years of Experience</div>
              <div className="text-white/35 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>Kigali Real Estate Market</div>
            </div>

            <div
              className="absolute -top-5 -right-5 w-16 h-16 hidden md:block"
              style={{ border: `2px solid ${G}`, opacity: 0.35 }}
            />
            <div
              className="absolute -top-10 -right-10 w-16 h-16 hidden md:block"
              style={{ border: `2px solid ${G}`, opacity: 0.15 }}
            />
          </div>
        </FadeUp>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
        {[
          { icon: Shield, label: "Trusted Service", sub: "Every property verified" },
          { icon: Award, label: "Prime Locations", sub: "50+ Kigali districts" },
          { icon: Clock, label: "Fast Response", sub: "24-hour guarantee" },
          { icon: Users, label: "Happy Clients", sub: "300+ satisfied buyers" },
        ].map(({ icon: Icon, label, sub }, i) => (
          <FadeUp key={label} delay={i * 0.08}>
            <div
              className="p-7 text-center group cursor-default"
              style={{ border: "1px solid rgba(255,255,255,0.06)", transition: "border-color 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(240,165,0,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
            >
              <div className="flex justify-center mb-4">
                <Icon size={28} style={{ color: G }} />
              </div>
              <div className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "'Tenor Sans', serif" }}>{label}</div>
              <div className="text-white/38 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>{sub}</div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="py-28 px-6 lg:px-10" style={{ background: "#0c0c0c" }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-16">
          <Tag>Client Stories</Tag>
          <SectionTitle>What Our Clients Say</SectionTitle>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.09}>
              <TestiCard {...t} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestiCard({ name, role, text }: { name: string; role: string; text: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="p-8 h-full flex flex-col"
      style={{
        background: "#111",
        border: `1px solid ${hov ? "rgba(240,165,0,0.28)" : "rgba(255,255,255,0.05)"}`,
        borderTop: `2px solid ${hov ? G : "rgba(240,165,0,0.2)"}`,
        transition: "border-color 0.3s",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => <Star key={i} size={13} fill={G} color={G} />)}
      </div>
      <p
        className="text-white/58 text-sm leading-relaxed italic flex-1 mb-8"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        &ldquo;{text}&rdquo;
      </p>
      <div
        className="flex items-center gap-3 pt-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="w-10 h-10 flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: G, color: DARK, fontFamily: "'Tenor Sans', serif" }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <div className="text-white text-sm font-semibold" style={{ fontFamily: "'Tenor Sans', serif" }}>{name}</div>
          <div className="text-white/35 text-[11px]" style={{ fontFamily: "'Jost', sans-serif" }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "Buy a Property", message: "" });

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi! My name is ${form.name}.\n\nI'm interested in: ${form.interest}\n\nMessage: ${form.message}\n\nContact me at:\nEmail: ${form.email}\nPhone: ${form.phone}`;
    window.open(`https://wa.me/250780367259?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const inputClass = "w-full bg-transparent border text-white px-4 py-3 text-sm outline-none placeholder-white/20 transition-colors duration-200 focus:border-[#F0A500]";
  const inputStyle = { borderColor: "rgba(255,255,255,0.1)", fontFamily: "'Jost', sans-serif" };

  return (
    <section id="contact" className="py-28 px-6 lg:px-10" style={{ background: DARK }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        <FadeUp>
          <Tag>Get In Touch</Tag>
          <SectionTitle>
            Let&apos;s Find Your<br />
            <span style={{ color: G }}>Dream Property</span>
          </SectionTitle>
          <p className="text-white/45 mt-6 mb-12 leading-relaxed text-sm max-w-md" style={{ fontFamily: "'Jost', sans-serif" }}>
            Ready to take the next step? Our Kigali property experts are standing by. Reach out via WhatsApp, email, or the form — we respond within 24 hours.
          </p>

          <div className="space-y-7">
            <a href="tel:+250780367259" className="flex items-center gap-5 group">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: G }}>
                <Phone size={17} color={DARK} />
              </div>
              <div>
                <div className="text-white/35 text-[10px] tracking-[0.22em] uppercase mb-1">Phone / WhatsApp</div>
                <div className="text-white font-semibold group-hover:text-[#F0A500] transition-colors" style={{ fontFamily: "'Tenor Sans', serif" }}>+250 780 367 259</div>
              </div>
            </a>
            <a href="mailto:hhomedealsdaily@gmail.com" className="flex items-center gap-5 group">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ border: `1px solid ${G}` }}>
                <Mail size={17} style={{ color: G }} />
              </div>
              <div>
                <div className="text-white/35 text-[10px] tracking-[0.22em] uppercase mb-1">Email</div>
                <div className="text-white font-semibold group-hover:text-[#F0A500] transition-colors text-sm" style={{ fontFamily: "'Tenor Sans', serif" }}>hhomedealsdaily@gmail.com</div>
              </div>
            </a>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <MapPin size={17} className="text-white/40" />
              </div>
              <div>
                <div className="text-white/35 text-[10px] tracking-[0.22em] uppercase mb-1">Location</div>
                <div className="text-white font-semibold" style={{ fontFamily: "'Tenor Sans', serif" }}>Kigali, Rwanda</div>
              </div>
            </div>
          </div>

          <div className="mt-11 flex gap-3">
            {[
              { label: "Facebook", href: "https://facebook.com/homedeals daily", icon: Facebook },
              { label: "Instagram", href: "https://instagram.com/home.dealsdaily", icon: Instagram },
            ].map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 text-[10px] tracking-[0.18em] uppercase font-semibold transition-all duration-200"
                style={{ border: "1px solid rgba(240,165,0,0.25)", color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = G; (e.currentTarget as HTMLElement).style.color = DARK; (e.currentTarget as HTMLElement).style.borderColor = G; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,165,0,0.25)"; }}
              >
                <Icon size={13} /> {label}
              </a>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.18}>
          <form
            onSubmit={submit}
            className="p-8 space-y-5"
            style={{ background: "#0d0d0d", border: "1px solid rgba(240,165,0,0.18)" }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/38 text-[10px] tracking-[0.22em] uppercase mb-2">Full Name *</label>
                <input type="text" name="name" required value={form.name} onChange={set} placeholder="Your name" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="block text-white/38 text-[10px] tracking-[0.22em] uppercase mb-2">Phone</label>
                <input type="tel" name="phone" value={form.phone} onChange={set} placeholder="+250 ..." className={inputClass} style={inputStyle} />
              </div>
            </div>
            <div>
              <label className="block text-white/38 text-[10px] tracking-[0.22em] uppercase mb-2">Email</label>
              <input type="email" name="email" value={form.email} onChange={set} placeholder="your@email.com" className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="block text-white/38 text-[10px] tracking-[0.22em] uppercase mb-2">I&apos;m Interested In</label>
              <select
                name="interest"
                value={form.interest}
                onChange={set}
                className="w-full border text-white px-4 py-3 text-sm outline-none focus:border-[#F0A500] transition-colors duration-200 appearance-none cursor-pointer"
                style={{ background: "#111", borderColor: "rgba(255,255,255,0.1)", fontFamily: "'Jost', sans-serif" }}
              >
                {["Buy a Property", "Rent a Property", "Sell My Property", "Property Investment", "Property Management", "Airbnb Management", "Real Estate Consultation"].map(o => (
                  <option key={o} value={o} style={{ background: "#111" }}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/38 text-[10px] tracking-[0.22em] uppercase mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={set}
                rows={4}
                placeholder="Tell us what you're looking for — location, budget, requirements..."
                className={`${inputClass} resize-none`}
                style={inputStyle}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 text-[11px] tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2.5 transition-opacity duration-200 hover:opacity-88"
              style={{ background: G, color: DARK }}
            >
              <Phone size={13} /> Send via WhatsApp
            </button>
            <p className="text-white/22 text-[11px] text-center" style={{ fontFamily: "'Jost', sans-serif" }}>
              Your message will open in WhatsApp · +250 780 367 259
            </p>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ background: "#050505", borderTop: `1px solid rgba(240,165,0,0.1)` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <ImageWithFallback
                src={logoImg}
                alt="Home Deals Daily logo"
                className="w-13 h-13 rounded-full object-cover"
                style={{ width: 52, height: 52 }}
              />
              <div>
                <div className="text-white font-bold text-[17px] leading-none">
                  Home<span style={{ color: G }}>Deals</span>Daily
                </div>
                <div className="text-white/30 text-[9px] tracking-[0.24em] uppercase mt-1">Your Trusted Real Estate Partner</div>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-sm mb-6" style={{ fontFamily: "'Jost', sans-serif" }}>
              Quality Properties. Affordable Prices. Trusted Service. Serving Kigali and all of Rwanda — finding you the right home, every time.
            </p>
            <div className="flex gap-2.5">
              {[
                { href: "https://facebook.com/homedealsdaily", icon: Facebook },
                { href: "https://instagram.com/home.dealsdaily", icon: Instagram },
              ].map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center text-white/35 transition-all duration-200"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = G; (e.currentTarget as HTMLElement).style.color = G; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-white text-[10px] tracking-[0.24em] uppercase mb-5 font-semibold" style={{ color: G }}>Services</div>
            <ul className="space-y-3" style={{ fontFamily: "'Jost', sans-serif" }}>
              {["Apartments for Rent", "Houses & Villas", "Property Sales", "Commercial Spaces", "Property Management", "Airbnb Management"].map(s => (
                <li key={s}>
                  <a href="#services" className="text-white/38 text-sm hover:text-white transition-colors duration-200">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-[10px] tracking-[0.24em] uppercase mb-5 font-semibold" style={{ color: G }}>Contact</div>
            <div className="space-y-4" style={{ fontFamily: "'Jost', sans-serif" }}>
              <div className="flex items-center gap-3 text-white/38 text-sm">
                <Phone size={13} style={{ color: G, flexShrink: 0 }} />
                <a href="tel:+250780367259" className="hover:text-white transition-colors">+250 780 367 259</a>
              </div>
              <div className="flex items-center gap-3 text-white/38 text-sm">
                <Mail size={13} style={{ color: G, flexShrink: 0 }} />
                <a href="mailto:hhomedealsdaily@gmail.com" className="hover:text-white transition-colors break-all">hhomedealsdaily@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-white/38 text-sm">
                <MapPin size={13} style={{ color: G, flexShrink: 0 }} />
                <span>Kigali, Rwanda</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/250780367259"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.16em] uppercase font-bold transition-opacity hover:opacity-85"
                  style={{ background: G, color: DARK }}
                >
                  <Phone size={11} /> WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span className="text-white/22 text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
            © {new Date().getFullYear()} Home Deals Daily. All rights reserved. Kigali, Rwanda.
          </span>
          <button
            onClick={scrollTop}
            className="w-9 h-9 flex items-center justify-center text-white/35 transition-all duration-200 hover:text-black"
            style={{ border: "1px solid rgba(240,165,0,0.25)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = G; (e.currentTarget as HTMLElement).style.borderColor = G; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,165,0,0.25)"; }}
            aria-label="Back to top"
          >
            <ChevronUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: DARK, fontFamily: "'Jost', sans-serif", color: "#F5F5F0" }}>
      <style>{`
        @keyframes hdd-ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #F0A500; border-radius: 0; }
        ::selection { background: rgba(240,165,0,0.25); color: #F5F5F0; }
        input:-webkit-autofill,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #111 inset;
          -webkit-text-fill-color: #F5F5F0;
        }
      `}</style>
      <Nav />
      <Hero />
      <Ticker />
      <Services />
      <StatsSection />
      <Properties />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
