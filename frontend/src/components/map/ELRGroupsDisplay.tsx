import { getColorForELR } from "@/lib/station-coords";
import type { Signal } from "@/schemas/signalSchema";

interface ELRGroupsDisplayProps {
  elrGroups: [string, Signal[]][];
  maxDisplay?: number;
}

export function ELRGroupsDisplay({
  elrGroups,
  maxDisplay = 12,
}: ELRGroupsDisplayProps) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold mb-2">
        Signals by ELR (Engineer's Line Reference)
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {elrGroups.slice(0, maxDisplay).map(([elr, signals]) => (
          <div
            key={elr}
            className="flex items-center gap-2 rounded-md border p-2 text-sm"
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: getColorForELR(elr === "Unknown" ? null : elr),
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-mono text-xs truncate">{elr}</p>
              <p className="text-xs text-muted-foreground">
                {signals.length} signal{signals.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
      {elrGroups.length > maxDisplay && (
        <p className="text-xs text-muted-foreground mt-2">
          And {elrGroups.length - maxDisplay} more ELR groups...
        </p>
      )}
    </div>
  );
}
