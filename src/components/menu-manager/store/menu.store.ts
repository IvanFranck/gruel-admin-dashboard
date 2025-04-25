import { create } from 'zustand';
import { Section, StaticPage, ExpandedSections, SelectedItem } from '../types';

interface MenuState {
  sections: Section[];
  pages: StaticPage[];
  expandedSections: ExpandedSections;
  selectedItem: SelectedItem | null;
  showConfirmation: boolean;
  showPreview: boolean;
  editMode: boolean;
  
  // Actions
  setSections: (sections: Section[]) => void;
  setPages: (pages: StaticPage[]) => void;
  setExpandedSections: (expanded: ExpandedSections) => void;
  setSelectedItem: (item: SelectedItem | null) => void;
  setShowConfirmation: (show: boolean) => void;
  setShowPreview: (show: boolean) => void;
  setEditMode: (mode: boolean) => void;
  
  // Menu operations
  toggleSection: (sectionId: string) => void;
  addSection: () => void;
  addSubsection: (sectionId: string) => void;
  deleteItem: (item: SelectedItem) => void;
  updateItem: (item: SelectedItem) => void;
}

export const useMenuStore = create<MenuState>((set, get) => ({
  sections: [],
  pages: [],
  expandedSections: {},
  selectedItem: null,
  showConfirmation: false,
  showPreview: false,
  editMode: false,

  setSections: (sections) => set({ sections }),
  setPages: (pages) => set({ pages }),
  setExpandedSections: (expanded) => set({ expandedSections: expanded }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  setShowConfirmation: (show) => set({ showConfirmation: show }),
  setShowPreview: (show) => set({ showPreview: show }),
  setEditMode: (mode) => set({ editMode: mode }),

  toggleSection: (sectionId) => {
    const { expandedSections } = get();
    set({
      expandedSections: {
        ...expandedSections,
        [sectionId]: !expandedSections[sectionId]
      }
    });
  },

  addSection: () => {
    const { sections } = get();
    const newSection: Section = {
      id: `section-${sections.length + 1}-${Date.now()}`,
      title: "Nouvelle Section",
      subsections: []
    };
    set({
      sections: [...sections, newSection],
      expandedSections: {
        ...get().expandedSections,
        [newSection.id]: true
      }
    });
  },

  addSubsection: (sectionId) => {
    const { sections } = get();
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex === -1) return;

    const newSubsection: Subsection = {
      id: `subsection-${sectionId}-${sections[sectionIndex].subsections.length + 1}-${Date.now()}`,
      title: "Nouvelle Sous-section",
      dishes: []
    };

    const newSections = sections.map(section => 
      section.id === sectionId
        ? { ...section, subsections: [...section.subsections, newSubsection] }
        : section
    );

    set({ sections: newSections });
  },

  deleteItem: (item) => {
    const { sections } = get();
    if (item.type === 'section') {
      set({ sections: sections.filter(section => section.id !== item.id) });
    } else if (item.type === 'subsection' && item.sectionId) {
      const newSections = sections.map(section => {
        if (section.id === item.sectionId) {
          return {
            ...section,
            subsections: section.subsections.filter(subsection => subsection.id !== item.id)
          };
        }
        return section;
      });
      set({ sections: newSections });
    }
  },

  updateItem: (item) => {
    const { sections } = get();
    if (item.type === 'section' && item.title) {
      const newSections = sections.map(section => 
        section.id === item.id ? { ...section, title: item.title } : section
      );
      set({ sections: newSections });
    } else if (item.type === 'subsection' && item.title && item.sectionId) {
      const newSections = sections.map(section => {
        if (section.id === item.sectionId) {
          return {
            ...section,
            subsections: section.subsections.map(subsection => 
              subsection.id === item.id ? { ...subsection, title: item.title } : subsection
            )
          };
        }
        return section;
      });
      set({ sections: newSections });
    }
  }
})); 