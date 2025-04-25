import { motion } from 'framer-motion';
import { Draggable } from 'react-beautiful-dnd';
import { ChevronDown, ChevronRight, Settings, PlusCircle, Trash2 } from 'lucide-react';
import { Section } from '../types';
import { useMenuStore } from '../store/menu.store';
import { SubsectionList } from '../subsections/SubsectionList';

interface SectionItemProps {
    section: Section;
    index: number;
}

export function SectionItem({ section, index }: SectionItemProps) {
    const {
        expandedSections,
        toggleSection,
        addSubsection,
        setSelectedItem,
        setShowConfirmation
    } = useMenuStore();

    const isExpanded = expandedSections[section.id];

    return (
        <Draggable draggableId={section.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    id={section.id}
                    className={`rounded-md overflow-hidden border ${snapshot.isDragging ? "shadow-lg border-indigo-300" : "border-gray-200"
                        }`}
                >
                    <div
                        {...provided.dragHandleProps}
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
                            {isExpanded ? (
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
                                    addSubsection(section.id);
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
                                    setSelectedItem({ ...section, type: 'section' });
                                    setShowConfirmation(true);
                                }}
                            >
                                <Trash2 size={18} className="text-red-500" />
                            </motion.button>
                        </div>
                    </div>

                    {isExpanded && (
                        <SubsectionList
                            sectionId={section.id}
                            subsections={section.subsections}
                        />
                    )}
                </div>
            )}
        </Draggable>
    );
} 