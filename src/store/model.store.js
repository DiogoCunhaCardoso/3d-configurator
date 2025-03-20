import { create } from "zustand";

const useStore = create((set) => ({
  // PRESETS ----------------------------------------------------------

  activePreset: 0,
  setActivePreset: (index) => set({ activePreset: index }),

  // EXTERIOR  --------------------------------------------------------

  activeTopTexture: 0,
  setActiveTopTexture: (index) => set({ activeTopTexture: index }),

  activeFrontTexture: null,
  setActiveFrontTexture: (texturePath) =>
    set({ activeFrontTexture: texturePath }),

  activeColor: null,
  setActiveColor: (rgbCode) => set({ activeColor: rgbCode }),

  activeGrid: null,
  setActiveGrid: (rgbCode) => set({ activeGrid: rgbCode }),

  // INTERIOR  --------------------------------------------------------

  isInteriorShowing: false,
  setIsInteriorShowing: () =>
    set((state) => ({ isInteriorShowing: !state.isInteriorShowing })),

  interiorColor: null,
  setInteriorColor: (rgbCode) => set({ interiorColor: rgbCode }),

  // ACCESSORIES  -----------------------------------------------------

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
