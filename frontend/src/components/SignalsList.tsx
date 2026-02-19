import { useState } from "react";
import { useSignals, useDebounce } from "@/hooks";
import { FilterBar } from "@/components/ui/filter-bar";
import { ErrorAlert } from "@/components/ui/error-alert";
import { DataTable } from "@/components/ui/data-table";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { signalsColumns } from "@/components/signals/columns";

export function SignalsList() {
  const [page, setPage] = useState(1);
  const [signalId, setSignalId] = useState("");
  const [signalName, setSignalName] = useState("");
  const [elr, setElr] = useState("");
  const limit = 20;

  // Debounce search inputs to reduce API calls (500ms delay)
  const debouncedSignalId = useDebounce(signalId, 500);
  const debouncedSignalName = useDebounce(signalName, 500);
  const debouncedElr = useDebounce(elr, 500);

  const signalIdNum = debouncedSignalId
    ? parseInt(debouncedSignalId)
    : undefined;

  const { data, isLoading, error } = useSignals({
    page,
    limit,
    signal_id: signalIdNum,
    signal_name: debouncedSignalName || undefined,
    elr: debouncedElr || undefined,
  });

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const signals = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-4">
      <FilterBar
        filters={[
          {
            value: signalId,
            placeholder: "Filter by signal ID...",
            type: "number",
            onChange: (value) => {
              setSignalId(value);
              setPage(1);
            },
          },
          {
            value: signalName,
            placeholder: "Filter by signal name...",
            onChange: (value) => {
              setSignalName(value);
              setPage(1);
            },
          },
          {
            value: elr,
            placeholder: "Filter by ELR...",
            onChange: (value) => {
              setElr(value);
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
            columns={signalsColumns}
            data={signals}
            emptyMessage="No signals found"
          />

          {pagination && (
            <PaginationControls
              page={page}
              totalPages={pagination.total_pages}
              totalItems={pagination.total}
              currentItems={signals.length}
              label="signals"
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
