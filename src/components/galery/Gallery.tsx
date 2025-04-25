'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../ui/alert-dialog';
import { toast } from 'sonner';

type ImageItem = {
    id: string;
    url: string;
    name: string;
};

export function Gallery() {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [imageToDelete, setImageToDelete] = useState<ImageItem | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages: ImageItem[] = Array.from(files).map((file) => ({
            id: crypto.randomUUID(),
            url: URL.createObjectURL(file),
            name: file.name,
        }));

        setImages((prevImages) => [...prevImages, ...newImages]);
        toast.success(`${newImages.length} image(s) ajoutée(s) à la galerie.`);
    };

    const handleDeleteClick = (image: ImageItem) => {
        setImageToDelete(image);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (imageToDelete) {
            setImages((prevImages) =>
                prevImages.filter((img) => img.id !== imageToDelete.id)
            );
            URL.revokeObjectURL(imageToDelete.url);
            toast.success("L'image a été supprimée de la galerie.");
        }
        setIsDeleteDialogOpen(false);
        setImageToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false);
        setImageToDelete(null);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4">Galerie d'images</h1>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="hidden"
                    />
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full sm:w-auto"
                    >
                        Ajouter des images
                    </Button>
                    <p className="text-sm text-gray-500">
                        Glissez-déposez des images ou cliquez pour sélectionner
                    </p>
                </div>
            </div>

            {images.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <p className="text-gray-500">Aucune image dans la galerie</p>
                    <p className="text-sm text-gray-400 mt-2">
                        Ajoutez des images pour commencer
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="relative group rounded-lg overflow-hidden border border-gray-200"
                        >
                            <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    onClick={() => handleDeleteClick(image)}
                                >
                                    Supprimer
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer cette image ? Cette action est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancelDelete}>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete}>Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
} 