import { motion } from 'framer-motion';
import { Draggable } from 'react-beautiful-dnd';
import { Settings, Trash2 } from 'lucide-react';
import { Subsection } from '../types';
import { useMenuStore } from '../store/menu.store';

interface SubsectionItemProps {
    subsection: Subsection;
    sectionId: string;
    index: number;
}

export function SubsectionItem({ subsection, sectionId, index }: SubsectionItemProps) {
    const { setSelectedItem, setShowConfirmation } = useMenuStore();

    return (
        <Draggable
            draggableId={subsection.id}
            index={index}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    id={subsection.id}
                    className={`p-3 bg-white border rounded-md flex justify-between items-center ${snapshot.isDragging
                        ? "shadow-md border-amber-300"
                        : "border-gray-200"
                        }`}
                >
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center space-x-2"
                    >
                        <span className="font-medium text-gray-700">
                            {subsection.title}
                        </span>
                        <span className="text-xs text-gray-500">
                            ({subsection.dishes.length} plats)
                        </span>
                    </motion.div>
                    <div className="flex items-center space-x-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-1 rounded-full hover:bg-gray-100"
                            onClick={() => {
                                setSelectedItem({
                                    ...subsection,
                                    type: 'subsection',
                                    sectionId
                                });
                            }}
                        >
                            <Settings size={16} className="text-gray-500" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-1 rounded-full hover:bg-gray-100"
                            onClick={() => {
                                setSelectedItem({
                                    ...subsection,
                                    type: 'subsection',
                                    sectionId
                                });
                                setShowConfirmation(true);
                            }}
                        >
                            <Trash2 size={16} className="text-red-500" />
                        </motion.button>
                    </div>
                </div>
            )}
        </Draggable>
    );
} 