import "./index.css";
import { RailwayTabs } from "@/components/RailwayTabs";

function App() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Railway Data Viewer
        </h1>
        <p className="text-muted-foreground">
          Browse tracks, signals, and their relationships
        </p>
      </header>

      <RailwayTabs />
    </div>
  );
}

export default App;
