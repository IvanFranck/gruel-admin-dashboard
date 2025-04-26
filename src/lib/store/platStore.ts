import { create } from 'zustand';
import { Plat } from '../types/menu';
import { useSectionsStore } from './sectionStore';
import { PlatWithParents } from '../types/platUI';

interface PlatState {
  // État
  selectedPlatId: string | null;
  
  // Sélecteurs
  getSelectedPlat: () => PlatWithParents | undefined;
  getAllPlats: () => PlatWithParents[];
  
  // Actions
  setSelectedPlatId: (id: string | null) => void;
  addPlat: (sectionId: string, sousSectionId: string, plat: Plat) => void;
  updatePlat: (sectionId: string, sousSectionId: string, updatedPlat: Plat) => void;
  deletePlat: (sectionId: string, sousSectionId: string, platId: string) => void;
}

export const usePlatStore = create<PlatState>((set, get) => ({
  // État initial
  selectedPlatId: null,
  
  // Sélecteurs
  getSelectedPlat: () => {
    const { selectedPlatId } = get();
    const allPlats = get().getAllPlats();
    return selectedPlatId ? allPlats.find(plat => plat.id === selectedPlatId) : undefined;
  },
  
  getAllPlats: () => {
    const sections = useSectionsStore.getState().sections;
    return sections.flatMap(section => 
      section.sousSections.flatMap(sousSection => 
        sousSection.plats.map(plat => ({
          ...plat,
          sectionId: section.id,
          sectionNom: section.nom,
          sousSectionId: sousSection.id,
          sousSectionNom: sousSection.nom
        }))
      )
    );
  },
  
  // Actions
  setSelectedPlatId: (id) => set({ selectedPlatId: id }),
  
  addPlat: (sectionId, sousSectionId, plat) => {
    const sectionsStore = useSectionsStore.getState();
    const sections = [...sectionsStore.sections];
    
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex === -1) return;
    
    const sousSectionIndex = sections[sectionIndex].sousSections.findIndex(
      ss => ss.id === sousSectionId
    );
    if (sousSectionIndex === -1) return;
    
    sections[sectionIndex].sousSections[sousSectionIndex].plats.push(plat);
    sectionsStore.setSections(sections);
  },
  
  updatePlat: (sectionId, sousSectionId, updatedPlat) => {
    const sectionsStore = useSectionsStore.getState();
    const sections = [...sectionsStore.sections];
    
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex === -1) return;
    
    const sousSectionIndex = sections[sectionIndex].sousSections.findIndex(
      ss => ss.id === sousSectionId
    );
    if (sousSectionIndex === -1) return;
    
    sections[sectionIndex].sousSections[sousSectionIndex].plats = 
      sections[sectionIndex].sousSections[sousSectionIndex].plats.map(plat =>
        plat.id === updatedPlat.id ? updatedPlat : plat
      );
      
    sectionsStore.setSections(sections);
  },
  
  deletePlat: (sectionId, sousSectionId, platId) => {
    const sectionsStore = useSectionsStore.getState();
    const sections = [...sectionsStore.sections];
    
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex === -1) return;
    
    const sousSectionIndex = sections[sectionIndex].sousSections.findIndex(
      ss => ss.id === sousSectionId
    );
    if (sousSectionIndex === -1) return;
    
    sections[sectionIndex].sousSections[sousSectionIndex].plats = 
      sections[sectionIndex].sousSections[sousSectionIndex].plats.filter(
        plat => plat.id !== platId
      );
      
    sectionsStore.setSections(sections);
    set(state => ({
      selectedPlatId: state.selectedPlatId === platId ? null : state.selectedPlatId
    }));
  }
})); 