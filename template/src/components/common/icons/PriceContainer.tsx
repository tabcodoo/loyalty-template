import React from 'react';
import Svg, {G, Path, Use, Defs, LinearGradient, Stop, Rect} from 'react-native-svg';

function Icon({fill = '#fff', style = {}}) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="94" height="44" viewBox="0 0 94 44">
            <Path
                fill={fill}
                fillRule="evenodd"
                d="M87.594 43.865H0v-43h87.594a6 6 0 016 6v31a6 6 0 01-6 6z"></Path>
        </Svg>
    );
}

export default Icon;
