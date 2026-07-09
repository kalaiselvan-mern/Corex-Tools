import { create } from 'zustand';

export const useCoreXStore = create((set) => ({
  qrInputUrl: "",
  setQrInputUrl: (url) => set({ qrInputUrl: url }),
  
  qrResultImage: null,
  setQrResultImage: (image) => set({ qrResultImage: image }),
}));