import React from 'react';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

function Icon({fill = '#333', size = 24}) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size + 1} viewBox="0 0 24 25">
            <Path
                fill={fill}
                fillRule="evenodd"
                d="M17.063 21.4a2.813 2.813 0 002.812-2.813V7.9H16.5c0-2.481-2.019-4.5-4.5-4.5S7.5 5.419 7.5 7.9H4.125v10.688A2.814 2.814 0 006.938 21.4h10.125zM15.374 7.9h-6.75c0-1.861 1.514-3.375 3.375-3.375s3.375 1.514 3.375 3.375zm1.688 12.375H6.938a1.69 1.69 0 01-1.688-1.688V9.026H7.5v1.688a.563.563 0 001.125-.001V9.026h6.75v1.688a.563.563 0 001.125-.001V9.026h2.25v9.563a1.69 1.69 0 01-1.688 1.687z"></Path>
        </Svg>
    );
}

export default Icon;
