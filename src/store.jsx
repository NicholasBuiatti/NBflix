import { useReducer } from 'react';

// DEFINIZIONE DELLO STATO INIZIALE
const initialState = {
    items: JSON.parse(localStorage.getItem('watchlist')) || [], // STATO CHE CONTIENE L'ARRAY NEL LOCALSTORAGE DEL PC
};

// DEFINIZIONE DEL REDUCER
const reducer = (state, action) => {
    switch (action.type) {

        case 'ADD_ITEM': {
            const updatedAddItems = [...state.items, action.payload];
            // SALVO L'ARRAY NEL LOCALSTORAGE
            localStorage.setItem('watchlist', JSON.stringify(updatedAddItems));
            return {
                ...state,
                items: updatedAddItems,
            };
        }

        case 'REMOVE_ITEM': {
            // RIMUOVO UN SINGOLO ELEMENTO
            const updatedItems = state.items.filter(movie => movie.id !== action.payload);
            // SALVO L'ARRAY NEL LOCALSTORAGE
            localStorage.setItem('watchlist', JSON.stringify(updatedItems));
            return { ...state, items: updatedItems };
        }

        case 'SET_ITEMS':
            return { ...state, items: action.payload };

        default:
            return state;
    }
};


// GESTIONE DELLO STORE GLOBALE CON LE FUNZIONI (HOOK PERSONALIZZATO)
export const useGlobalStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addItem = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
        // console.log('reducer');
    };

    const removeItem = (index) => {
        dispatch({ type: 'REMOVE_ITEM', payload: index });
    };

    // AGGIORNO LO STATO DEI DATI SALVATI
    const reloadFromLocalStorage = () => {
        const savedItems = JSON.parse(localStorage.getItem('watchlist')) || [];
        dispatch({ type: 'SET_ITEMS', payload: savedItems });
    };

    return {
        items: state.items,
        addItem,
        removeItem,
        reloadFromLocalStorage,
    };
};