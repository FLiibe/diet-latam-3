import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "¿Para quién es este material?",
      answer: "Este material está diseñado especialmente para acupunturistas, nutricionistas, terapeutas corporales, fisioterapeutas, médicos y todos los profesionales o estudiantes del área de la salud que deseen aplicar los conceptos prácticos de la Dietoterapia China en sus consultas para potenciar el resultado de sus tratamientos de forma rápida, segura y natural.",
    },
    {
      question: "¿Necesito dominar previamente la Medicina China?",
      answer: "¡No! El material ha sido estructurado de una manera sumamente didáctica y accesible, partiendo desde los conceptos básicos de la MTC (como el Qi, Yin/Yang y las sustancias fundamentales) hasta llegar a la aplicación clínica práctica. Incluso si estás empezando desde cero, podrás aplicar estas pautas con total seguridad en tu día a día.",
    },
    {
      question: "¿Cómo recibo el material?",
      answer: "El acceso es totalmente digital e inmediato. Tan pronto como se confirme el pago, recibirás un correo electrónico de confirmación con el enlace para acceder a los archivos.",
    },
    {
      question: "¿El acceso expira?",
      answer: "No, tu acceso es vitalicio y permanente. Podrás descargar todos los archivos de manera local y consultarlos tantas veces como lo necesites, en cualquier momento y lugar, sin ningún tipo de límite de tiempo o cuotas adicionales.",
    },
    {
      question: "¿Puedo acceder desde mi celular?",
      answer: "¡Sí! Todo el contenido está diseñado y optimizado en formato digital PDF interactivo de alta definición, lo que significa que se adapta de forma impecable para su lectura cómoda en teléfonos inteligentes (iOS y Android), tabletas, computadoras portátiles o de escritorio.",
    },
    {
      question: "¿Y si por alguna razón no me gusta o no es lo que esperaba?",
      answer: "Estamos tan seguros de la calidad de este material que te ofrecemos una garantía incondicional de satisfacción de 7 días. Si accedes al contenido y consideras que no aporta valor a tu práctica profesional, puedes solicitar el reembolso del 100% de tu dinero directamente desde Hotmart de manera rápida y sin complicaciones.",
    },
    {
      question: "¿Hay algún tipo de soporte o resolución de dudas?",
      answer: "¡Por supuesto! Ofrecemos un canal exclusivo de soporte técnico a través de correo electrónico donde un miembro de nuestro equipo te ayudará de forma prioritaria en caso de que tengas cualquier dificultad para descargar o visualizar tus archivos.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3 px-4" id="faq-accordion-group">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-sand-dark/60 overflow-hidden shadow-sm transition-all duration-300"
            id={`faq-item-${idx}`}
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-sand-light transition-colors duration-200"
              aria-expanded={isOpen}
              id={`faq-toggle-${idx}`}
            >
              <span className="font-serif text-sm md:text-base font-semibold text-forest-dark leading-tight">
                {faq.question}
              </span>
              <span className="text-gold-medium shrink-0">
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>

            {/* Dynamic collapse answer */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[500px] border-t border-sand-medium opacity-100 py-4 px-5" : "max-h-0 opacity-0 overflow-hidden"
              } bg-sand-light/30`}
              id={`faq-content-${idx}`}
            >
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-sans">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
