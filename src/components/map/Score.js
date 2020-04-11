import React from 'react';
import { Modal, Table, Row, Col } from 'react-bootstrap';
import { useTeams } from '../../utils/useTeams';

function Score({ showScore, setShowScore }) {
    const { teams } = useTeams();

    return (
        <Modal show={showScore} onHide={() => setShowScore(false)} centered>
            <Modal.Body>
                {teams && teams.length > 0 ? (
                    <Table className="mb-0" borderless responsive>
                        <thead>
                            <tr>
                                <th>Équipe</th>
                                <th>Drapeaux capturés</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team) => (
                                <ScoreItem key={team.id} team={team} />
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    'Impossible de récupérer les équipes'
                )}
            </Modal.Body>
        </Modal>
    );
}

function ScoreItem({ team }) {
    return (
        <tr>
            <th>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <div
                            className="team-color-small"
                            style={{ backgroundColor: team.color }}
                        ></div>
                    </Col>
                    <Col xs="auto">{team.name}</Col>
                </Row>
            </th>
            <th>{team.nbFlags}</th>
        </tr>
    );
}

export default Score;
