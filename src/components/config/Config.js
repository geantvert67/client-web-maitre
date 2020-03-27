import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TeamsList from '../teams/TeamsList';
import ConfigLauncher from './ConfigLauncher';

function Config({ config }) {
    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>{`${config.name} - ${config.gameMode}`}</h3>

                    <h5 className="mb-4">Lancement</h5>
                    <ConfigLauncher />

                    <h5 className="mt-5 mb-4">Équipes</h5>
                    <TeamsList maxPlayers={config.maxPlayers} />
                </Col>
            </Row>
        </Container>
    );
}

export default Config;
