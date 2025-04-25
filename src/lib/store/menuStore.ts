import { create } from 'zustand';
import { Section, SousSection } from '../types/menu';

interface MenuState {
  sections: Section[];
  setSections: (sections: Section[]) => void;
  addSection: (section: Section) => void;
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  deleteSection: (sectionId: string) => void;
  addSousSection: (sectionId: string, sousSection: SousSection) => void;
  updateSousSection: (sectionId: string, sousSectionId: string, updates: Partial<SousSection>) => void;
  deleteSousSection: (sectionId: string, sousSectionId: string) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  reorderSousSections: (sectionId: string, startIndex: number, endIndex: number) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  sections: [],
  setSections: (sections) => set({ sections }),
  
  addSection: (section) => set((state) => ({
    sections: [...state.sections, section]
  })),
  
  updateSection: (sectionId, updates) => set((state) => ({
    sections: state.sections.map((section) =>
      section.id === sectionId ? { ...section, ...updates } : section
    )
  })),
  
  deleteSection: (sectionId) => set((state) => ({
    sections: state.sections.filter((section) => section.id !== sectionId)
  })),
  
  addSousSection: (sectionId, sousSection) => set((state) => ({
    sections: state.sections.map((section) =>
      section.id === sectionId
        ? { ...section, sousSections: [...section.sousSections, sousSection] }
        : section
    )
  })),
  
  updateSousSection: (sectionId, sousSectionId, updates) => set((state) => ({
    sections: state.sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            sousSections: section.sousSections.map((sousSection) =>
              sousSection.id === sousSectionId
                ? { ...sousSection, ...updates }
                : sousSection
            )
          }
        : section
    )
  })),
  
  deleteSousSection: (sectionId, sousSectionId) => set((state) => ({
    sections: state.sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            sousSections: section.sousSections.filter(
              (sousSection) => sousSection.id !== sousSectionId
            )
          }
        : section
    )
  })),
  
  reorderSections: (startIndex, endIndex) => set((state) => {
    const newSections = [...state.sections];
    const [removed] = newSections.splice(startIndex, 1);
    newSections.splice(endIndex, 0, removed);
    return { sections: newSections };
  }),
  
  reorderSousSections: (sectionId, startIndex, endIndex) => set((state) => ({
    sections: state.sections.map((section) => {
      if (section.id !== sectionId) return section;
      const newSousSections = [...section.sousSections];
      const [removed] = newSousSections.splice(startIndex, 1);
      newSousSections.splice(endIndex, 0, removed);
      return { ...section, sousSections: newSousSections };
    })
  })),
})); 