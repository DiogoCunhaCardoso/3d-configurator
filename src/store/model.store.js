import { create } from "zustand";

const useStore = create((set) => ({
  // PRESETS
  activePreset: 0,
  setActivePreset: (index) => set({ activePreset: index }),

  // TEXTURES
  activeTopTexture: 0,
  setActiveTopTexture: (index) => set({ activeTopTexture: index }),

  activeFrontTexture: null,
  setActiveFrontTexture: (value) => set({ activeFrontTexture: value }),

  activeColor: null,
  setActiveColor: (rgbCode) => set({ activeColor: rgbCode }),

  // ACCESSORIES
  selectedAccessories: [],
  setSelectedAccessories: (name) =>
    set((state) => {
      const isSelected = state.selectedAccessories.includes(name);
      return {
        selectedAccessories: isSelected
          ? state.selectedAccessories.filter((item) => item !== name) // Remove if already selected
          : [...state.selectedAccessories, name], // Add if not selected
      };
    }),
}));

export default useStore;
