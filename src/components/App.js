import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSocket } from '../utils/useSocket';
import ConfigLoader from './config/ConfigLoader';
import Disconnected from './utils/Disconnected';
import { ConfigProvider } from '../utils/useConfig';
import { TeamProvider } from '../utils/useTeams';

function App() {
    const { connected } = useSocket();

    return connected ? (
        <ConfigProvider>
            <TeamProvider>
                <ConfigLoader />
            </TeamProvider>
        </ConfigProvider>
    ) : (
        <Disconnected />
    );
}

export default App;
