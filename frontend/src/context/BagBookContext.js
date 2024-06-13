import { createContext, useReducer } from "react";

export const BagBookContext = createContext();

export const bagbookReducer = (state, action) => {
    switch(action.type) {
        case 'SET_BAGBOOKS':
            return {
                bagbooks: action.payload
            };
        case 'CREATE_BAGBOOK':
            return {
                bagbooks: [action.payload, ...state.bagbooks]
            };
        case 'DELETE_BAGBOOK':
            return {
                bagbooks: state.bagbooks.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state;
    }
};

export const BagBookContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bagbookReducer, {
        bagbooks: []
    });

    return (
        <BagBookContext.Provider value={{...state, dispatch}}>
            { children }
        </BagBookContext.Provider>
    )
};