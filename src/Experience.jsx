import { OrbitControls, Center, Float } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, Suspense } from "react";
import useStore from "./store/model.store.js";
import { Model } from "./layout/components/Model.jsx";
import Loader from "./layout/components/Loader.jsx";

export default function Experience() {
  const { scene } = useThree();
  const activePreset = useStore((state) => state.activePreset);

  /*   useEffect(() => {
    const sphere = scene.getObjectByName("sphere");
    if (sphere) {
      switch (activePreset) {
        case 0:
          sphere.material.color.set("gray");
          break;
        case 1:
          sphere.material.color.set("red");
          break;
        case 2:
          sphere.material.color.set("green");
          break;
        case 3:
          sphere.material.color.set("blue");
          break;
        default:
          sphere.material.color.set("gray");
      }
    }
  }, [activePreset, scene]); */

  return (
    <>
      <Center>
        <OrbitControls makeDefault minDistance={3.25} maxDistance={4} />
        <directionalLight position={[5, 5, 5]} intensity={7.5} />
        <directionalLight position={[-5, -5, -5]} intensity={5} />
        <ambientLight intensity={0.5} />

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
