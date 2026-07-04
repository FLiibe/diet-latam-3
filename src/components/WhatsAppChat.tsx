import React from "react";
import { Star } from "lucide-react";

export default function WhatsAppChat() {
  const testimonials = [
    {
      id: 1,
      name: "Sofía Méndez",
      role: "Tratamiento: Fatiga y Distensión",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
      text: "La dieta templada y los caldos de bazo cambiaron mi vida por completo. En solo dos semanas mi digestión mejoró y recuperé mi energía diaria.",
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      role: "Tratamiento: Gastritis Crónica",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
      text: "El dolor de estómago constante desapareció eliminando los lácteos y alimentos fríos. Increíble cómo cosas tan sencillas tienen tanto impacto.",
    },
    {
      id: 3,
      name: "Laura Domínguez",
      role: "Tratamiento: Insomnio y Frío",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
      text: "Gracias a la terapia de alimentos templados pudimos equilibrar mi energía Yang. No solo mejoró mi digestión, sino también la calidad de mi sueño.",
    },
    {
      id: 4,
      name: "Andrés Villalobos",
      role: "Tratamiento: Deficiencia de Qi",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
      text: "La guía estacional ayudó a mi familia a no enfermarse este invierno. Los caldos y tés recomendados son sumamente reconfortantes y eficaces.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4" id="testimonials-cards-grid-new">
      {testimonials.map((t) => (
        <div
          key={t.id}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between relative text-left"
          id={`testimonial-card-${t.id}`}
        >
          {/* Top Row: Stars and Quote icon */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current text-amber-400 stroke-amber-400" />
              ))}
            </div>
            {/* Elegant double quote decorative element */}
            <span className="text-4xl text-gray-200/80 font-serif leading-none select-none">”</span>
          </div>

          {/* Testimonial Text */}
          <p className="text-gray-700 font-sans text-xs md:text-sm leading-relaxed mb-6 italic">
            "{t.text}"
          </p>

          {/* Divider line and user info */}
          <div>
            <div className="border-t border-gray-100 my-4" />
            <div className="flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-100"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-sans text-xs md:text-sm font-bold text-gray-900 leading-tight">
                  {t.name}
                </span>
                <span className="text-[10px] text-gray-500 font-sans leading-tight mt-0.5">
                  {t.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
