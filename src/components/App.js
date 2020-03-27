import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSocket } from '../utils/useSocket';
import ConfigLoader from './config/ConfigLoader';
import Disconnected from './utils/Disconnected';

function App() {
    const { connected } = useSocket();

    return connected ? <ConfigLoader /> : <Disconnected />;
}

export default App;
