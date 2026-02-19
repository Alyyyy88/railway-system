import { type ColumnDef } from "@tanstack/react-table";
import { type Track } from "@/schemas/trackSchema";

export const relationshipTracksColumns: ColumnDef<Track>[] = [
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
  },
  {
    accessorKey: "target",
    header: "Target",
  },
];
