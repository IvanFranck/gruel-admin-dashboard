'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenuSub,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react"; // Assurez-vous d'importer les icônes nécessaires
import { Link } from "react-router-dom";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <h1 className="text-lg font-bold">Gruel Traiteur</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/">
                                        <Home className="mr-2" />
                                        Accueil
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/menu">
                                        Gestion du menu
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    Sections & Sous-sections
                                </SidebarMenuButton>
                                <SidebarMenuSub>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to="/sections">
                                                Sections
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenuSub>
                                <SidebarMenuSub>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to="/subsections">
                                                Sous-sections
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenuSub>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dishes">
                                        Gestion des Plats
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/delivery">
                                        Livraison
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/galery">
                                        Galerie
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <p className="text-sm text-gray-500">Version 1.0.0</p>
            </SidebarFooter>
        </Sidebar>
    );
}
