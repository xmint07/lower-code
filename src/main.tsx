import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import Layout from "./editor/Layouts/index.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <DndProvider backend={HTML5Backend}>
    <Layout />
  </DndProvider>
);
