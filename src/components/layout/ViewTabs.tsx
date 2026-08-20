import { motion } from "framer-motion";
import { BookOpen, LayoutGrid } from "lucide-react";

export type ViewMode = "dashboard" | "presentation";

/** O `hint` vira tooltip: o nome é trocadilho, então a função de cada aba
 * precisa estar escrita em algum lugar pra quem chega sem contexto. */
const TABS: {
  id: ViewMode;
  label: string;
  hint: string;
  icon: typeof LayoutGrid;
}[] = [
  {
    id: "dashboard",
    label: "Batdash",
    hint: "Painel: os 6 gráficos numa tela só",
    icon: LayoutGrid,
  },
  {
    id: "presentation",
    label: "Batstory",
    hint: "História: um capítulo por vez, na ordem da jornada",
    icon: BookOpen,
  },
];

export function ViewTabs({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Modo de visualização"
      className="inline-flex shrink-0 gap-1 rounded-md border-2 border-foreground/10 bg-background/70 p-1"
    >
      {TABS.map((tab) => {
        const active = tab.id === value;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active}
            title={tab.hint}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId="view-tab-active"
                className="comic-panel absolute inset-0 rounded-sm bg-background"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <Icon className="relative size-4" />
            <span className="relative">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
