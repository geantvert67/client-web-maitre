import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import PlayerForm from './PlayerForm';

function PlayerActions() {
    const [showModal, setShowModal] = useState(false);

    return (
        <Row className="mt-3 ml-1">
            <Col
                xs="auto"
                className="actions-item"
                onClick={() => setShowModal(true)}
            >
                <FontAwesomeIcon icon={faCog} />
            </Col>

            <PlayerForm
                showModal={showModal}
                handleClose={() => setShowModal(false)}
            />
        </Row>
    );
}

export default PlayerActions;
