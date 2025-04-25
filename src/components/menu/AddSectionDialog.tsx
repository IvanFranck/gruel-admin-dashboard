import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMenuStore } from '@/lib/store/menuStore';
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
    nom: z.string().min(1, 'Le nom est requis'),
});

interface AddSectionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddSectionDialog({ open, onOpenChange }: AddSectionDialogProps) {
    const addSection = useMenuStore((state) => state.addSection);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        addSection({
            id: uuidv4(),
            nom: values.nom,
            sousSections: [],
            visible: true,
        });
        form.reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter une section</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="nom"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom de la section</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Au Magasin" {...field} />
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
                            <Button type="submit">Ajouter</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 