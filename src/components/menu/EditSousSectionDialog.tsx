import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMenuStore } from '@/lib/store/menuStore';
import { SousSection } from '@/lib/types/menu';

const formSchema = z.object({
    nom: z.string().min(1, 'Le nom est requis'),
});

interface EditSousSectionDialogProps {
    sectionId: string;
    sousSection: SousSection;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditSousSectionDialog({
    sectionId,
    sousSection,
    open,
    onOpenChange,
}: EditSousSectionDialogProps) {
    const updateSousSection = useMenuStore((state) => state.updateSousSection);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: sousSection.nom,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        updateSousSection(sectionId, sousSection.id, {
            nom: values.nom,
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modifier la sous-section</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="nom"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom de la sous-section</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Annuler
                            </Button>
                            <Button type="submit">Enregistrer</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 