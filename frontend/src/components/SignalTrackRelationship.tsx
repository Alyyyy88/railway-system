import { useState } from "react";
import { useSignals, useSignalTracks } from "@/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ErrorAlert } from "@/components/ui/error-alert";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { relationshipTracksColumns } from "@/components/relationships/columns";

export function SignalTrackRelationship() {
  const [selectedSignalId, setSelectedSignalId] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: signalsData,
    isLoading: signalsLoading,
    error: signalsError,
  } = useSignals({
    limit: 100,
    signal_name: searchTerm || undefined,
  });
  const {
    data: tracksData,
    isLoading: tracksLoading,
    error: tracksError,
  } = useSignalTracks(selectedSignalId);

  if (signalsError) {
    return <ErrorAlert error={signalsError} />;
  }

  const signals = signalsData?.data || [];

  const selectedSignal = signals.find((s) => s.signal_id === selectedSignalId);
  const tracks = tracksData?.data?.tracks || [];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Signals</CardTitle>
          <CardDescription>Select a signal to view its tracks</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search signals by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />

          {signalsLoading ? (
            <TableSkeleton rows={5} />
          ) : (
            <div className="max-h-125 space-y-2 overflow-y-auto">
              {signals.map((signal) => (
                <button
                  key={signal.signal_id}
                  onClick={() => setSelectedSignalId(signal.signal_id)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors hover:bg-accent ${
                    selectedSignalId === signal.signal_id
                      ? "border-primary bg-accent"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {signal.signal_name || "Unknown"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {signal.signal_id}
                      </p>
                    </div>
                    {signal.elr && (
                      <Badge variant="outline">{signal.elr}</Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Associated Tracks</CardTitle>
          <CardDescription>
            {selectedSignal
              ? `Tracks for signal: ${selectedSignal.signal_name || selectedSignal.signal_id}`
              : "Select a signal to view tracks"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedSignalId === 0 ? (
            <p className="text-center text-muted-foreground">
              No signal selected
            </p>
          ) : tracksError ? (
            <ErrorAlert error={tracksError} />
          ) : tracksLoading ? (
            <TableSkeleton rows={3} />
          ) : (
            <DataTable
              columns={relationshipTracksColumns}
              data={tracks}
              emptyMessage="No tracks found for this signal"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
