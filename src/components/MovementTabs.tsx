import React, { useState } from "react";
import { Leaf, Flame, Mountain, Wind, Droplet, CheckCircle } from "lucide-react";

interface ElementDetail {
  name: string;
  color: string;
  bgCircle: string;
  textColor: string;
  icon: React.ReactNode;
  organs: string;
  taste: string;
  foods: string[];
  emotion: string;
}

export default function MovementTabs() {
  const [activeElement, setActiveElement] = useState<number>(0);

  const elements: ElementDetail[] = [
    {
      name: "Madera (Mu)",
      color: "bg-emerald-800 text-white",
      bgCircle: "bg-emerald-100 border-emerald-500 text-emerald-800",
      textColor: "text-emerald-800",
      icon: <Leaf className="w-6 h-6" />,
      organs: "Hígado y Vesícula Biliar",
      taste: "Ácido (Astringe y retiene líquidos)",
      foods: ["Espinacas", "Limón", "Manzana verde", "Té verde", "Brócoli"],
      emotion: "Ira / Decisión",
    },
    {
      name: "Fuego (Huo)",
      color: "bg-red-700 text-white",
      bgCircle: "bg-red-100 border-red-500 text-red-700",
      textColor: "text-red-700",
      icon: <Flame className="w-6 h-6" />,
      organs: "Corazón e Intestino Delgado",
      taste: "Amargo (Purga y drena el calor)",
      foods: ["Pimiento rojo", "Cacao", "Café", "Rúcula", "Té negro"],
      emotion: "Alegría / Impulsividad",
    },
    {
      name: "Tierra (Tu)",
      color: "bg-amber-600 text-white",
      bgCircle: "bg-amber-100 border-amber-500 text-amber-700",
      textColor: "text-amber-800",
      icon: <Mountain className="w-6 h-6" />,
      organs: "Bazo y Estómago",
      taste: "Dulce (Nutre, tonifica y armoniza)",
      foods: ["Calabaza", "Camote", "Zanahoria", "Mijo", "Miel"],
      emotion: "Preocupación / Reflexión",
    },
    {
      name: "Metal (Jin)",
      color: "bg-stone-600 text-white",
      bgCircle: "bg-stone-100 border-stone-400 text-stone-700",
      textColor: "text-stone-800",
      icon: <Wind className="w-6 h-6" />,
      organs: "Pulmón e Intestino Grueso",
      taste: "Picante (Dispersa y moviliza el Qi)",
      foods: ["Jengibre", "Ajo", "Cebolla", "Rábano", "Pimienta"],
      emotion: "Tristeza / Desapego",
    },
    {
      name: "Agua (Shui)",
      color: "bg-sky-900 text-white",
      bgCircle: "bg-sky-100 border-sky-600 text-sky-800",
      textColor: "text-sky-900",
      icon: <Droplet className="w-6 h-6" />,
      organs: "Riñón y Vejiga",
      taste: "Salado (Suaviza durezas y drena hacia abajo)",
      foods: ["Algas marinas", "Sésamo negro", "Frijol negro", "Pescado", "Miso"],
      emotion: "Miedo / Voluntad",
    },
  ];

  const learnings = [
    {
      num: "01",
      text: "Recomienda con precisión clasificando los alimentos según su naturaleza térmica y sus cinco sabores primarios.",
    },
    {
      num: "02",
      text: "Equilibra las funciones orgánicas vinculando de forma instantánea cada alimento con su elemento correspondiente.",
    },
    {
      num: "03",
      text: "Resuelve dudas rápido identificando al instante los alimentos ideales para cada síndrome energético.",
    },
    {
      num: "04",
      text: "Evita errores clínicos descartando alimentos que puedan agravar el desequilibrio de tu paciente.",
    },
    {
      num: "05",
      text: "Mejora tus resultados terapéuticos creando pautas sencillas y fáciles de aplicar en el día a día.",
    },
    {
      num: "06",
      text: "Incrementa la adherencia del paciente usando explicaciones claras, lógicas y sin tecnicismos.",
    },
    {
      num: "07",
      text: "Acelera los efectos de la acupuntura combinándola estratégicamente con la alimentación indicada.",
    },
    {
      num: "08",
      text: "Previene desequilibrios estacionales ajustando la dieta según la época del año de forma lógica.",
    },
    {
      num: "09",
      text: "Logra cambios profundos usando recetas terapéuticas listas para nutrir Sangre, Qi, Yin o Yang.",
    },
    {
      num: "10",
      text: "Dibuja tu valor diferenciador y eleva el prestigio de tu consulta aplicando Dietoterapia seria.",
    },
  ];

  return (
    <div className="w-full">
      {/* Five Movement Badges Grid */}
      <div className="grid grid-cols-5 gap-3 md:gap-4 max-w-4xl mx-auto mb-8" id="movement-elements-grid">
        {elements.map((el, idx) => {
          const isActive = idx === activeElement;
          return (
            <button
              key={idx}
              onClick={() => setActiveElement(idx)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${
                isActive
                  ? "bg-white border-gold-medium shadow-md scale-105"
                  : "bg-white/50 border-sand-dark hover:bg-white hover:border-gold-light"
              }`}
              id={`movement-btn-${idx}`}
            >
              {/* Colored Circular Icon Badge */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-transform duration-300 ${
                  isActive ? "scale-110" : ""
                } ${el.bgCircle}`}
              >
                {el.icon}
              </div>
              <span className="text-[11px] md:text-sm font-serif font-semibold tracking-wide text-forest-dark uppercase">
                {el.name.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Element Correlation Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-sand-dark p-6 mb-12 shadow-sm transition-all duration-500" id="active-element-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-sand-medium pb-4 mb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${elements[activeElement].bgCircle}`}>
              {elements[activeElement].icon}
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-forest-dark">
                Elemento {elements[activeElement].name}
              </h4>
              <p className="text-xs text-gold-dark font-mono uppercase tracking-wider">
                Relación con Órganos: {elements[activeElement].organs}
              </p>
            </div>
          </div>
          <div className="flex gap-4 text-xs font-mono bg-sand-medium/50 px-4 py-2 rounded-lg">
            <div>
              <span className="text-gray-500 block">Sabor Asoc.</span>
              <span className="font-semibold text-forest-dark">{elements[activeElement].taste.split(" ")[0]}</span>
            </div>
            <div className="border-l border-sand-dark pl-4">
              <span className="text-gray-500 block">Emoción Primaria</span>
              <span className="font-semibold text-forest-dark">{elements[activeElement].emotion}</span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-xs font-semibold text-forest-medium uppercase tracking-wider mb-2">
            Alimentos Terapéuticos Recomendados:
          </h5>
          <div className="flex flex-wrap gap-2">
            {elements[activeElement].foods.map((food, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 bg-sand-light text-forest-dark border border-sand-medium rounded-full font-medium"
              >
                🌱 {food}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 italic">
            * Haz clic en los otros elementos arriba para conocer sus correspondencias y alimentos clave de sanación.
          </p>
        </div>
      </div>

      {/* 10 Clinical Learnings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto" id="clinical-learnings-grid">
        {learnings.map((learn, idx) => (
          <div
            key={idx}
            className="flex gap-4 items-start p-5 bg-white border border-sand-dark/60 rounded-xl hover:shadow-md transition-shadow duration-300"
            id={`learning-card-${idx}`}
          >
            <span className="font-serif text-xl font-bold text-gold-medium tracking-tight">
              {learn.num}
            </span>
            <p className="text-sm text-gray-700 leading-relaxed">
              {learn.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
