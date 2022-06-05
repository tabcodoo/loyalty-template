import React from 'react';
import {View} from 'react-native';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

function Icon({fill = '#36434D', size = 16}) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <Path d="M0 0H24V24H0z"></Path>
                <Path
                    fill={fill}
                    d="M13.408 2.58l6.704 6.645a3 3 0 01.888 2.13V20a2 2 0 01-2 2h-5v-6.326a2 2 0 10-4 0V22H5a2 2 0 01-2-2v-9.06a2 2 0 01.592-1.421l7-6.939a2 2 0 012.816 0z"></Path>
            </G>
        </Svg>
    );
}

export default Icon;
