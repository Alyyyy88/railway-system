import { lazy, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Train, Radio, Network, Map } from "lucide-react";

// Lazy load components
const TracksList = lazy(() =>
  import("@/components/TracksList").then((m) => ({ default: m.TracksList })),
);
const SignalsList = lazy(() =>
  import("@/components/SignalsList").then((m) => ({ default: m.SignalsList })),
);
const SignalTrackRelationship = lazy(() =>
  import("@/components/SignalTrackRelationship").then((m) => ({
    default: m.SignalTrackRelationship,
  })),
);
const RailwayMap = lazy(() =>
  import("@/components/RailwayMap").then((m) => ({ default: m.RailwayMap })),
);

export function RailwayTabs() {
  return (
    <Tabs defaultValue="tracks" className="space-y-4">
      <TabsList>
        <TabsTrigger value="tracks">
          <Train className="mr-2 h-4 w-4" />
          Tracks
        </TabsTrigger>
        <TabsTrigger value="signals">
          <Radio className="mr-2 h-4 w-4" />
          Signals
        </TabsTrigger>
        <TabsTrigger value="relationships">
          <Network className="mr-2 h-4 w-4" />
          Relationships
        </TabsTrigger>
        <TabsTrigger value="map">
          <Map className="mr-2 h-4 w-4" />
          Map
        </TabsTrigger>
      </TabsList>

      <TabsContent value="tracks" className="space-y-4">
        <Suspense fallback={<TableSkeleton rows={5} />}>
          <TracksList />
        </Suspense>
      </TabsContent>

      <TabsContent value="signals" className="space-y-4">
        <Suspense fallback={<TableSkeleton rows={5} />}>
          <SignalsList />
        </Suspense>
      </TabsContent>

      <TabsContent value="relationships" className="space-y-4">
        <Suspense fallback={<TableSkeleton rows={5} />}>
          <SignalTrackRelationship />
        </Suspense>
      </TabsContent>

      <TabsContent value="map" className="space-y-4">
        <Suspense fallback={<TableSkeleton rows={3} />}>
          <RailwayMap />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
