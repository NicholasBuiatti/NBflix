/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colori di base
        lightBackground: '#ffffff',        // Sfondi chiari
        lightText: '#333333',              // Testo in modalità chiara
        darkBackground: '#1f2937',         // Sfondi scuri (leggermente più chiaro di gray-900 per contrasto)
        darkText: '#ffffff',               // Testo in modalità scura

        // Colori primari e accento
        primary: '#3b82f6',                // Blu (per bottoni primari e link)
        primaryDark: '#1e40af',            // Blu scuro per modalità dark (hover e attivi)
        accent: '#f97316',                 // Arancio (per evidenziare azioni importanti)
        accentDark: '#ea580c',             // Arancio scuro per modalità dark

        // Stati di sistema
        success: '#22c55e',                // Verde per messaggi di successo
        warning: '#facc15',                // Giallo per avvisi
        error: '#ef4444',                  // Rosso per errori

        // Backgrounds per elementi secondari o di contrasto
        cardBackground: '#f3f4f6',         // Grigio chiaro per card (modalità chiara)
        cardBackgroundDark: '#374151',     // Grigio scuro per card (modalità scura)
        borderLight: '#d1d5db',            // Bordo chiaro per card, input, e bottoni
        borderDark: '#4b5563',             // Bordo scuro per modalità dark

        // Hover e focus
        hoverPrimary: '#60a5fa',           // Hover su bottoni primari
        hoverAccent: '#fb923c',            // Hover su colori di accento
      }
    },
  },
  plugins: [],
}