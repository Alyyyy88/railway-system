import { useState } from "react";
import { useTracks, useDebounce } from "@/hooks";
import { FilterBar } from "@/components/ui/filter-bar";
import { ErrorAlert } from "@/components/ui/error-alert";
import { DataTable } from "@/components/ui/data-table";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { tracksColumns } from "@/components/tracks/columns";

export function TracksList() {
  const [page, setPage] = useState(1);
  const [trackId, setTrackId] = useState("");
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const limit = 20;

  // Debounce search inputs to reduce API calls (500ms delay)
  const debouncedTrackId = useDebounce(trackId, 500);
  const debouncedSource = useDebounce(source, 500);
  const debouncedTarget = useDebounce(target, 500);

  const trackIdNum = debouncedTrackId ? parseInt(debouncedTrackId) : undefined;

  const { data, isLoading, error } = useTracks({
    page,
    limit,
    track_id: trackIdNum,
    source: debouncedSource || undefined,
    target: debouncedTarget || undefined,
  });

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const tracks = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-4">
      <FilterBar
        filters={[
          {
            value: trackId,
            placeholder: "Filter by track ID...",
            type: "number",
            onChange: (value) => {
              setTrackId(value);
              setPage(1);
            },
          },
          {
            value: source,
            placeholder: "Filter by source station...",
            onChange: (value) => {
              setSource(value);
              setPage(1);
            },
          },
          {
            value: target,
            placeholder: "Filter by target station...",
            onChange: (value) => {
              setTarget(value);
              setPage(1);
            },
          },
        ]}
      />

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable
            columns={tracksColumns}
            data={tracks}
            emptyMessage="No tracks found"
          />

          {pagination && (
            <PaginationControls
              page={page}
              totalPages={pagination.total_pages}
              totalItems={pagination.total}
              currentItems={tracks.length}
              label="tracks"
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
