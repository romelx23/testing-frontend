import { createContext } from 'react';
import { ProviderI } from '../../interfaces/providers';

interface ContextProps {
    providers: ProviderI[];
    provider: ProviderI | null;
    totalProviders: number;
    setProviders: (providers: ProviderI[], total: number) => void;
    selectProvider: (id: string) => void;
    addProvider: (provider: ProviderI) => void;
    updateProvider: (provider: ProviderI) => void;
    deleteProvider: (id: string) => void;
}

export const ProviderContext = createContext({} as ContextProps)