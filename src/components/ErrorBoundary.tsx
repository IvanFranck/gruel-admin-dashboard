/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { Component } from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
    constructor(props: {}) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Met à jour l'état pour afficher l'UI de repli
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Vous pouvez également enregistrer l'erreur à un service de rapport d'erreurs
        console.error("Une erreur a été capturée :", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Vous pouvez afficher n'importe quel UI de repli
            return <h1>Quelque chose s'est mal passé.</h1>;
        }

        return this.props.children;
    }
}
