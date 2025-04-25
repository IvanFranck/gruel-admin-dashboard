import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { PlusCircle, Trash2, Save, Eye, Settings, ChevronRight, ChevronDown, AlertTriangle } from 'lucide-react';

// Types and interfaces
interface Dish {
  id: string;
  title: string;
  price: string;
}

interface Subsection {
  id: string;
  title: string;
  dishes: Dish[];
}

interface Section {
  id: string;
  title: string;
  subsections: Subsection[];
}

interface StaticPage {
  id: string;
  title: string;
  type: 'static';
}

interface ExpandedSections {
  [key: string]: boolean;
}

interface SelectedItem {
  id?: string;
  title?: string;
  type?: 'section' | 'subsection';
  sectionId?: string;
  message?: string;
}

// Données d'exemple pour la démonstration
const initialSections: Section[] = [
  {
    id: "section-1",
    title: "Au Magasin",
    subsections: [
      {
        id: "subsection-1-1",
        title: "Les Entrées",
        dishes: [
          { id: "dish-1-1-1", title: "Salade Périgourdine", price: "8.50€" },
          { id: "dish-1-1-2", title: "Terrine de Canard", price: "7.90€" },
        ]
      },
      {
        id: "subsection-1-2",
        title: "Les Plats",
        dishes: [
          { id: "dish-1-2-1", title: "Blanquette de Veau", price: "12.50€" },
          { id: "dish-1-2-2", title: "Coq au Vin", price: "11.90€" },
        ]
      }
    ]
  },
  {
    id: "section-2",
    title: "St Valentin",
    subsections: [
      {
        id: "subsection-2-1",
        title: "Menu Duo",
        dishes: [
          { id: "dish-2-1-1", title: "Menu St Valentin Complet", price: "49.90€" },
        ]
      }
    ]
  }
];

const staticPages: StaticPage[] = [
  { id: "page-1", title: "Accueil", type: "static" },
  { id: "page-2", title: "Livraison", type: "static" },
  { id: "page-3", title: "Contact", type: "static" }
];

const MenuManager = () => {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [pages, setPages] = useState<StaticPage[]>(staticPages);
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Initialiser tous les sections comme expanded par défaut
  useEffect(() => {
    const expanded = {};
    sections.forEach(section => {
      expanded[section.id] = true;
    });
    setExpandedSections(expanded);
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    // Si pas de destination ou même position, ne rien faire
    if (!destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)) {
      return;
    }

    // Animation de succès
    const element = document.getElementById(draggableId);
    if (element) {
      element.classList.add("bg-green-100");
      setTimeout(() => {
        element.classList.remove("bg-green-100");
      }, 500);
    }

    // Logique pour les sections
    if (type === 'section') {
      const newSections = Array.from(sections);
      const [removed] = newSections.splice(source.index, 1);
      newSections.splice(destination.index, 0, removed);
      setSections(newSections);
      return;
    }

    // Logique pour les pages statiques
    if (type === 'static-page') {
      const newPages = Array.from(pages);
      const [removed] = newPages.splice(source.index, 1);
      newPages.splice(destination.index, 0, removed);
      setPages(newPages);
      return;
    }

    // Logique pour les sous-sections
    if (type === 'subsection') {
      const sourceSectionId = source.droppableId.split('-drop')[0];
      const destSectionId = destination.droppableId.split('-drop')[0];

      if (sourceSectionId === destSectionId) {
        // Réorganisation dans la même section
        const sectionIndex = sections.findIndex(s => s.id === sourceSectionId);
        const newSubsections = Array.from(sections[sectionIndex].subsections);
        const [removed] = newSubsections.splice(source.index, 1);
        newSubsections.splice(destination.index, 0, removed);

        const newSections = [...sections];
        newSections[sectionIndex] = {
          ...newSections[sectionIndex],
          subsections: newSubsections
        };

        setSections(newSections);
      } else {
        // Déplacement entre différentes sections
        const sourceSectionIndex = sections.findIndex(s => s.id === sourceSectionId);
        const destSectionIndex = sections.findIndex(s => s.id === destSectionId);

        const newSourceSubsections = Array.from(sections[sourceSectionIndex].subsections);
        const [removed] = newSourceSubsections.splice(source.index, 1);

        const newDestSubsections = Array.from(sections[destSectionIndex].subsections);
        newDestSubsections.splice(destination.index, 0, removed);

        const newSections = [...sections];
        newSections[sourceSectionIndex] = {
          ...newSections[sourceSectionIndex],
          subsections: newSourceSubsections
        };
        newSections[destSectionIndex] = {
          ...newSections[destSectionIndex],
          subsections: newDestSubsections
        };

        setSections(newSections);
      }
    }
  };

  const handleAddSection = () => {
    const newSectionId = `section-${sections.length + 1}-${Date.now()}`;
    const newSection = {
      id: newSectionId,
      title: "Nouvelle Section",
      subsections: []
    };

    setSections([...sections, newSection]);
    setExpandedSections(prev => ({
      ...prev,
      [newSectionId]: true
    }));

    // Animation de succès
    setTimeout(() => {
      const element = document.getElementById(newSectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.classList.add("bg-green-100");
        setTimeout(() => {
          element.classList.remove("bg-green-100");
        }, 1000);
      }
    }, 100);
  };

  const handleAddSubsection = (sectionId: string) => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex === -1) return;

    const newSubsectionId = `subsection-${sectionId}-${sections[sectionIndex].subsections.length + 1}-${Date.now()}`;
    const newSubsection = {
      id: newSubsectionId,
      title: "Nouvelle Sous-section",
      dishes: []
    };

    const newSections = [...sections];
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      subsections: [...newSections[sectionIndex].subsections, newSubsection]
    };

    setSections(newSections);

    // Animation de succès
    setTimeout(() => {
      const element = document.getElementById(newSubsectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.classList.add("bg-green-100");
        setTimeout(() => {
          element.classList.remove("bg-green-100");
        }, 1000);
      }
    }, 100);
  };

  const confirmDelete = (item: SelectedItem) => {
    setSelectedItem(item);
    setShowConfirmation(true);
  };

  const handleDelete = () => {
    if (!selectedItem) return;

    if (selectedItem.type === 'section') {
      setSections(sections.filter(section => section.id !== selectedItem.id));
    } else if (selectedItem.type === 'subsection') {
      const newSections = sections.map(section => {
        if (section.id === selectedItem.sectionId) {
          return {
            ...section,
            subsections: section.subsections.filter(subsection => subsection.id !== selectedItem.id)
          };
        }
        return section;
      });
      setSections(newSections);
    }

    setShowConfirmation(false);
    setSelectedItem(null);
  };

  const handleSave = () => {
    // Simulation d'une sauvegarde avec animation
    const saveBtn = document.getElementById('save-button');
    if (saveBtn) {
      saveBtn.classList.add("animate-pulse");
      setTimeout(() => {
        saveBtn.classList.remove("animate-pulse");
        // Afficher notification de succès
        setShowConfirmation(true);
        setSelectedItem({
          id: 'success',
          title: 'Success',
          type: 'section',
          message: "Menu sauvegardé avec succès!"
        });
        setTimeout(() => {
          setShowConfirmation(false);
          setSelectedItem(null);
        }, 2000);
      }, 1000);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Gestionnaire de Menu</h1>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md flex items-center space-x-2 hover:bg-blue-100 transition-colors"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye size={18} />
            <span>Aperçu</span>
          </motion.button>
          <motion.button
            id="save-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center space-x-2 hover:bg-green-700 transition-colors"
            onClick={handleSave}
          >
            <Save size={18} />
            <span>Enregistrer</span>
          </motion.button>
        </div>
      </header>

      {/* Main content area */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-6">
          {/* Left panel - Menu Structure */}
          <div className="w-2/3 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Structure du Menu</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-md flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
                onClick={handleAddSection}
              >
                <PlusCircle size={18} />
                <span>Ajouter une Section</span>
              </motion.button>
            </div>

            <div className="bg-gray-50 p-4 mb-6 rounded-md border border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Aide :</span> Glissez-déposez les éléments pour réorganiser le menu.
                Cliquez sur le titre d'une section pour l'ouvrir ou la fermer.
                Utilisez les boutons + pour ajouter des sous-sections.
              </p>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              {/* Pages statiques */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-600 mb-3">Pages Statiques</h3>
                <Droppable droppableId="static-pages" type="static-page">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {pages.map((page, index) => (
                        <Draggable
                          key={page.id}
                          draggableId={page.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              id={page.id}
                              className={`p-3 bg-blue-50 border border-blue-200 rounded-md shadow-sm flex justify-between items-center ${snapshot.isDragging ? "shadow-md bg-blue-100" : ""
                                }`}
                            >
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <span className="font-medium text-blue-800">{page.title}</span>
                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">Page Statique</span>
                              </motion.div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Sections dynamiques */}
              <div>
                <h3 className="text-md font-medium text-gray-600 mb-3">Sections Dynamiques</h3>
                <Droppable droppableId="sections" type="section">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {sections.map((section, index) => (
                        <Draggable
                          key={section.id}
                          draggableId={section.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              id={section.id}
                              className={`rounded-md overflow-hidden border ${snapshot.isDragging ? "shadow-lg border-indigo-300" : "border-gray-200"
                                }`}
                            >
                              <div
                                className={`p-4 flex justify-between items-center cursor-pointer ${snapshot.isDragging ? "bg-indigo-50" : "bg-white"
                                  }`}
                                onClick={() => toggleSection(section.id)}
                              >
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center space-x-2"
                                >
                                  {expandedSections[section.id] ? (
                                    <ChevronDown size={20} className="text-gray-500" />
                                  ) : (
                                    <ChevronRight size={20} className="text-gray-500" />
                                  )}
                                  <h3 className="font-medium text-gray-800">{section.title}</h3>
                                  <span className="text-xs text-gray-500">
                                    ({section.subsections.length} sous-sections)
                                  </span>
                                </motion.div>
                                <div className="flex items-center space-x-2">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-1.5 rounded-full hover:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditMode(true);
                                      setSelectedItem({ ...section, type: 'section' });
                                    }}
                                  >
                                    <Settings size={18} className="text-gray-500" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-1.5 rounded-full hover:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddSubsection(section.id);
                                    }}
                                  >
                                    <PlusCircle size={18} className="text-green-500" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-1.5 rounded-full hover:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      confirmDelete({ ...section, type: 'section' });
                                    }}
                                  >
                                    <Trash2 size={18} className="text-red-500" />
                                  </motion.button>
                                </div>
                              </div>

                              {/* Subsections */}
                              <AnimatePresence>
                                {expandedSections[section.id] && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <Droppable
                                      droppableId={`${section.id}-drop`}
                                      type="subsection"
                                    >
                                      {(provided) => (
                                        <div
                                          {...provided.droppableProps}
                                          ref={provided.innerRef}
                                          className="bg-gray-50 p-3 pl-8 space-y-2"
                                        >
                                          {section.subsections.map((subsection, subIndex) => (
                                            <Draggable
                                              key={subsection.id}
                                              draggableId={subsection.id}
                                              index={subIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <div
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  ref={provided.innerRef}
                                                  id={subsection.id}
                                                  className={`p-3 bg-white border rounded-md flex justify-between items-center ${snapshot.isDragging
                                                    ? "shadow-md border-amber-300"
                                                    : "border-gray-200"
                                                    }`}
                                                >
                                                  <div className="flex items-center space-x-2">
                                                    <motion.div
                                                      initial={{ opacity: 0, x: -10 }}
                                                      animate={{ opacity: 1, x: 0 }}
                                                      transition={{ delay: subIndex * 0.05 }}
                                                    >
                                                      <span className="font-medium text-gray-700">
                                                        {subsection.title}
                                                      </span>
                                                      <span className="text-xs text-gray-500">
                                                        ({subsection.dishes.length} plats)
                                                      </span>
                                                    </motion.div>
                                                  </div>
                                                  <div className="flex items-center space-x-2">
                                                    <motion.button
                                                      whileHover={{ scale: 1.05 }}
                                                      whileTap={{ scale: 0.95 }}
                                                      className="p-1 rounded-full hover:bg-gray-100"
                                                      onClick={() => {
                                                        setEditMode(true);
                                                        setSelectedItem({
                                                          ...subsection,
                                                          type: 'subsection',
                                                          sectionId: section.id
                                                        });
                                                      }}
                                                    >
                                                      <Settings size={16} className="text-gray-500" />
                                                    </motion.button>
                                                    <motion.button
                                                      whileHover={{ scale: 1.05 }}
                                                      whileTap={{ scale: 0.95 }}
                                                      className="p-1 rounded-full hover:bg-gray-100"
                                                      onClick={() => confirmDelete({
                                                        ...subsection,
                                                        type: 'subsection',
                                                        sectionId: section.id
                                                      })}
                                                    >
                                                      <Trash2 size={16} className="text-red-500" />
                                                    </motion.button>
                                                  </div>
                                                </div>
                                              )}
                                            </Draggable>
                                          ))}
                                          {provided.placeholder}
                                          {section.subsections.length === 0 && (
                                            <div className="p-4 text-center text-gray-500 italic text-sm">
                                              Aucune sous-section dans cette catégorie.
                                              <br />
                                              <button
                                                className="text-indigo-600 hover:underline mt-1"
                                                onClick={() => handleAddSubsection(section.id)}
                                              >
                                                Ajouter une sous-section
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </Droppable>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>
          </div>

          {/* Right panel - Preview */}
          <div className="w-1/3">
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 sticky top-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Aperçu du Menu</h2>

              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-800 p-3 text-white font-medium">
                  Menu Gruel Traiteur
                </div>
                <div className="p-2 bg-gray-50 max-h-[600px] overflow-y-auto">
                  <ul className="space-y-1">
                    {pages.map(page => (
                      <li key={page.id} className="py-2 px-3 hover:bg-blue-50 rounded cursor-pointer transition-colors">
                        <span className="text-blue-700">{page.title}</span>
                      </li>
                    ))}

                    {sections.map(section => (
                      <li key={section.id} className="my-1">
                        <div className="py-2 px-3 hover:bg-indigo-50 rounded cursor-pointer transition-colors font-medium flex justify-between">
                          <span>{section.title}</span>
                          <ChevronDown size={16} className="text-gray-500" />
                        </div>
                        <ul className="ml-4 border-l-2 border-gray-200 pl-2 space-y-1 mt-1">
                          {section.subsections.map(subsection => (
                            <li
                              key={subsection.id}
                              className="py-1.5 px-3 hover:bg-amber-50 rounded cursor-pointer transition-colors"
                            >
                              {subsection.title}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Aide</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Réorganisez les sections par glisser-déposer</li>
                  <li>• Ajoutez de nouvelles sections ou sous-sections</li>
                  <li>• Cliquez sur une section pour voir ses sous-sections</li>
                  <li>• N'oubliez pas d'enregistrer vos modifications</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Confirmation dialog */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl p-6 w-96"
            >
              {selectedItem && selectedItem.message ? (
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <Save className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Succès</h3>
                  <p className="text-gray-600">{selectedItem.message}</p>
                </div>
              ) : (
                <>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Confirmer la suppression</h3>
                  <p className="text-gray-600 mb-4">
                    Êtes-vous sûr de vouloir supprimer {selectedItem?.type === 'section' ? 'cette section' : 'cette sous-section'} ?
                    Cette action ne peut pas être annulée.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
                      onClick={() => setShowConfirmation(false)}
                    >
                      Annuler
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md"
                      onClick={handleDelete}
                    >
                      Supprimer
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit modal */}
      <AnimatePresence>
        {editMode && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl p-6 w-[500px]"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {selectedItem.type === 'section' ? 'Modifier la Section' : 'Modifier la Sous-section'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                  <input
                    type="text"
                    value={selectedItem.title}
                    onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {selectedItem.type === 'section' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Visibilité</label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" checked />
                        <span className="ml-2 text-gray-700">Visible dans le menu</span>
                      </label>
                    </div>
                  </div>
                )}

                {selectedItem.type === 'subsection' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section parente</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={selectedItem.sectionId}
                    >
                      {sections.map(section => (
                        <option key={section.id} value={section.id}>{section.title}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex justify-end space-x-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
                    onClick={() => {
                      setEditMode(false);
                      setSelectedItem(null);
                    }}
                  >
                    Annuler
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                    onClick={() => {
                      // Logique de mise à jour de l'élément
                      if (selectedItem?.type === 'section' && selectedItem.title) {
                        const newSections = sections.map(section =>
                          section.id === selectedItem.id ? { ...section, title: selectedItem.title } : section
                        );
                        setSections(newSections);
                      } else if (selectedItem?.type === 'subsection' && selectedItem.title) {
                        const newSections = sections.map(section => {
                          if (section.id === selectedItem.sectionId) {
                            return {
                              ...section,
                              subsections: section.subsections.map(subsection =>
                                subsection.id === selectedItem.id ? { ...subsection, title: selectedItem.title } : subsection
                              )
                            };
                          }
                          return section;
                        });
                        setSections(newSections);
                      }

                      setEditMode(false);
                      setSelectedItem(null);

                      // Animation de succès
                      setTimeout(() => {
                        const saveBtn = document.getElementById('save-button');
                        if (saveBtn) {
                          saveBtn.classList.add("animate-pulse");
                          setTimeout(() => {
                            saveBtn.classList.remove("animate-pulse");
                          }, 1000);
                        }
                      }, 300);
                    }}
                  >
                    Enregistrer
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl p-6 w-[800px] max-h-[90vh] overflow-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Aperçu du Site</h3>
                <button
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setShowPreview(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="border rounded-md overflow-hidden">
                <div className="bg-white p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-xl text-gray-800">Gruel Traiteur</div>
                    <div className="flex space-x-6">
                      {pages.map(page => (
                        <div key={page.id} className="text-gray-600 hover:text-indigo-600 cursor-pointer">
                          {page.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex">
                  {/* Menu latéral */}
                  <div className="w-1/4 bg-gray-50 p-4 border-r">
                    <h3 className="font-medium text-gray-700 mb-3">Menu</h3>
                    <ul className="space-y-4">
                      {sections.map(section => (
                        <li key={section.id}>
                          <div className="font-medium text-gray-800 mb-2">{section.title}</div>
                          <ul className="ml-3 space-y-1">
                            {section.subsections.map(subsection => (
                              <li
                                key={subsection.id}
                                className="text-gray-600 hover:text-indigo-600 cursor-pointer"
                              >
                                {subsection.title}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contenu principal */}
                  <div className="w-3/4 p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Au Magasin</h2>

                    {sections[0]?.subsections.map(subsection => (
                      <div key={subsection.id} className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">{subsection.title}</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {subsection.dishes.map(dish => (
                            <div key={dish.id} className="flex justify-between border-b pb-3">
                              <div>
                                <div className="font-medium">{dish.title}</div>
                              </div>
                              <div className="font-semibold text-gray-700">{dish.price}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="text-center mt-8 text-gray-500 italic">
                      Ceci est un aperçu simplifié du rendu final sur le site.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuManager;