import React from 'react';
import { useFlags } from '../../utils/useFlags';
import { useSocket } from '../../utils/useSocket';
import { FlagMarker } from './Markers';

function FlagList() {
    const { socket } = useSocket();
    const { flags, setFlags } = useFlags();

    socket.on('adminRoutine', (o) => {
        if (!localStorage.getItem('moving')) setFlags(o.flags);
    });

    return flags.map((flag) => <FlagMarker key={flag.id} flag={flag} />);
}

export default FlagList;
