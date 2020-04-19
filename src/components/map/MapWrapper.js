import React, { useState } from 'react';
import moment from 'moment';
import Map from './Map';
import { Alert, Button } from 'react-bootstrap';
import { GameAreaProvider } from '../../utils/useGameAreas';
import { ForbiddenAreaProvider } from '../../utils/useForbiddenAreas';
import { PlayerProvider } from '../../utils/usePlayers';
import { FlagProvider } from '../../utils/useFlags';
import { MarkerProvider } from '../../utils/useMarkers';
import { useConfig } from '../../utils/useConfig';
import Score from './Score';
import { ItemProvider } from '../../utils/useItems';
import Timer from './Timer';

function MapWrapper({ setShowMap }) {
    const { config } = useConfig();
    const [showScore, setShowScore] = useState(false);

    return (
        <>
            {config.willLaunchAt && !config.launched && (
                <>
                    <Alert className="alert-toast" variant="success">
                        La partie va démarrer le{' '}
                        {moment(config.willLaunchAt).format(
                            'DD/MM/YYYY à HH:00'
                        )}
                    </Alert>

                    <Button
                        onClick={() => setShowMap(false)}
                        className="btn-toast-left"
                        variant="light"
                    >
                        Retour
                    </Button>
                </>
            )}

            {config.launched && config.duration && (
                <Timer
                    duration={config.duration}
                    launchedAt={config.launchedAt}
                />
            )}

            <GameAreaProvider>
                <ForbiddenAreaProvider>
                    <PlayerProvider>
                        <FlagProvider>
                            <MarkerProvider>
                                <ItemProvider>
                                    <Map />
                                </ItemProvider>
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
        </>
    );
}

export default MapWrapper;
