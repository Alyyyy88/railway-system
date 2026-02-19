import type { Signal } from "@/schemas/signalSchema";

export function groupSignalsByELR(signals: Signal[]): [string, Signal[]][] {
  const groups = new Map<string, Signal[]>();

  signals.forEach((signal) => {
    const elr = signal.elr || "Unknown";
    if (!groups.has(elr)) {
      groups.set(elr, []);
    }
    groups.get(elr)!.push(signal);
  });

  return Array.from(groups.entries()).sort((a, b) => b[1].length - a[1].length);
}
