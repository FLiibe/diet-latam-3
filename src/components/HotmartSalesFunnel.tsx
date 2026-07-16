import { useEffect, useRef } from "react";

declare global {
  interface Window {
    checkoutElements?: {
      init: (type: string) => {
        mount: (selector: string) => void;
      };
    };
  }
}

export default function HotmartSalesFunnel() {
  const initialized = useRef(false);

  useEffect(() => {
    // If we've already initialized in this mount, do nothing
    if (initialized.current) return;

    const loadAndInitWidget = () => {
      try {
        if (window.checkoutElements) {
          window.checkoutElements.init("salesFunnel").mount("#hotmart-sales-funnel");
          initialized.current = true;
        }
      } catch (err) {
        console.error("Error initializing Hotmart Sales Funnel:", err);
      }
    };

    // If script is already loaded and checkoutElements is available, initialize immediately
    if (window.checkoutElements) {
      loadAndInitWidget();
      return;
    }

    // Check if script is already present in document
    const scriptId = "hotmart-checkout-elements-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://checkout.hotmart.com/lib/hotmart-checkout-elements.js";
      script.async = true;
      script.onload = () => {
        loadAndInitWidget();
      };
      document.body.appendChild(script);
    } else {
      // Script exists but is still loading, wait until window.checkoutElements becomes available
      const checkInterval = setInterval(() => {
        if (window.checkoutElements) {
          clearInterval(checkInterval);
          loadAndInitWidget();
        }
      }, 100);

      return () => clearInterval(checkInterval);
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto my-4" id="hotmart-sales-funnel-container">
      <div 
        id="hotmart-sales-funnel" 
        className="w-full min-h-[300px] bg-white rounded-3xl p-4 border border-sand-dark shadow-xs flex items-center justify-center"
      >
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm text-gray-500 font-medium">Cargando pago seguro...</p>
        </div>
      </div>
    </div>
  );
}
