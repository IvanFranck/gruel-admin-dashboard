import { Gallery } from '../components/galery/Gallery';
import { Toaster } from 'sonner';

export function Galery() {
    return (
        <div>
            <Gallery />
            <Toaster position="top-right" />
        </div>
    );
}
