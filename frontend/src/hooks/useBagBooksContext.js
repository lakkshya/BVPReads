import { BagBookContext } from "../context/BagBookContext";
import { useContext } from "react";

export const useBagBooksContext = () => {
    const context = useContext(BagBookContext);

    if(!context) {
        throw Error('useBagBooksContext must be used inside a BagBookContextProvider');
    }

    return context;
};