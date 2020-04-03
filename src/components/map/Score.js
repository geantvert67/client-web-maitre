import React from 'react';
import { Modal, Table } from 'react-bootstrap';
import { useTeams } from '../../utils/useTeams';

function Score({ showScore, setShowScore }) {
    const { teams } = useTeams();

    return (
        <Modal show={showScore} onHide={() => setShowScore(false)} centered>
            <Modal.Body>
                {teams && teams.length > 0 ? (
                    <Table borderless>
                        <thead>
                            <tr>
                                <th>Équipe</th>
                                <th>Drapeaux capturés</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team) => (
                                <ScoreItem team={team} />
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
            <th>{team.name}</th>
            <th>{team.nbFlags}</th>
        </tr>
    );
}

export default Score;
