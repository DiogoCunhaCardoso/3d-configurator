import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Overlay from "./layout/Overlay.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <div className="relative w-full h-full">
    {/* Canvas */}
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 10],
      }}
      className="absolute inset-0 w-full h-full"
    >
      <Experience />
    </Canvas>

    {/* Overlay */}
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Overlay />
    </div>
  </div>
);
