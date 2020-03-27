import React, { useEffect, useState } from 'react';
import { useSocket } from '../../utils/useSocket';
import { Row, Col, Spinner } from 'react-bootstrap';

function ConfigLoader() {
    const { socket } = useSocket();
    const [config, setConfig] = useState(null);

    useEffect(() => {
        socket.on('getConfig', (c) => setConfig(c));
        socket.emit('getConfig');
    }, []);

    return config ? (
        config.launched ? (
            <p>map</p>
        ) : (
            <p>équipes</p>
        )
    ) : (
        <Row className="justify-content-center">
            <Col xs="auto">
                <Spinner animation="border" variant="light" />
            </Col>
        </Row>
    );
}

export default ConfigLoader;
