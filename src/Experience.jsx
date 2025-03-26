import {
  OrbitControls,
  Center,
  Float,
  Environment,
  SoftShadows,
} from "@react-three/drei";
import { Suspense } from "react";

import { Model } from "./layout/components/Model.jsx";
import Loader from "./layout/components/Loader.jsx";

export default function Experience() {
  return (
    <>
      <Environment preset="studio" background={false} blur={20} />

      <SoftShadows size={20} samples={10} focus={0.8} />

      <Center>
        <OrbitControls makeDefault minDistance={3.25} maxDistance={4} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        <Suspense fallback={<Loader />}>
          <Float>
            <Model
              name="model"
              rotation={[0.4, 0.6, 0]}
              onPointerEnter={() => (document.body.style.cursor = "grab")}
              onPointerUp={() => (document.body.style.cursor = "grab")}
              onPointerDown={() => (document.body.style.cursor = "grabbing")}
              onPointerLeave={() => (document.body.style.cursor = "default")}
            />
          </Float>
        </Suspense>
      </Center>
    </>
  );
}
