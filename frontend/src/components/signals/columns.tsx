import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { type Signal } from "@/schemas/signalSchema";

export const signalsColumns: ColumnDef<Signal>[] = [
  {
    accessorKey: "signal_id",
    header: "Signal ID",
    cell: ({ row }) => (
      <span className="font-mono">{row.getValue("signal_id")}</span>
    ),
  },
  {
    accessorKey: "signal_name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("signal_name") as string | null;
      return (
        <span className="font-medium">
          {name || <span className="text-muted-foreground">Unknown</span>}
        </span>
      );
    },
  },
  {
    accessorKey: "elr",
    header: "ELR",
    cell: ({ row }) => {
      const elr = row.getValue("elr") as string | null;
      return <Badge variant="outline">{elr}</Badge>;
    },
  },
  {
    accessorKey: "mileage",
    header: "Mileage",
    cell: ({ row }) => {
      const mileage = row.getValue("mileage") as number | null;
      return mileage !== null ? (
        `${mileage.toFixed(4)} mi`
      ) : (
        <span className="text-muted-foreground">N/A</span>
      );
    },
  },
];
