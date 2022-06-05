import React from 'react';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

function Icon({fill = '#0B3039', size = '12'}) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 12 16">
            <Path
                fill={fill}
                d="M5.559-10.938l-2.621-2.621A1.5 1.5 0 001.879-14H-4.5A1.5 1.5 0 00-6-12.5v13A1.5 1.5 0 00-4.5 2h9A1.5 1.5 0 006 .5V-9.876a1.507 1.507 0 00-.441-1.062zM2-12.982a.492.492 0 01.231.131l2.621 2.621a.491.491 0 01.133.23H2zM5 .5a.5.5 0 01-.5.5h-9A.5.5 0 01-5 .5v-13a.5.5 0 01.5-.5H1v3.252A.746.746 0 001.751-9H5zM.5-7.25a.25.25 0 00-.25-.25h-.5a.25.25 0 00-.25.25v2.75h-1.646a.842.842 0 00-.781.523.887.887 0 00.17.963L-.628-.771A.862.862 0 000-.5a.86.86 0 00.628-.271l2.128-2.242a.888.888 0 00.17-.963.842.842 0 00-.781-.524H.5zM1.839-3.5L0-1.562-1.839-3.5z"
                transform="translate(6 14)"></Path>
        </Svg>
    );
}

export default Icon;
