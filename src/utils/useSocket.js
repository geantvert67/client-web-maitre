import React, { createContext, useContext, useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
const socketIo = require('socket.io-client');

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setSocket(
            socketIo(
                `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`
            )
        );
        setLoading(false);
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('connect', () => setConnected(true));
            socket.on('disconnect', () => setConnected(false));
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket, connected }}>
            {loading ? (
                <Spinner animation="border" variant="light" />
            ) : (
                children
            )}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
