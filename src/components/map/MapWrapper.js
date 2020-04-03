import React, { useState } from 'react';
import moment from 'moment';
import Map from './Map';
import { Alert, Button } from 'react-bootstrap';
import { GameAreaProvider } from '../../utils/useGameAreas';
import { ForbiddenAreaProvider } from '../../utils/useForbiddenAreas';
import { PlayerProvider } from '../../utils/usePlayers';
import { FlagProvider } from '../../utils/useFlags';
import { MarkerProvider } from '../../utils/useMarkers';
import { TeamProvider } from '../../utils/useTeams';
import { useConfig } from '../../utils/useConfig';
import Score from './Score';

function MapWrapper() {
    const { config } = useConfig();
    const [showScore, setShowScore] = useState(false);

    return (
        <TeamProvider>
            {config.willLaunchAt && !config.launched && (
                <Alert className="alert-toast" variant="success">
                    La partie va démarrer le{' '}
                    {moment(config.willLaunchAt).format('D/MM/YYYY à HH:00')}
                </Alert>
            )}

            <GameAreaProvider>
                <ForbiddenAreaProvider>
                    <PlayerProvider>
                        <FlagProvider>
                            <MarkerProvider>
                                <Map />
                            </MarkerProvider>
                        </FlagProvider>
                    </PlayerProvider>
                </ForbiddenAreaProvider>
            </GameAreaProvider>

            <Score showScore={showScore} setShowScore={setShowScore} />

            <Button
                onClick={() => setShowScore(true)}
                className="btn-toast"
                variant="success"
            >
                Score
            </Button>
        </TeamProvider>
    );
}

export default MapWrapper;
