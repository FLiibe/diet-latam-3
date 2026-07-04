import React, { useState, useEffect } from "react";
import {
  Check,
  Clock,
  Smartphone,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Download,
  Infinity,
  RefreshCw,
  Monitor,
  Heart,
  Star,
  Lock,
  Wrench,
  AlertCircle,
  X,
  CreditCard
} from "lucide-react";
import AcuLogo from "./components/AcuLogo";
import MovementTabs from "./components/MovementTabs";
import WhatsAppChat from "./components/WhatsAppChat";
import FAQAccordion from "./components/FAQAccordion";

// Import generated book bundle image
const bundleImg = "https://i.ibb.co/SwYFdkpW/Chat-GPT-Image-3-lug-2026-10-57-05.png";

// ============================================================================
// REGION: GEOLOCATION & DYNAMIC CURRENCY ENGINE
// ============================================================================

/**
 * Interface representing localized currency metrics for high-conversion pricing display.
 */
interface CurrencyInfo {
  code: string;
  symbol: string;
  basico: string;
  completo: string;
  basicoOriginal: string;
  completoOriginal: string;
  bono1: string;
  bono2: string;
  bono3: string;
  bono4: string;
  bonosTotal: string;
}

/**
 * Fallback currency configuration (USD) if geolocation cannot resolve the client location.
 */
const defaultCurrency: CurrencyInfo = {
  code: "USD",
  symbol: "$",
  basico: "5",
  completo: "15",
  basicoOriginal: "29",
  completoOriginal: "64",
  bono1: "15",
  bono2: "10",
  bono3: "12",
  bono4: "15",
  bonosTotal: "52"
};

/**
 * Dictionary mapping regional ISO 3166-1 alpha-2 country codes to localized values.
 */
const currencyMap: Record<string, CurrencyInfo> = {
  MX: { code: "MXN", symbol: "$", basico: "95", completo: "285", basicoOriginal: "550", completoOriginal: "1200", bono1: "285", bono2: "190", bono3: "228", bono4: "285", bonosTotal: "988" }, // Mexico
  CO: { code: "COP", symbol: "$", basico: "20.000", completo: "60.000", basicoOriginal: "120.000", completoOriginal: "260.000", bono1: "60.000", bono2: "40.000", bono3: "48.000", bono4: "60.000", bonosTotal: "208.000" }, // Colombia
  CL: { code: "CLP", symbol: "$", basico: "4.700", completo: "14.000", basicoOriginal: "27.000", completoOriginal: "60.000", bono1: "14.000", bono2: "9.300", bono3: "11.000", bono4: "14.000", bonosTotal: "48.300" }, // Chile
  PE: { code: "PEN", symbol: "S/.", basico: "18.5", completo: "55", basicoOriginal: "110", completoOriginal: "240", bono1: "55", bono2: "37", bono3: "44", bono4: "55", bonosTotal: "191" }, // Peru
  AR: { code: "ARS", symbol: "$", basico: "4.500", completo: "13.500", basicoOriginal: "26.000", completoOriginal: "58.000", bono1: "13.500", bono2: "9.000", bono3: "10.800", bono4: "13.500", bonosTotal: "46.800" }, // Argentina
  BR: { code: "BRL", symbol: "R$", basico: "28", completo: "85", basicoOriginal: "160", completoOriginal: "350", bono1: "85", bono2: "56", bono3: "68", bono4: "85", bonosTotal: "294" }, // Brazil
  ES: { code: "EUR", symbol: "€", basico: "5", completo: "15", basicoOriginal: "29", completoOriginal: "64", bono1: "15", bono2: "10", bono3: "12", bono4: "15", bonosTotal: "52" }, // Spain
  UY: { code: "UYU", symbol: "$U", basico: "215", completo: "650", basicoOriginal: "1250", completoOriginal: "2750", bono1: "650", bono2: "430", bono3: "520", bono4: "650", bonosTotal: "2.250" }, // Uruguay
  US: defaultCurrency,
};

/**
 * Dynamic fallback mechanism detecting the client timezone if the API geolocation lookup fails.
 */
const getCountryByTimezone = (): string => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes("Mexico")) return "MX";
    if (tz.includes("Bogota")) return "CO";
    if (tz.includes("Santiago")) return "CL";
    if (tz.includes("Lima")) return "PE";
    if (tz.includes("Argentina") || tz.includes("Buenos_Aires")) return "AR";
    if (tz.includes("Montevideo")) return "UY";
    if (tz.includes("Sao_Paulo") || tz.includes("Rio_de_Janeiro") || tz.includes("Recife") || tz.includes("Manaus")) return "BR";
    if (tz.includes("Madrid")) return "ES";
  } catch (e) {
    // Graceful error isolation
  }
  return "US";
};

export default function App() {
  // --- STATE DECLARATIONS ---
  
  // Localized currency and pricing configuration
  const [currency, setCurrency] = useState<CurrencyInfo>(() => {
    const initialCountry = getCountryByTimezone();
    return currencyMap[initialCountry] || defaultCurrency;
  });

  // Dynamic API lookup for accurate IP Geolocation mapping
  useEffect(() => {
    fetch("https://ipwho.is/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch country from IP");
        return res.json();
      })
      .then((data) => {
        const country = data.country_code;
        if (country && currencyMap[country]) {
          setCurrency(currencyMap[country]);
        }
      })
      .catch((err) => {
        // Soft fallback to timezone is normal and expected when browser is sandboxed or using tracking protection
        console.debug("IP Geolocation fallback to Timezone detection:", err.message || err);
      });
  }, []);

  // Live countdown timer state (starting from 10 minutes, 51 seconds like the original screenshot)
  const [timeLeft, setTimeLeft] = useState(651); // 10 minutes * 60 + 51 = 651 seconds
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"form" | "success">("form");
  const [selectedPlan, setSelectedPlan] = useState<"basico" | "completo">("completo");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 651)); // Loop for demo purposes
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail) return;
    setCheckoutStep("success");
    if (selectedPlan === "basico") {
      window.open("https://pay.hotmart.com/P106596280S", "_blank");
    } else {
      window.open("https://pay.hotmart.com/O106596188M", "_blank");
    }
  };

  const handleResetCheckout = () => {
    setShowCheckoutModal(false);
    setCheckoutStep("form");
    setUserName("");
    setUserEmail("");
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-sand-light antialiased font-sans text-gray-800">
      
      {/* 1. TOP TIMER BANNER (Dark Green Bar) */}
      <div className="bg-[#09261a] text-white text-[11px] md:text-xs py-2 px-4 text-center font-mono flex items-center justify-center gap-2 select-none shadow-sm sticky top-0 z-40">
        <span className="inline-block animate-pulse text-gold-medium font-bold">⚠️</span>
        <span className="font-sans font-medium tracking-wide">
          Esta oferta exclusiva caducará pronto
        </span>
        <span className="mx-1">•</span>
        <span className="font-bold text-gold-medium tracking-widest bg-black/30 px-2 py-0.5 rounded">
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col items-center justify-center mb-6 mt-2">
          <AcuLogo size="sm" />
        </header>

        {/* 2. HERO / PRESENTATION SECTION */}
        <section className="text-center max-w-4xl mx-auto mb-12" id="hero-section">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-medium border border-gold-light/30 text-[9px] md:text-[10px] tracking-[0.15em] font-medium text-forest-medium uppercase mb-4 select-none shadow-xs">
            <span>🍃</span> ALIMENTA TU QI • TRANSFORMA VIDAS
          </div>

          {/* Main Display Heading */}
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-forest-dark tracking-tight leading-[1.15] mb-6 font-medium">
            Aprende a aplicar la{" "}
            <span className="text-gold-dark italic font-semibold">Dietoterapia China</span>
            <br />
            para tratar a tus pacientes
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Obtén acceso a pautas clínicas prácticas para tratar e indicar alimentos de acuerdo con el diagnóstico energético y potenciar al máximo los resultados de tus consultantes de forma natural.
          </p>

          {/* Main Book Mockup Image */}
          <div className="relative max-w-xl mx-auto mb-10 group rounded-2xl overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-[1.01]" id="book-mockup-wrapper">
            <img
              src={bundleImg}
              alt="Manual Completo de Dietoterapia China y Bonos de consulta"
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Soft decorative shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* CTA Button 1 */}
          <button
            onClick={() => scrollToSection("plan-completo-card")}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#113827] hover:bg-[#1a4b35] text-white font-semibold text-sm md:text-base tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-forest-dark/20 cursor-pointer group"
            id="hero-cta-btn"
          >
            Quiero obtener acceso ahora
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-gray-500 font-medium" id="trust-badges-bar">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4.5 h-4.5 text-gold-medium" />
              <span>Garantía de 7 días</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-sand-dark hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-4.5 h-4.5 text-gold-medium" />
              <span>Acceso de por vida</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-sand-dark hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4.5 h-4.5 text-gold-medium" />
              <span>En cualquier dispositivo</span>
            </div>
          </div>
        </section>

      </div>

      {/* 3. "Este material es para ti si..." SECTION (Deep Forest Green Background) */}
      <section className="bg-[#113827] text-white py-16 md:py-20 shadow-inner" id="who-is-it-for-section">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gold-light tracking-tight font-medium mb-3">
              Este material es para ti si...
            </h3>
            <p className="text-xs md:text-sm text-sand-dark/80 tracking-wide uppercase font-mono max-w-2xl mx-auto">
              Profesionales que buscan transformar la teoría en una práctica clínica real y efectiva.
            </p>
          </div>

          {/* Grid of 8 Pain points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12" id="pain-points-grid">
            
            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                Ya has estudiado Medicina China, pero aún sientes inseguridad para orientar a tus pacientes en su alimentación en el día a día.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                No tienes claro exactamente qué alimentos específicos indicar para cada síndrome energético o desequilibrio orgánico.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                Te cuesta trabajo traducir la teoría abstracta en pautas alimentarias y direccionamientos clínicos sencillos y objetivos.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                Deseas agregar un valor real y diferenciado a tus consultas presenciales u online para destacar en tu especialidad.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                Quieres entregar planes de acción sumamente prácticos, naturales y totalmente personalizados para cada uno de tus pacientes.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                Buscas posicionarte y destacarte en tu área de salud como un terapeuta holístico mucho más completo y de alto nivel.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                Quieres aumentar considerablemente el apego y la constancia de tus tratamientos, acelerando la recuperación de tus pacientes.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                Buscas un material de consulta sumamente rápido, visual y bien estructurado para tener de apoyo durante tus consultas clínicas diarias.
              </p>
            </div>

          </div>

          {/* CTA Button 2 (Orange/Gold Button) */}
          <div className="text-center">
            <button
              onClick={() => scrollToSection("plan-completo-card")}
              className="inline-flex items-center justify-center px-8 py-4.5 rounded-full bg-[#c59f5b] hover:bg-[#dfc28d] text-forest-dark font-bold text-xs md:text-sm tracking-wide uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              id="pain-points-cta-btn"
            >
              Quiero acceder ahora
              <span className="ml-2 font-mono">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. "Los Cinco Elementos" & Grid Section (Light Beige/Sand Background) */}
      <section className="py-16 md:py-20 px-6 bg-sand-medium/60" id="five-movements-section">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-10">
            <span className="text-[10.5px] md:text-xs font-mono tracking-[0.3em] uppercase text-gold-dark font-semibold">
              Lo que vas a aprender
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight leading-tight mt-2 font-medium">
              Los Cinco Elementos aplicados a la clínica diaria
            </h3>
          </div>

          {/* Interactive Elements Tabs & clinical grid (reusable customized component) */}
          <MovementTabs />

        </div>
      </section>

      {/* 5. "Contenido dentro del manual" SECTION */}
      <section className="py-16 md:py-20 px-6 bg-white border-y border-sand-dark/40" id="guide-contents-section">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight font-medium">
              Qué encontrarás dentro del manual
            </h3>
          </div>

          {/* Elegant 5 numbered cards list */}
          <div className="space-y-4" id="guide-contents-list">
            
            <div className="flex flex-col sm:flex-row items-start gap-4 p-6 rounded-xl bg-sand-light border border-sand-dark/50 hover:border-gold-medium/60 transition-colors duration-300 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#113827] text-white flex items-center justify-center font-bold text-sm shrink-0 font-mono">
                1
              </div>
              <div>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-1">
                  Fundamentos de la Dietoterapia China
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Comprende de forma clara y lógica los principios bioenergéticos que rigen la acción terapéutica de los alimentos comunes en el cuerpo humano.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 p-6 rounded-xl bg-sand-light border border-sand-dark/50 hover:border-gold-medium/60 transition-colors duration-300 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#113827] text-white flex items-center justify-center font-bold text-sm shrink-0 font-mono">
                2
              </div>
              <div>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-1">
                  Los Cinco Elementos, Sabores y Naturaleza Térmica
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Aprende a clasificar y seleccionar alimentos con coherencia clínica en base a las 5 naturalezas térmicas, los 5 sabores tradicionales y su tropismo de canal.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 p-6 rounded-xl bg-sand-light border border-sand-dark/50 hover:border-gold-medium/60 transition-colors duration-300 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#113827] text-white flex items-center justify-center font-bold text-sm shrink-0 font-mono">
                3
              </div>
              <div>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-1">
                  Diagnóstico Energético y Orientación Dietética
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Descubre cómo transformar un diagnóstico tradicional de MTC (Deficiencias, Excesos, Calor, Frío, Estancamientos) en recomendaciones alimentarias sumamente objetivas y sencillas.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 p-6 rounded-xl bg-sand-light border border-sand-dark/50 hover:border-gold-medium/60 transition-colors duration-300 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#113827] text-white flex items-center justify-center font-bold text-sm shrink-0 font-mono">
                4
              </div>
              <div>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-1">
                  Recetas Terapéuticas y Casos Clínicos
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Accede a protocolos listos e indicaciones terapéuticas ya formuladas para un uso e indicación inmediatos dentro de tu consulta profesional.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 p-6 rounded-xl bg-sand-light border border-sand-dark/50 hover:border-gold-medium/60 transition-colors duration-300 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#113827] text-white flex items-center justify-center font-bold text-sm shrink-0 font-mono">
                5
              </div>
              <div>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-1">
                  Planificación y Orientación Práctica al Paciente
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Modelos prácticos y guías rápidas listas para imprimir que facilitan enormemente el apego, la comprensión y los resultados terapéuticos de tus consultantes.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. "Lo que dicen los profesionales" SECTION */}
      <section className="py-16 md:py-20 px-6 bg-sand-light" id="testimonials-section">
        <div className="max-w-5xl mx-auto">
          
          {/* 7. Patients Feed Section */}
          <div className="pt-4" id="whatsapp-feed-container">
            <div className="text-center mb-12">
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight font-medium mb-3">
                Mira lo que están diciendo los pacientes tratados con Dietoterapia China
              </h3>
              <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto">
                Mensajes reales de pacientes reales que experimentaron los cambios clínicos en su alimentación guiada.
              </p>
            </div>

            {/* Interactive Chat Screens Component */}
            <WhatsAppChat />

            {/* CTA Button 3 (Dark green button) */}
            <div className="text-center mt-12">
              <button
                onClick={() => scrollToSection("plan-completo-card")}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#113827] hover:bg-[#1b4b35] text-white font-semibold text-sm tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                id="whatsapp-cta-btn"
              >
                Quiero obtener acceso ahora
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 8. BONOS EXCLUSIVOS SECTION */}
      <section className="py-16 md:py-20 px-6 bg-sand-medium/40 border-t border-sand-dark/60" id="bonuses-section">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-[0.25em] text-gold-dark font-semibold bg-white px-3 py-1 rounded-full border border-sand-dark/80">
              BONOS EXCLUSIVOS
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight leading-tight mt-4 font-medium">
              Además, recibirás estos obsequios de inmediato
            </h3>
          </div>

          {/* 4 Bonus Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="bonuses-cards-grid">
            
            {/* Bono 1 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bono 1
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Tarjetas de Consulta Rápida:<br />Síndromes y Alimentos
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Tarjetas en formato digital listas para imprimir (tamaño A6) con las principales síndromes clínicos de la MTC y la lista simplificada de sus alimentos indicados y contraindicados.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Valor individual:</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono1} {currency.code}</span>
              </div>
            </div>

            {/* Bono 2 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bono 2
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Guía de Recetas Terapéuticas de la Medicina China
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Recetario práctico en PDF con sopas reconstituyentes, caldos medicinales y tés curativos estructurados para nutrir la Sangre, tonificar el Qi, templar el frío o drenar la humedad.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Valor individual:</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono2} {currency.code}</span>
              </div>
            </div>

            {/* Bono 3 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bono 3
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Calendario Estacional de Alimentación según los Cinco Movimientos
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Guía completa temporada por temporada que te indica exactamente qué alimentos priorizar y cuáles evitar para armonizar el Qi de los órganos correspondientes (Hígado en primavera, Corazón en verano, etc.) y mantener la salud de tus pacientes en sintonía con la naturaleza.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Valor individual:</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono3} {currency.code}</span>
              </div>
            </div>

            {/* Bono 4 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bono 4
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Plantillas de Anamnesis y Seguimiento Nutricional Energético
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Esquemas prácticos y fichas profesionales listas para descargar e imprimir en tu estudio o consultorio. Agilizan el registro clínico del diagnóstico tradicional por lengua, pulso, hábitos alimentarios y la evolución del tratamiento bioenergético de tus pacientes.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Valor individual:</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono4} {currency.code}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. DEEP GREEN INVESTMENT PRICING SECTION */}
      <section className="bg-[#113827] text-white py-16 md:py-24 px-6 shadow-inner relative overflow-hidden" id="pricing-section">
        
        {/* Soft elegant background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-medium/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-forest-light/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <span className="inline-block bg-[#09261a] border border-gold-medium/40 text-gold-light text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] px-4 py-1.5 rounded-full mb-4 shadow-xs">
              🔥 CONDICIONES EXCLUSIVAS DE LANZAMIENTO
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gold-light tracking-tight font-medium leading-tight">
              Elige el plan ideal para tu práctica profesional
            </h3>
            <p className="text-xs md:text-sm text-sand-dark/80 mt-3 max-w-xl mx-auto font-sans">
              Únete a cientos de terapeutas y profesionales de la salud que ya están transformando la vida de sus pacientes con la Dietoterapia Tradicional China.
            </p>
          </div>

          {/* Pricing cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-4xl mx-auto px-2 md:px-0" id="pricing-plans-grid">
            
            {/* PLAN BÁSICO CARD */}
            <div className="bg-[#0c2a1d] rounded-3xl border border-forest-light/40 p-6 md:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-forest-light/70 text-left relative" id="plan-basico-card">
              
              <div>
                {/* Header Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071c14] border border-forest-light/25 text-[10px] tracking-widest font-bold text-gold-medium uppercase mb-6">
                  <span>⭐</span> PLAN BÁSICO
                </div>

                {/* Prices */}
                <div className="mb-6 flex flex-col items-start" id="price-stack-basico">
                  {/* Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#0d3422] text-emerald-400 text-[10px] font-bold tracking-wider mb-2 uppercase border border-emerald-500/20">
                    Ahorras más del 80%
                  </div>
                  {/* Original Price */}
                  <span className="text-xl font-bold text-red-500 line-through tracking-tight mb-1">
                    {currency.symbol}{currency.basicoOriginal} {currency.code}
                  </span>
                  {/* Current Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl md:text-6xl font-serif font-black tracking-tight text-white leading-none">
                      {currency.symbol}{currency.basico}
                    </span>
                    {currency.code !== "USD" && (
                      <span className="text-sm font-sans text-sand-dark/60">
                        (~ $5 USD)
                      </span>
                    )}
                  </div>
                  {/* Bottom Label */}
                  <span className="text-xs text-sand-dark/70 mt-2 font-medium tracking-wide">
                    pago único ({currency.code})
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-4 pt-4 border-t border-forest-light/30">
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-sand-light">
                    <span className="text-emerald-500 shrink-0 mt-0.5">✔</span>
                    <span>Manual Completo <strong>"Dietoterapia China"</strong></span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-sand-dark/60 line-through select-none">
                    <span className="text-red-500 shrink-0 mt-0.5">❌</span>
                    <span>Sin bonos exclusivos incluidos en el paquete</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-sand-dark/60 line-through select-none">
                    <span className="text-red-500 shrink-0 mt-0.5">❌</span>
                    <span>Sin actualizaciones futuras gratuitas</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-forest-light/20">
                <a
                  href="https://pay.hotmart.com/P106596280S"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-xl bg-[#09261a] hover:bg-[#113827] border border-forest-light/40 text-gold-medium font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] text-center"
                  id="checkout-plan-basico"
                >
                  Quiero el Plan Básico ➔
                </a>
              </div>

            </div>

            {/* ACESSO COMPLETO CARD (RECOMMENDED) */}
            <div className="bg-white text-gray-800 rounded-3xl border-4 border-gold-medium p-6 md:p-8 flex flex-col justify-between shadow-2xl relative transition-all duration-300 hover:shadow-gold-medium/15 text-left scale-100 lg:scale-[1.03] z-10" id="plan-completo-card">
              
              {/* Recommended Corner Ribbon / Badge */}
              <div className="absolute -top-3.5 right-6 bg-gold-medium text-[#113827] px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-md border border-white">
                <span>🎗</span> RECOMENDADO
              </div>

              <div>
                {/* Header Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] tracking-widest font-extrabold text-emerald-800 uppercase mb-6">
                  <span>⚡</span> ACCESO COMPLETO
                </div>

                {/* Prices */}
                <div className="mb-6 flex flex-col items-start" id="price-stack-completo">
                  {/* Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold tracking-wider mb-2 uppercase border border-emerald-200">
                    Ahorras más del 75%
                  </div>
                  {/* Original Price */}
                  <span className="text-xl font-bold text-red-500 line-through tracking-tight mb-1">
                    {currency.symbol}{currency.completoOriginal} {currency.code}
                  </span>
                  {/* Current Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl md:text-6xl font-serif font-black tracking-tight text-[#113827] leading-none">
                      {currency.symbol}{currency.completo}
                    </span>
                    {currency.code !== "USD" && (
                      <span className="text-sm font-sans text-gray-500">
                        (~ $15 USD)
                      </span>
                    )}
                  </div>
                  {/* Bottom Label */}
                  <span className="text-xs text-gray-500 mt-2 font-medium tracking-wide">
                    pago único ({currency.code})
                  </span>
                </div>


                {/* Features List */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="text-xs font-bold text-forest-dark uppercase tracking-wider mb-2">
                    ✓ TODO LO DEL PLAN BÁSICO Y ADEMÁS:
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                    <span className="text-emerald-600 shrink-0 mt-0.5">✔</span>
                    <span>Acceso <strong>Vitalicio</strong> permanente (descarga para siempre)</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                    <span className="text-emerald-600 shrink-0 mt-0.5">✔</span>
                    <span>Actualizaciones <strong>100% gratis</strong> de por vida</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                    <span className="text-emerald-600 shrink-0 mt-0.5">✔</span>
                    <span>Soporte prioritario de dudas por correo electrónico</span>
                  </div>

                  {/* Inside card box for bonuses */}
                  <div className="bg-emerald-50/60 rounded-2xl border border-emerald-100 p-4 mt-5 text-left">
                    <div className="text-xs font-extrabold text-emerald-900 uppercase tracking-wide mb-3 flex items-center gap-1">
                      <span>🎁</span> 4 BONOS EXCLUSIVOS ({currency.symbol}{currency.bonosTotal} {currency.code}) — 100% GRATIS:
                    </div>
                    <div className="space-y-2.5 text-[11px] md:text-xs text-gray-700">
                      <div className="flex items-start gap-2 text-emerald-950 font-medium">
                        <span className="text-emerald-600 shrink-0">✓</span>
                        <span>1. Tarjetas de Consulta Rápida (Síndromes y Alimentos)</span>
                      </div>
                      <div className="flex items-start gap-2 text-emerald-950 font-medium">
                        <span className="text-emerald-600 shrink-0">✓</span>
                        <span>2. Guía de Recetas de la Medicina Tradicional China</span>
                      </div>
                      <div className="flex items-start gap-2 text-emerald-950 font-medium">
                        <span className="text-emerald-600 shrink-0">✓</span>
                        <span>3. Calendario Estacional según los Cinco Movimientos</span>
                      </div>
                      <div className="flex items-start gap-2 text-emerald-950 font-medium">
                        <span className="text-emerald-600 shrink-0">✓</span>
                        <span>4. Plantillas de Anamnesis y Seguimiento Nutricional</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <a
                  href="https://pay.hotmart.com/O106596188M"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4.5 rounded-xl bg-[#113827] hover:bg-[#1b4b35] text-white font-extrabold text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-emerald-900/10 text-center"
                  id="checkout-plan-completo"
                >
                  Quiero el Acceso Completo ➔
                </a>
              </div>

            </div>

          </div>

          {/* Secure indicator footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-sand-dark/60 font-mono mt-12">
            <span className="flex items-center gap-1">🔒 Pago 100% Seguro y Encriptado</span>
            <span className="hidden sm:inline">•</span>
            <span>Garantía de reembolso de 7 días</span>
          </div>

        </div>
      </section>

      {/* 10. "Lo que recibes de inmediato" SECTION */}
      <section className="py-16 md:py-20 px-6 bg-white" id="immediate-delivery-section">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight font-medium">
              Lo que recibes inmediatamente
            </h3>
          </div>

          {/* 7 Cards Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto" id="benefits-grid">
            
            <div className="p-5 bg-sand-light border border-sand-dark/60 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-gold-medium/10 text-gold-dark rounded-lg shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-xs md:text-sm text-forest-dark mb-1">Manual Completo</h5>
                <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed">
                  Todo lo que necesitas saber para diagnosticar y tratar a tus pacientes con Dietoterapia China tradicional.
                </p>
              </div>
            </div>

            <div className="p-5 bg-sand-light border border-sand-dark/60 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-gold-medium/10 text-gold-dark rounded-lg shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-xs md:text-sm text-forest-dark mb-1">Herramientas Prácticas</h5>
                <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed">
                  Materiales prácticos para agilizar la toma de decisiones y el diagnóstico bioenergético en tu consulta.
                </p>
              </div>
            </div>

            <div className="p-5 bg-sand-light border border-sand-dark/60 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-gold-medium/10 text-gold-dark rounded-lg shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-xs md:text-sm text-forest-dark mb-1">Tarjetas en PDF</h5>
                <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed">
                  Tarjetas de consulta rápida con la clasificación exacta de alimentos por sabor, naturaleza y síndrome.
                </p>
              </div>
            </div>

            <div className="p-5 bg-sand-light border border-sand-dark/60 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-gold-medium/10 text-gold-dark rounded-lg shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-xs md:text-sm text-forest-dark mb-1">Guía de Recetas</h5>
                <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed">
                  Recetas medicinales listas para entregar y recomendar a tus pacientes según su patrón desequilibrado.
                </p>
              </div>
            </div>

            <div className="p-5 bg-sand-light border border-sand-dark/60 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-gold-medium/10 text-gold-dark rounded-lg shrink-0">
                <Infinity className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-xs md:text-sm text-forest-dark mb-1">Acceso de por Vida</h5>
                <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed">
                  Descarga tus archivos y consúltalos de forma permanente siempre que lo requieras, sin vencimientos.
                </p>
              </div>
            </div>

            <div className="p-5 bg-sand-light border border-sand-dark/60 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-gold-medium/10 text-gold-dark rounded-lg shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-xs md:text-sm text-forest-dark mb-1">Actualizaciones Gratis</h5>
                <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed">
                  Recibe futuras adiciones, mejoras y material complementario sin tener que pagar un solo centavo de más.
                </p>
              </div>
            </div>

            <div className="p-5 bg-sand-light border border-sand-dark/60 rounded-xl flex items-start gap-3 lg:col-span-3 lg:max-w-md lg:mx-auto lg:w-full">
              <div className="p-2 bg-gold-medium/10 text-gold-dark rounded-lg shrink-0">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-xs md:text-sm text-forest-dark mb-1">Compatibilidad Total</h5>
                <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed">
                  Estudia cómodamente desde tu celular, tableta, laptop o computadora de escritorio con archivos PDF perfectamente optimizados.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. GARANTÍA INCONDICIONAL SECTION */}
      <section className="py-16 md:py-20 px-6 bg-sand-medium/40 border-y border-sand-dark/50" id="guarantee-section">
        <div className="max-w-3xl mx-auto text-center">
          
          <div className="w-16 h-16 rounded-full bg-[#113827] text-gold-medium flex items-center justify-center mx-auto mb-4 border-2 border-gold-medium/30 shadow">
            <ShieldCheck className="w-9 h-9" />
          </div>

          <span className="text-[10px] font-mono tracking-[0.25em] text-gold-dark font-bold uppercase">
            GARANTÍA INCONDICIONAL
          </span>

          <h3 className="font-serif text-3xl md:text-4xl text-forest-dark tracking-tight leading-tight mt-2 mb-4 font-semibold">
            7 días de garantía total
          </h3>

          <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Puedes adquirir el material ahora mismo con total tranquilidad, explorar todo el contenido detalladamente y, si consideras que no agrega un valor sustancial a tu práctica clínica diaria, solo tienes que solicitar el reembolso en un plazo de 7 días y te devolveremos el 100% de tu dinero de inmediato. Sin letra chica y sin complicaciones. El riesgo corre enteramente por nuestra cuenta.
          </p>

        </div>
      </section>

      {/* 12. PREGUNTAS FRECUENTES (FAQs) SECTION */}
      <section className="py-16 md:py-20 px-6 bg-white" id="faqs-section">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight font-medium">
              Preguntas frecuentes
            </h3>
          </div>

          {/* Collapsible Accordion Component */}
          <FAQAccordion />

        </div>
      </section>

      {/* 13. "Somos AcuAcademy" SECTION (Dark Green Background) */}
      <section className="bg-[#113827] text-white py-16 md:py-20 px-6 text-center" id="about-us-section">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Circular Frame enclosing AcuLogo elements */}
          <div className="bg-white p-6 rounded-2xl border-4 border-gold-medium/30 mb-6 flex items-center justify-center shadow-lg">
            <AcuLogo size="sm" />
          </div>

          <span className="text-[10px] font-mono tracking-[0.3em] text-gold-light uppercase font-bold mb-3">
            SOMOS ACUASALUD ACADEMÍA
          </span>

          <h3 className="font-serif text-2xl md:text-4xl text-gold-light tracking-tight font-medium mb-8 leading-tight max-w-xl">
            Formación seria para profesionales de la Medicina China
          </h3>

          <div className="space-y-4 text-xs md:text-sm text-sand-light/90 max-w-2xl leading-relaxed text-justify sm:text-center" id="about-us-paragraphs">
            <p>
              Somos un canal de contenido educativo de excelencia y una comunidad de terapeutas que vela por la formación ética y rigurosa de los profesionales de la salud.
            </p>
            <p>
              Nuestro principal propósito y misión es decodificar y simplificar el conocimiento ancestral de la Medicina Tradicional China para transformarlo en materiales clínicos sumamente didácticos, prácticos y directamente aplicables a tu consulta del día a día.
            </p>
            <p>
              Diseñamos herramientas de estudio integrales que permiten a los profesionales de la salud sentirse más seguros, confiados y plenamente preparados para diagnosticar y ofrecer consultas de primer nivel.
            </p>
            <p>
              Si deseas profundizar tus conocimientos técnicos y emplear la Medicina China con un nivel superior de estrategia, coherencia y solidez en beneficio de tus pacientes, estás definitivamente en el lugar correcto.
            </p>
          </div>

        </div>
      </section>

      {/* 14. FINAL CTA SECTION (Light Sand Background) */}
      <section className="py-16 md:py-24 px-6 text-center bg-sand-medium/40 border-t border-sand-dark/60" id="final-cta-section">
        <div className="max-w-4xl mx-auto">
          
          <h3 className="font-serif text-3xl md:text-5xl text-forest-dark tracking-tight leading-tight mb-4 font-semibold">
            Comienza hoy mismo a aplicar la<br />Dietoterapia China en tu consulta
          </h3>

          <p className="text-xs md:text-sm text-gray-500 font-mono tracking-wider uppercase mb-8">
            Acceso inmediato • Garantía de 7 días • Sin riesgos para ti
          </p>

          {/* Button */}
          <button
            onClick={() => scrollToSection("plan-completo-card")}
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-gold-medium hover:bg-gold-light text-forest-dark font-bold text-sm md:text-base tracking-wider uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
            id="final-cta-checkout-btn"
          >
            Quiero mi acceso ahora
            <span className="ml-2">→</span>
          </button>

        </div>
      </section>

      {/* 15. FOOTER */}
      <footer className="bg-sand-medium border-t border-sand-dark/60 py-8 px-6 text-center">
        <p className="text-[10px] md:text-xs text-gray-500 font-mono">
          © 2026 AcuSalud Academía • Medicina Tradicional China • Todos los derechos reservados.
        </p>
      </footer>


      {/* INTERACTIVE SIMULATED CHECKOUT MODAL */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-xs" id="checkout-modal">
          <div className="bg-white rounded-2xl border border-sand-dark w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-[#113827] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gold-medium" />
                <h4 className="font-serif text-base font-bold text-white tracking-wide">
                  Confirmación de Acceso
                </h4>
              </div>
              <button
                onClick={handleResetCheckout}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                id="close-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {checkoutStep === "form" ? (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  
                  {/* Summary Box */}
                  <div className="bg-sand-light p-4 rounded-xl border border-sand-dark/70 text-xs space-y-2">
                    <div className="flex justify-between font-semibold text-forest-dark">
                      <span>
                        {selectedPlan === "basico"
                          ? "Plan Básico — Dietoterapia:"
                          : "Acceso Completo — Manual + 4 Bonos:"}
                      </span>
                      <span className="font-mono text-emerald-800 font-bold text-sm flex flex-col items-end">
                        <span>
                          {selectedPlan === "basico" 
                            ? `${currency.symbol}${currency.basico} ${currency.code}` 
                            : `${currency.symbol}${currency.completo} ${currency.code}`}
                        </span>
                        {currency.code !== "USD" && (
                          <span className="text-[10px] text-gray-500 font-normal">
                            (~ {selectedPlan === "basico" ? "$5" : "$15"} USD)
                          </span>
                        )}
                      </span>
                    </div>
                    <p className="text-gray-500 leading-relaxed font-sans text-[11px]">
                      {selectedPlan === "basico"
                        ? "Incluye el manual completo 'Dietoterapia China' en formato PDF."
                        : "Incluye el manual completo (Acceso Vitalicio), actualizaciones gratis permanentes y los 4 bonos prácticos de consulta (tarjetas, recetario, calendario estacional y plantillas de anamnesis)."}
                    </p>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="username-input" className="block text-xs font-semibold text-gray-700">
                      Nombre Completo
                    </label>
                    <input
                      id="username-input"
                      type="text"
                      required
                      placeholder="Ej. María González"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-sand-dark text-sm focus:outline-hidden focus:ring-2 focus:ring-forest-medium/30 focus:border-forest-medium"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="useremail-input" className="block text-xs font-semibold text-gray-700">
                      Correo Electrónico
                    </label>
                    <input
                      id="useremail-input"
                      type="email"
                      required
                      placeholder="Ej. maria@ejemplo.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-sand-dark text-sm focus:outline-hidden focus:ring-2 focus:ring-forest-medium/30 focus:border-forest-medium"
                    />
                  </div>

                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-[11px] text-amber-800 flex gap-2 leading-relaxed">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                    <p>
                      Asegúrate de ingresar un correo válido. El acceso al material digital en PDF se enviará automáticamente de inmediato.
                    </p>
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={handleResetCheckout}
                      className="flex-1 py-2.5 rounded-lg border border-sand-dark text-gray-600 font-semibold text-xs text-center hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-lg bg-[#113827] hover:bg-[#1b4b35] text-white font-semibold text-xs text-center transition-all shadow-md"
                      id="submit-checkout-btn"
                    >
                      Confirmar Acceso
                    </button>
                  </div>

                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h5 className="font-serif text-lg font-bold text-forest-dark">
                      ¡Acceso Confirmado con Éxito!
                    </h5>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">
                      Hola <strong>{userName}</strong>, hemos registrado tu solicitud para el <strong>{selectedPlan === "basico" ? "Plan Básico" : "Acceso Completo"}</strong>. Hemos enviado el manual y tus materiales descargables al correo <strong>{userEmail}</strong>.
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={handleResetCheckout}
                      className="px-6 py-2 rounded-lg bg-[#113827] text-white font-semibold text-xs hover:bg-[#1b4b35] transition-all"
                    >
                      Entendido
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
