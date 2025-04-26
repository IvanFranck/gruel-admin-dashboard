import { create } from 'zustand';
import { Section, SousSection } from '../types/menu';

// Données initiales d'exemple
const INITIAL_SECTIONS:  Section[] = [
    {
        id: '1',
        nom: 'Au Magasin',
        visible: true,
        sousSections: [
            {
                id: '101',
                nom: 'Les Entrées',
                plats: [
                    {
                        id: '1001',
                        titre: 'Salade de chèvre',
                        prix: '9.50€',
                        description: 'Servie tiède, avec miel',
                        image: '/img/salade.jpg'
                    }
                ]
            },
            {
                id: '102',
                nom: 'Les Plats',
                plats: [
                    {
                        id: '1002',
                        titre: 'Bœuf Bourguignon',
                        prix: '16.50€',
                        description: 'Mijoté avec carottes et pommes de terre',
                        image: '/img/boeuf.jpg'
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        nom: 'A Emporter',
        visible: false,
        sousSections: [
            {
                id: '201',
                nom: 'Formules',
                plats: [
                    {
                        id: '2001',
                        titre: 'Menu du jour',
                        prix: '12.90€',
                        description: 'Entrée + Plat + Dessert',
                    }
                ]
            }
        ]
    }
];

interface SectionsState {
  // État
  sections: Section[];
  selectedSectionId: string | null;
  
  // Sélecteur pour obtenir la section sélectionnée
  getSelectedSection: () => Section | undefined;
  
  // Actions pour les sections
  setSelectedSectionId: (id: string | null) => void;
  setSections: (sections: Section[]) => void;
  addSection: (section: Section) => void;
  updateSection: (updatedSection: Section) => void;
  deleteSection: (sectionId: string) => void;
  toggleSectionVisibility: (sectionId: string, visible: boolean) => void;
  
  // Actions pour les sous-sections
  addSousSection: (sectionId: string, sousSection: SousSection) => void;
  updateSousSection: (sectionId: string, updatedSousSection: SousSection) => void;
  deleteSousSection: (sectionId: string, sousSectionId: string) => void;
  reorderSousSections: (sectionId: string, sousSections: SousSection[]) => void;
}

export const useSectionsStore = create<SectionsState>((set, get) => ({
  // État initial
  sections: INITIAL_SECTIONS,
  selectedSectionId: null,
  
  // Sélecteur
  getSelectedSection: () => {
    const { sections, selectedSectionId } = get();
    return selectedSectionId ? sections.find(section => section.id === selectedSectionId) : undefined;
  },
  
  // Actions pour les sections
  setSelectedSectionId: (id) => set({ selectedSectionId: id }),
  
  setSections: (sections) => set({ sections }),
  
  addSection: (section) => set(state => ({
    sections: [...state.sections, section]
  })),
  
  updateSection: (updatedSection) => set(state => ({
    sections: state.sections.map(section =>
      section.id === updatedSection.id ? updatedSection : section
    )
  })),
  
  deleteSection: (sectionId) => set(state => ({
    sections: state.sections.filter(section => section.id !== sectionId),
    selectedSectionId: state.selectedSectionId === sectionId ? null : state.selectedSectionId
  })),
  
  toggleSectionVisibility: (sectionId, visible) => set(state => ({
    sections: state.sections.map(section =>
      section.id === sectionId ? { ...section, visible } : section
    )
  })),
  
  // Actions pour les sous-sections
  addSousSection: (sectionId, sousSection) => set(state => ({
    sections: state.sections.map(section =>
      section.id === sectionId
        ? { ...section, sousSections: [...section.sousSections, sousSection] }
        : section
    )
  })),
  
  updateSousSection: (sectionId, updatedSousSection) => set(state => ({
    sections: state.sections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            sousSections: section.sousSections.map(sousSection =>
              sousSection.id === updatedSousSection.id
                ? updatedSousSection
                : sousSection
            )
          }
        : section
    )
  })),
  
  deleteSousSection: (sectionId, sousSectionId) => set(state => ({
    sections: state.sections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            sousSections: section.sousSections.filter(
              sousSection => sousSection.id !== sousSectionId
            )
          }
        : section
    )
  })),
  
  reorderSousSections: (sectionId, sousSections) => set(state => ({
    sections: state.sections.map(section =>
      section.id === sectionId
        ? { ...section, sousSections }
        : section
    )
  }))
}));
