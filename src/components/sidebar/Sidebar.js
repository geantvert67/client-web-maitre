import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useConfig } from '../../utils/useConfig';
import { useSocket } from '../../utils/useSocket';

function Sidebar() {
    const { config } = useConfig();
    const { socket } = useSocket();

    const endGame = () => socket.emit('endGame');

    return (
        <Container className="py-3">
            <h3 className="text-center">
                {`${config.name} - ${config.gameMode}`}
            </h3>

            <Row className="mt-5 justify-content-end">
                <Col xs="auto">
                    <Button variant="danger" onClick={endGame}>
                        Terminer la partie
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Sidebar;
