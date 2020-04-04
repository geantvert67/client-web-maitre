import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TeamsList from '../teams/TeamsList';
import ConfigLauncher from './ConfigLauncher';
import ConfigVisibility from './ConfigVisibility';
import { useConfig } from '../../utils/useConfig';

function Config({ setShowMap }) {
    const { config } = useConfig();

    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>{`${config.name} - ${config.gameMode}`}</h3>

                    <h5 className="mb-4">Visibilité</h5>
                    <ConfigVisibility published={config.published} />

                    <h5 className="mt-5 mb-4">Lancement</h5>
                    <ConfigLauncher
                        launched={config.launched}
                        planned={config.willLaunchAt}
                        setShowMap={setShowMap}
                    />

                    <h5 className="mt-5 mb-4">Équipes</h5>
                    <TeamsList maxPlayers={config.maxPlayers} />
                </Col>
            </Row>
        </Container>
    );
}

export default Config;
