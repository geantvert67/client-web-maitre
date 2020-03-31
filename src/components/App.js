import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSocket } from '../utils/useSocket';
import ConfigLoader from './config/ConfigLoader';
import Disconnected from './utils/Disconnected';
import { ConfigProvider } from '../utils/useConfig';

function App() {
    const { connected } = useSocket();

    return connected ? (
        <ConfigProvider>
            <ConfigLoader />
        </ConfigProvider>
    ) : (
        <Disconnected />
    );
}

export default App;
