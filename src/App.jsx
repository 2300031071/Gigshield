import { useState } from "react";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Policy from "./pages/Policy";
import Claims from "./pages/Claims";
import Nav from "./components/Nav";

export default function App() {
  const [page, setPage] = useState("landing");
  const [worker, setWorker] = useState(null);

  const navigate = (p) => setPage(p);

  if (page === "landing") return <Landing onStart={() => navigate("onboarding")} />;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Nav page={page} navigate={navigate} worker={worker} />
      <div style={{ paddingTop: "64px" }}>
        {page === "onboarding" && <Onboarding onComplete={(w) => { setWorker(w); navigate("dashboard"); }} />}
        {page === "dashboard" && <Dashboard worker={worker} navigate={navigate} />}
        {page === "policy" && <Policy worker={worker} navigate={navigate} />}
        {page === "claims" && <Claims worker={worker} navigate={navigate} />}
      </div>
    </div>
  );
}
