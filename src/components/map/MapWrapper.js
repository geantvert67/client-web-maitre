import React from 'react';
import moment from 'moment';
import Map from './Map';
import { Alert } from 'react-bootstrap';

function MapWrapper({ config }) {
    return (
        <>
            {config.willLaunchAt && !config.launched && (
                <Alert className="alert-toast" variant="success">
                    La partie va démarrer le{' '}
                    {moment(config.willLaunchAt).format('D/MM/YYYY à HH:00')}
                </Alert>
            )}
            <Map />
        </>
    );
}

export default MapWrapper;
