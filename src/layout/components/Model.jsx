import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useStore from "../../store/model.store";

export function Model(props) {
  const { nodes, materials } = useGLTF("/loti.glb");

  const activePreset = useStore((state) => state.activePreset);
  const presets = useStore((state) => state.presets);
  const preset = presets[activePreset];
  const frontTextureName = preset && preset.activeFrontTexture;

  // ACTIVE TEXTURES / COLORS ------------------------------------------------

  const topTexture = useStore((state) => state.activeTopTexture);
  const interiorColor = useStore((state) => state.interiorColor);
  const gridColor = useStore((state) => state.activeGrid);

  // APPLY -------------------------------------------------------------------

  const topMaterial = topTexture === 0 ? materials.wood : materials.polystyrene;

  const interiorMaterial =
    interiorColor === null
      ? materials.GRAY15
      : new THREE.MeshStandardMaterial({
          ...materials.GRAY15,
          color: new THREE.Color(interiorColor), // Correct: use color instead of interiorColor
        });

  const gridMaterial = gridColor
    ? new THREE.MeshStandardMaterial({
        ...materials.GRAY14,
        color: new THREE.Color(gridColor),
      })
    : materials.GRAY14;

  const frontMaterial = frontTextureName?.startsWith("materials.")
    ? materials[frontTextureName.split(".")[1]] || materials.Vinyl
    : new THREE.MeshStandardMaterial({
        ...materials.Vinyl,
        map: frontTextureName
          ? useTexture(frontTextureName)
          : materials.Vinyl.map,
      });

  // ANIMATION --------------------------------------------------------------

  const isInteriorShowing = useStore((state) => state.isInteriorShowing);

  // Refs for meshes
  const tampaDireitaRef = useRef();
  const tampaEsquerdaRef = useRef();
  const separadorMetalicoRef = useRef();
  const puxadorEsquerdoRef = useRef();
  const puxadorDireitoRef = useRef();

  useFrame(() => {
    const targetZ = isInteriorShowing ? -200 : 0;
    const targetOpacity = isInteriorShowing ? 0 : 1;

    const moveAndFade = (mesh, delay = 0) => {
      if (!mesh || !mesh.material) return;

      setTimeout(() => {
        mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, targetZ, 0.1);

        mesh.material.transparent = true;
        mesh.material.opacity = THREE.MathUtils.lerp(
          mesh.material.opacity,
          targetOpacity,
          0.1
        );
      }, delay);
    };

    moveAndFade(tampaDireitaRef.current, 0);
    moveAndFade(tampaEsquerdaRef.current, 100);
    moveAndFade(separadorMetalicoRef.current, 100);
    moveAndFade(puxadorEsquerdoRef.current, 100);
    moveAndFade(puxadorDireitoRef.current, 100);
  });

  return (
    <group {...props} dispose={null}>
      <group
        name="facesInternas"
        position={[-0.147, 0.297, 0.03]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.001}
      >
        <mesh
          name="banheira"
          castShadow
          receiveShadow
          geometry={nodes.banheira.geometry}
          material={interiorMaterial}
        />
        <mesh
          name="banheira_1"
          castShadow
          receiveShadow
          geometry={nodes.banheira_1.geometry}
          material={materials.GRAY67}
        />
        <group
          name="interiorTubos"
          position={[0, -529.327, 762.651]}
          rotation={[-1.588, -Math.PI / 2, 0]}
        >
          <mesh
            name="tubos"
            castShadow
            receiveShadow
            geometry={nodes.tubos.geometry}
            material={materials.GRAY75}
          />
          <mesh
            name="tubos_1"
            castShadow
            receiveShadow
            geometry={nodes.tubos_1.geometry}
            material={materials.GOLD}
          />
          <mesh
            name="tubos_2"
            castShadow
            receiveShadow
            geometry={nodes.tubos_2.geometry}
            material={materials.SNOW2}
          />
          <mesh
            name="tubos_3"
            castShadow
            receiveShadow
            geometry={nodes.tubos_3.geometry}
            material={materials.GRAY15}
          />
          <mesh
            name="tubos_4"
            castShadow
            receiveShadow
            geometry={nodes.tubos_4.geometry}
            material={materials.GRAY74}
          />
          <mesh
            name="tubos_5"
            castShadow
            receiveShadow
            geometry={nodes.tubos_5.geometry}
            material={materials.WHITESMOKE}
          />
          <mesh
            name="tubos_6"
            castShadow
            receiveShadow
            geometry={nodes.tubos_6.geometry}
            material={materials.GRAY30}
          />
        </group>
        <group name="internoPaineis" position={[0, -888.25, 745.67]}>
          <mesh
            name="interno"
            castShadow
            receiveShadow
            geometry={nodes.interno.geometry}
            material={materials.Vinyl}
          />
          <mesh
            name="interno_1"
            castShadow
            receiveShadow
            geometry={nodes.interno_1.geometry}
            material={materials.Vinyl}
          />
          <mesh
            name="interno_2"
            castShadow
            receiveShadow
            geometry={nodes.interno_2.geometry}
            material={materials.GRAY50}
          />
          <mesh
            name="painelInterno1"
            castShadow
            receiveShadow
            geometry={nodes.painelInterno1.geometry}
            material={materials.Vinyl}
            position={[-298, -11.25, 14]}
            rotation={[0, 0, -Math.PI]}
          />

          <mesh
            name="painelInterno3"
            castShadow
            receiveShadow
            geometry={nodes.painelInterno3.geometry}
            material={materials.Vinyl}
            position={[-298, 138.75, -336]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
          />
        </group>
      </group>
      <group
        name="facesExteriores"
        position={[0.003, 0.189, 0.048]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.001}
      >
        {/*   <mesh
          name="logoDireita"
          castShadow
          receiveShadow
          geometry={nodes.logoDireita.geometry}
          material={materials.LOTI}
          position={[72.154, -900.161, 41.691]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={1000}
        />
        <mesh
          name="logoEsquerda"
          castShadow
          receiveShadow
          geometry={nodes.logoEsquerda.geometry}
          material={materials.LOTI}
          position={[-98.518, 901.601, 41.692]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1000}
        />
        <mesh
          name="logoFrente"
          castShadow
          receiveShadow
          geometry={nodes.logoFrente.geometry}
          material={materials.LOTI}
          position={[337.595, -655.821, -69.151]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={1000}
        /> */}
        <group
          name="rodas"
          position={[282.344, 844.429, 724.837]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <group name="roda1" position={[-16.02, 599, -72]}>
            <mesh
              name="roda6_1"
              castShadow
              receiveShadow
              geometry={nodes.roda6_1.geometry}
              material={materials.GRAY75}
            />
            <mesh
              name="roda6_2"
              castShadow
              receiveShadow
              geometry={nodes.roda6_2.geometry}
              material={materials.Wheel_Rubber}
            />
            <mesh
              name="roda6_3"
              castShadow
              receiveShadow
              geometry={nodes.roda6_3.geometry}
              material={materials.Metal}
            />
            <mesh
              name="roda6_4"
              castShadow
              receiveShadow
              geometry={nodes.roda6_4.geometry}
              material={materials.cement}
            />
          </group>
          <group name="roda2" position={[0, 0, -72]}>
            <mesh
              name="roda6_1"
              castShadow
              receiveShadow
              geometry={nodes.roda6_1.geometry}
              material={materials.GRAY75}
            />
            <mesh
              name="roda6_2"
              castShadow
              receiveShadow
              geometry={nodes.roda6_2.geometry}
              material={materials.Wheel_Rubber}
            />
            <mesh
              name="roda6_3"
              castShadow
              receiveShadow
              geometry={nodes.roda6_3.geometry}
              material={materials.Metal}
            />
            <mesh
              name="roda6_4"
              castShadow
              receiveShadow
              geometry={nodes.roda6_4.geometry}
              material={materials.cement}
            />
          </group>
          <group name="roda3" position={[-1129.429, 599, -72]}>
            <mesh
              name="roda6_1"
              castShadow
              receiveShadow
              geometry={nodes.roda6_1.geometry}
              material={materials.GRAY75}
            />
            <mesh
              name="roda6_2"
              castShadow
              receiveShadow
              geometry={nodes.roda6_2.geometry}
              material={materials.Wheel_Rubber}
            />
            <mesh
              name="roda6_3"
              castShadow
              receiveShadow
              geometry={nodes.roda6_3.geometry}
              material={materials.Metal}
            />
            <mesh
              name="roda6_4"
              castShadow
              receiveShadow
              geometry={nodes.roda6_4.geometry}
              material={materials.cement}
            />
          </group>
          <group
            name="roda4"
            position={[-1689.929, 596.5, -72]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <mesh
              name="roda6_1"
              castShadow
              receiveShadow
              geometry={nodes.roda6_1.geometry}
              material={materials.GRAY75}
            />
            <mesh
              name="roda6_2"
              castShadow
              receiveShadow
              geometry={nodes.roda6_2.geometry}
              material={materials.Wheel_Rubber}
            />
            <mesh
              name="roda6_3"
              castShadow
              receiveShadow
              geometry={nodes.roda6_3.geometry}
              material={materials.Metal}
            />
            <mesh
              name="roda6_4"
              castShadow
              receiveShadow
              geometry={nodes.roda6_4.geometry}
              material={materials.cement}
            />
          </group>
          <group
            name="roda5"
            position={[-1134.429, 3, -72]}
            rotation={[0, 0, -Math.PI]}
          >
            <mesh
              name="roda6_1"
              castShadow
              receiveShadow
              geometry={nodes.roda6_1.geometry}
              material={materials.GRAY75}
            />
            <mesh
              name="roda6_2"
              castShadow
              receiveShadow
              geometry={nodes.roda6_2.geometry}
              material={materials.Wheel_Rubber}
            />
            <mesh
              name="roda6_3"
              castShadow
              receiveShadow
              geometry={nodes.roda6_3.geometry}
              material={materials.Metal}
            />
            <mesh
              name="roda6_4"
              castShadow
              receiveShadow
              geometry={nodes.roda6_4.geometry}
              material={materials.cement}
            />
          </group>
          <group name="roda6" position={[-1692.521, 2.5, -72.221]}>
            <mesh
              name="roda6_1"
              castShadow
              receiveShadow
              geometry={nodes.roda6_1.geometry}
              material={materials.GRAY75}
            />
            <mesh
              name="roda6_2"
              castShadow
              receiveShadow
              geometry={nodes.roda6_2.geometry}
              material={materials.Wheel_Rubber}
            />
            <mesh
              name="roda6_3"
              castShadow
              receiveShadow
              geometry={nodes.roda6_3.geometry}
              material={materials.Metal}
            />
            <mesh
              name="roda6_4"
              castShadow
              receiveShadow
              geometry={nodes.roda6_4.geometry}
              material={materials.cement}
            />
          </group>
        </group>
        <mesh
          name="faceEsquerda"
          castShadow
          receiveShadow
          geometry={nodes.faceEsquerda.geometry}
          material={materials.Vinyl}
          position={[-18.656, 899.5, 252.087]}
        />
        <group
          name="faceFrente"
          position={[336.844, 0, 252.087]}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <mesh
            name="faceFrente_1"
            castShadow
            receiveShadow
            geometry={nodes.faceFrente_1.geometry}
            material={frontMaterial}
          />
          <mesh
            name="faceFrente_2"
            castShadow
            receiveShadow
            geometry={nodes.faceFrente_2.geometry}
            material={materials.red}
          />
          <mesh
            name="faceFrente_3"
            castShadow
            receiveShadow
            geometry={nodes.faceFrente_3.geometry}
            material={materials.medic}
          />
          <group
            name="metalFrontal"
            position={[100, 2, 280.25]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="metalFrontal_1"
              castShadow
              receiveShadow
              geometry={nodes.metalFrontal_1.geometry}
              material={materials.GOLD}
            />
            <mesh
              name="metalFrontal_2"
              castShadow
              receiveShadow
              geometry={nodes.metalFrontal_2.geometry}
              material={materials["Metal.2"]}
            />
            <mesh
              name="metalFrontal_3"
              castShadow
              receiveShadow
              geometry={nodes.metalFrontal_3.geometry}
              material={materials.WHEAT3}
            />
            <mesh
              name="metalFrontal_4"
              castShadow
              receiveShadow
              geometry={nodes.metalFrontal_4.geometry}
              material={materials.GRAY50}
            />
          </group>
          <group
            name="painelButoes"
            position={[713.5, 2.7, -209.3]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <mesh
              name="painelButoes_1"
              castShadow
              receiveShadow
              geometry={nodes.painelButoes_1.geometry}
              material={materials.GRAY75}
            />
            <mesh
              name="painelButoes_2"
              castShadow
              receiveShadow
              geometry={nodes.painelButoes_2.geometry}
              material={materials.GRAY17}
            />
            <mesh
              name="painelButoes_3"
              castShadow
              receiveShadow
              geometry={nodes.painelButoes_3.geometry}
              material={materials["Glass.Ss"]}
            />
          </group>
        </group>
        <mesh
          name="faceTras"
          castShadow
          receiveShadow
          geometry={nodes.faceTras.geometry}
          material={materials.Vinyl}
          position={[-374.156, 0, 252.087]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <mesh
          name="grelhaDireita"
          castShadow
          receiveShadow
          geometry={nodes.grelhaDireita.geometry}
          material={materials.Vinyl}
          position={[-18.656, -899.5, 306.337]}
          rotation={[0, 0, Math.PI]}
        />
        <group
          name="grelhaTras"
          position={[-377.156, -761, 473.837]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        >
          <mesh
            name="grelhaTras_1"
            castShadow
            receiveShadow
            geometry={nodes.grelhaTras_1.geometry}
            material={gridMaterial}
          />
          <mesh
            name="grelhaTras_2"
            castShadow
            receiveShadow
            geometry={nodes.grelhaTras_2.geometry}
            material={materials.Metal}
          />
          <mesh
            name="grelhaTras_3"
            castShadow
            receiveShadow
            geometry={nodes.grelhaTras_3.geometry}
            material={materials.GOLD}
          />
        </group>
        <mesh
          name="painelBaixo"
          castShadow
          receiveShadow
          geometry={nodes.painelBaixo.geometry}
          material={materials.WHITE}
          position={[-18.656, 150.5, 650.837]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        />
        <group
          name="parteSuperior"
          position={[-18.656, 155.938, -196.292]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <group
            name="bordas"
            position={[-155.938, 0, 38.263]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <mesh
              name="bordaDireita"
              castShadow
              receiveShadow
              geometry={nodes.bordaDireita.geometry}
              material={topMaterial}
              position={[0, 0, -872]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <mesh
              name="bordaEsquerda"
              castShadow
              receiveShadow
              geometry={nodes.bordaEsquerda.geometry}
              material={topMaterial}
              position={[0, 0, 872]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <group
              name="bordaExtra"
              position={[0, 0, -648]}
              rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
            >
              <mesh
                name="bordaExtra_1"
                castShadow
                receiveShadow
                geometry={nodes.bordaExtra_1.geometry}
                material={topMaterial}
              />
              <mesh
                name="bordaExtra_2"
                castShadow
                receiveShadow
                geometry={nodes.bordaExtra_2.geometry}
                material={materials.polystyrene}
              />
            </group>
            <mesh
              name="bordaFrente"
              castShadow
              receiveShadow
              geometry={nodes.bordaFrente.geometry}
              material={topMaterial}
              position={[0, -328, 0]}
            />
            <mesh
              name="bordaTras"
              castShadow
              receiveShadow
              geometry={nodes.bordaTras.geometry}
              material={topMaterial}
              position={[0, 328, 0]}
              rotation={[-Math.PI, 0, 0]}
            />
          </group>
          <mesh
            ref={separadorMetalicoRef}
            name="separadorMetalico"
            castShadow
            receiveShadow
            geometry={nodes.sepradorMetalico.geometry}
            material={materials["Metal.2"]}
            position={[-5.338, 0, -8.188]}
          />
          <mesh
            ref={tampaDireitaRef}
            name="tampaDireita"
            castShadow
            receiveShadow
            geometry={nodes.tampaDireita.geometry}
            material={topMaterial}
            position={[-717.438, 0, -6.188]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <group
              name="puxadorDireita"
              position={[0, -17.5, 0]}
              rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            >
              <mesh
                name="puxadorDireita_1"
                castShadow
                receiveShadow
                geometry={nodes.puxadorDireita_1.geometry}
                material={materials["Material.001"]}
              />
              <mesh
                name="puxadorDireita_2"
                castShadow
                receiveShadow
                geometry={nodes.puxadorDireita_2.geometry}
                material={materials["Metal.2"]}
              />
            </group>
          </mesh>
          <mesh
            ref={tampaEsquerdaRef}
            name="tampaEsquerda"
            castShadow
            receiveShadow
            geometry={nodes.tampaEsquerda.geometry}
            material={topMaterial}
            position={[706.762, 0, -6.188]}
            rotation={[0, 0, -Math.PI / 2]}
          >
            <group
              name="puxadorEsquerdo"
              position={[0, -17.5, 0]}
              rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            >
              <mesh
                ref={puxadorEsquerdoRef}
                name="puxadorEsquerdo_1"
                castShadow
                receiveShadow
                geometry={nodes.puxadorEsquerdo_1.geometry}
                material={materials["Material.001"]}
              />
              <mesh
                name="puxadorEsquerdo_2"
                castShadow
                receiveShadow
                geometry={nodes.puxadorEsquerdo_2.geometry}
                material={materials["Metal.2"]}
              />
            </group>
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/loti.glb");
