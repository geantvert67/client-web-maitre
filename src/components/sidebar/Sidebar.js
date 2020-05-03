import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useConfig } from '../../utils/useConfig';
import { useSocket } from '../../utils/useSocket';
import GameAreaActions from './GameAreaActions';
import Collabsable from './Collapsable';
import ForbiddenAreaActions from './ForbiddenAreaActions';

function Sidebar() {
    const { config } = useConfig();
    const { socket } = useSocket();

    const endGame = () => socket.emit('endGame');

    return (
        <Container className="py-3">
            <h3 className="mb-5 text-center">
                {`${config.name} - ${config.gameMode}`}
            </h3>

            <Collabsable title="Zone de jeu" defaultOpen={true}>
                <GameAreaActions />
            </Collabsable>

            <Collabsable title="Zones interdites" defaultOpen={false}>
                <ForbiddenAreaActions />
            </Collabsable>

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
