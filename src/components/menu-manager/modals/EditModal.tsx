import { motion, AnimatePresence } from 'framer-motion';
import { useMenuStore } from '../store/menu.store';
import { Section } from '../types';

export function EditModal() {
    const {
        editMode,
        selectedItem,
        setEditMode,
        setSelectedItem,
        updateItem,
        sections
    } = useMenuStore();

    if (!editMode || !selectedItem) return null;

    return (
        <AnimatePresence>
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
                                value={selectedItem.title || ''}
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
                                    {sections.map((section: Section) => (
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
                                    if (selectedItem.title) {
                                        updateItem(selectedItem);
                                        setEditMode(false);
                                        setSelectedItem(null);
                                    }
                                }}
                            >
                                Enregistrer
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
} 