import React from 'react';
import { Button } from 'react-bootstrap';
import { useSocket } from '../../utils/useSocket';

function ConfigLauncher() {
    const { socket } = useSocket();

    return (
        <Button variant="success" onClick={() => socket.emit('launchGame')}>
            Lancer immédiatement
        </Button>
    );
}

export default ConfigLauncher;
