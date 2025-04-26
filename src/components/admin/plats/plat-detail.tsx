'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Edit, ArrowLeft } from 'lucide-react';
import { PlatDetailProps } from '@/lib/types/platUI';

export function PlatDetail({ plat, onClose, onEdit }: PlatDetailProps) {
    if (!plat) return null;

    return (
        <Dialog open={!!plat} onOpenChange={() => onClose()}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>{plat.titre}</DialogTitle>
                    <DialogDescription>
                        {plat.sectionNom} / {plat.sousSectionNom}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {plat.image && (
                        <div className="w-full h-48 rounded-md overflow-hidden bg-muted">
                            <img
                                src={plat.image}
                                alt={plat.titre}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium text-sm">Prix</h3>
                            <p className="text-xl font-bold">{plat.prix}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium text-sm mb-1">Description</h3>
                        <p className="text-muted-foreground whitespace-pre-line">
                            {plat.description}
                        </p>
                    </div>
                </div>

                <DialogFooter className="flex justify-between sm:justify-between">
                    <Button variant="outline" onClick={onClose}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour
                    </Button>
                    <Button onClick={() => onEdit(plat)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 