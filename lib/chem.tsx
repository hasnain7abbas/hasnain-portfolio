import { Fragment, type ReactNode } from "react";

const SUBSCRIPTS: Record<string, string> = { "₂": "2", "₃": "3" };

/** Sets Unicode subscript digits (BiFeO₃) as real <sub> elements, so they use the text face. */
export function chem(text: string): ReactNode {
  const parts = text.split(/([₂₃])/);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    SUBSCRIPTS[part] ? <sub key={i}>{SUBSCRIPTS[part]}</sub> : <Fragment key={i}>{part}</Fragment>,
  );
}
