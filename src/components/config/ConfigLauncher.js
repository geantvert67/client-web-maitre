import React, { useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import moment from 'moment';
import { useSocket } from '../../utils/useSocket';

function ConfigLauncher() {
    const { socket } = useSocket();
    const [date, setDate] = useState(
        moment().add(1, 'h').format('YYYY-MM-DTHH:00')
    );

    const launchGameAt = () => {
        socket.emit('launchGame', date);
    };

    return (
        <Row>
            <Col xs="12">
                <Button
                    variant="success"
                    onClick={() => socket.emit('launchGame')}
                >
                    Lancer immédiatement
                </Button>
            </Col>

            <Col xs="12" className="mt-3">
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Control
                            type="datetime-local"
                            min={moment().format('YYYY-MM-DTHH:00')}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            step="3600"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button variant="success" onClick={launchGameAt}>
                            Planifier
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default ConfigLauncher;
