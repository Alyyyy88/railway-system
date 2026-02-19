import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { type Track } from "@/schemas/trackSchema";

export const tracksColumns: ColumnDef<Track>[] = [
  {
    accessorKey: "track_id",
    header: "Track ID",
    cell: ({ row }) => (
      <span className="font-mono">{row.getValue("track_id")}</span>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("source")}</span>
    ),
  },
  {
    accessorKey: "target",
    header: "Target",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("target")}</span>
    ),
  },
  {
    accessorKey: "signal_ids",
    header: "Signals",
    cell: ({ row }) => {
      const signals = row.original.signal_ids;
      return (
        <div className="flex flex-wrap gap-1">
          {signals.slice(0, 3).map((signal) => (
            <Badge key={signal.signal_id} variant="secondary">
              {signal.signal_name || `Signal ${signal.signal_id}`}
            </Badge>
          ))}
          {signals.length > 3 && (
            <Badge variant="outline">+{signals.length - 3} more</Badge>
          )}
        </div>
      );
    },
  },
];
