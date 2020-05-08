import React, { useState, createContext, useContext, useEffect } from 'react';
import { useSocket } from './useSocket';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState(null);
    const { socket } = useSocket();

    useEffect(() => {
        socket.on('getConfig', (c) => setConfig(c));
    }, []);

    return (
        <ConfigContext.Provider value={{ config, setConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
