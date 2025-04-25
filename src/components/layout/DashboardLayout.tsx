import { AppSidebar } from './AppSidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { Menu } from '../../pages/Menu';
import { Sections } from '../../pages/Sections';
import { SubSections } from '../../pages/SubSections';
import { Dishes } from '../../pages/Dishes';
import { Galery } from '../../pages/Galery';
import { Delivery } from '../../pages/Delivery';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';


export function DashboardLayout() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-100 flex">
                <SidebarProvider>
                    <AppSidebar />
                    <main className="flex-1 p-4">
                        <SidebarTrigger />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/sections" element={<Sections />} />
                            <Route path="/subsections" element={<SubSections />} />
                            <Route path="/dishes" element={<Dishes />} />
                            <Route path="/galery" element={<Galery />} />
                            <Route path="/delivery" element={<Delivery />} />
                        </Routes>
                    </main>
                </SidebarProvider>
            </div>
        </BrowserRouter>
    );
}
