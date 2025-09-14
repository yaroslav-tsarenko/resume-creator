"use client"

import React, { createContext, useContext, useState } from 'react';

type PDFContextType = {
    avatar: string | null;
    setAvatar: (img: string | null) => void;
};

const PDFContext = createContext<PDFContextType>({ avatar: null, setAvatar: () => {} });

export const usePDFContext = () => useContext(PDFContext);

export const PDFProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [avatar, setAvatar] = useState<string | null>(null);
    return (
        <PDFContext.Provider value={{ avatar, setAvatar }}>
            {children}
        </PDFContext.Provider>
    );
};