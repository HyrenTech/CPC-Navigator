import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WizardState {
  processo: string;
  fase: string;
  ato: string;
  tema: string;
  
  setProcesso: (processo: string) => void;
  setFase: (fase: string) => void;
  setAto: (ato: string) => void;
  setTema: (tema: string) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      processo: '',
      fase: '',
      ato: '',
      tema: '',
      
      setProcesso: (processo) => set({ processo }),
      setFase: (fase) => set({ fase }),
      setAto: (ato) => set({ ato }),
      setTema: (tema) => set({ tema }),
      reset: () => set({ processo: '', fase: '', ato: '', tema: '' }),
    }),
    {
      name: 'cpcNavigatorWizardState',
    }
  )
);
