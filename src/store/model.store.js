import { create } from "zustand";

const myStore = create((set, get) => ({
  // PRESETS ----------------------------------------------------------

  activePreset: null,
  setActivePreset: (index) => {
    const { presets } = get();
    const preset = presets[index];
    set({
      activePreset: index,
      activeGrid: preset.activeGrid,
      activeTopTexture: preset.activeTopTexture,
      interiorColor: preset.interiorColor,
      activeFrontTexture: preset.activeFrontTexture,
    });
  },

  // PRESET DEFINITIONS -----------------------------------------------

  presets: [
    {
      activeGrid: "#060a0d",
      activeTopTexture: 0,
      interiorColor: "#060a0d",
      activeFrontTexture: "materials.Vinyl",
    },
    {
      activeGrid: "#c4c9c8",
      activeTopTexture: 1,
      interiorColor: "#c4c9c8",
      activeFrontTexture: "materials.cement",
    },
    {
      activeGrid: "#69a4c9",
      activeTopTexture: 0,
      interiorColor: "#69a4c9",
      activeFrontTexture: "materials.medic",
    },
    {
      activeGrid: "#83000c",
      activeTopTexture: 1,
      interiorColor: "#83000c",
      activeFrontTexture: "materials.red",
    },
  ],

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
  setIsInteriorToShowing: (value) => set({ isInteriorShowing: value }),

  interiorColor: null,
  setInteriorColor: (rgbCode) => set({ interiorColor: rgbCode }),

  // ACCESSORIES  -----------------------------------------------------

  selectedAccessories: [],
  setSelectedAccessories: (name) =>
    set((state) => {
      const isSelected = state.selectedAccessories.includes(name);
      return {
        selectedAccessories: isSelected
          ? state.selectedAccessories.filter((item) => item !== name)
          : [...state.selectedAccessories, name],
      };
    }),
}));

export default myStore;
