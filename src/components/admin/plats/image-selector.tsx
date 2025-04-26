'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImagePlus, X } from 'lucide-react';

interface ImageSelectorProps {
    currentImage?: string;
    onImageSelect: (imageUrl: string) => void;
}

export function ImageSelector({ currentImage = '', onImageSelect }: ImageSelectorProps) {
    const [imageUrl, setImageUrl] = useState(currentImage);
    const [showUrlInput, setShowUrlInput] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (loadEvent) => {
                const result = loadEvent.target?.result as string;
                setImageUrl(result);
                onImageSelect(result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onImageSelect(imageUrl);
        setShowUrlInput(false);
    };

    const handleRemoveImage = () => {
        setImageUrl('');
        onImageSelect('');
    };

    return (
        <div className="space-y-4">
            {imageUrl ? (
                <div className="relative">
                    <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden">
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={handleRemoveImage}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center w-full aspect-video bg-muted rounded-md border-2 border-dashed border-muted-foreground/50 p-4">
                    <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                        Glissez-déposez une image ou cliquez pour la sélectionner
                    </p>
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                        accept="image/*"
                    />
                </div>
            )}

            {showUrlInput ? (
                <form onSubmit={handleUrlSubmit} className="flex space-x-2">
                    <Input
                        type="url"
                        placeholder="https://exemple.com/image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit">Valider</Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowUrlInput(false)}
                    >
                        Annuler
                    </Button>
                </form>
            ) : (
                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowUrlInput(true)}
                >
                    Ou utiliser une URL
                </Button>
            )}
        </div>
    );
} 