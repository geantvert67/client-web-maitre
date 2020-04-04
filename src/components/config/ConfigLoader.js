import React, { useEffect, useState } from 'react';
import { useSocket } from '../../utils/useSocket';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Config from './Config';
import MapWrapper from '../map/MapWrapper';
import { useConfig } from '../../utils/useConfig';

function ConfigLoader() {
    const { socket } = useSocket();
    const { config, setConfig } = useConfig();
    const [showMap, setShowMap] = useState(true);

    useEffect(() => {
        socket.on('getConfig', (c) => setConfig(c));
        socket.emit('getConfig');
    }, []);

    return config ? (
        (config.launched || config.willLaunchAt) && showMap ? (
            <MapWrapper setShowMap={setShowMap} />
        ) : (
            <Config setShowMap={setShowMap} />
        )
    ) : (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Spinner animation="border" variant="light" />
                </Col>
            </Row>
        </Container>
    );
}

export default ConfigLoader;
