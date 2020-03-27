import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSocket } from '../utils/useSocket';

function App() {
    const { connected } = useSocket();

    return connected ? <p>ok</p> : <p>pas ok</p>;
}

export default App;
