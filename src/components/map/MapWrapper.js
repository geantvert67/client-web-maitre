import React from 'react';
import moment from 'moment';

function MapWrapper({ config }) {
    return (
        <>
            {config.willLaunchAt && !config.launched && (
                <p>
                    La partie va démarrer le{' '}
                    {moment(config.willLaunchAt).format('D/MM/YYYY à HH:00')}
                </p>
            )}
            <h1>map</h1>
        </>
    );
}

export default MapWrapper;
