import { FC, useReducer } from 'react'
import { ProviderContext, ProviderReducer } from '.'
import { ProviderI } from '../../interfaces';
interface Props {
    children: React.ReactNode
}

export interface ProviderState {
    providers: ProviderI[];
    totalProviders: number;
    provider: ProviderI | null;
}

export const Provider_INITIAL_STATE: ProviderState = {
    providers: [],
    totalProviders: 0,
    provider: null
}

export const ProviderProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(ProviderReducer, Provider_INITIAL_STATE)
    const setProviders = (providers: ProviderI[], total: number) => {
        dispatch({
            type: '[Provider] - Set Providers', payload: {
                providers,
                totalProviders: total
            }
        })
    }
    const selectProvider = (id: string) => {
        dispatch({ type: '[Provider] - Select Provider', payload: id })
    }
    const addProvider = (provider: ProviderI) => {
        dispatch({ type: '[Provider] - Add Provider', payload: provider })
    }
    const updateProvider = (provider: ProviderI) => {
        dispatch({ type: '[Provider] - Update Provider', payload: provider })
    }
    const deleteProvider = (id: string) => {
        dispatch({ type: '[Provider] - Delete Provider', payload: id })
    }
    return (
        <ProviderContext.Provider
            value={{
                ...state,
                setProviders,
                selectProvider,
                addProvider,
                updateProvider,
                deleteProvider,
            }}
        >
            {children}
        </ProviderContext.Provider>
    );
};
