import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Save } from 'lucide-react';
import { useMenuStore } from '../store/menu.store';

export function ConfirmationModal() {
    const {
        showConfirmation,
        selectedItem,
        setShowConfirmation,
        deleteItem
    } = useMenuStore();

    if (!showConfirmation || !selectedItem) return null;

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
                    className="bg-white rounded-lg shadow-xl p-6 w-96"
                >
                    {selectedItem.message ? (
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
                                Êtes-vous sûr de vouloir supprimer {selectedItem.type === 'section' ? 'cette section' : 'cette sous-section'} ?
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
                                    onClick={() => {
                                        deleteItem(selectedItem);
                                        setShowConfirmation(false);
                                    }}
                                >
                                    Supprimer
                                </motion.button>
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
} 