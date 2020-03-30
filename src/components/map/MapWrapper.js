import React from 'react';
import moment from 'moment';
import Map from './Map';
import { Alert } from 'react-bootstrap';
import { GameAreaProvider } from '../../utils/useGameAreas';
import { ForbiddenAreaProvider } from '../../utils/useForbiddenAreas';
import { PlayerProvider } from '../../utils/usePlayers';

function MapWrapper({ config }) {
    return (
        <>
            {config.willLaunchAt && !config.launched && (
                <Alert className="alert-toast" variant="success">
                    La partie va démarrer le{' '}
                    {moment(config.willLaunchAt).format('D/MM/YYYY à HH:00')}
                </Alert>
            )}
            <GameAreaProvider>
                <ForbiddenAreaProvider>
                    <PlayerProvider>
                        <Map />
                    </PlayerProvider>
                </ForbiddenAreaProvider>
            </GameAreaProvider>
        </>
    );
}

export default MapWrapper;
