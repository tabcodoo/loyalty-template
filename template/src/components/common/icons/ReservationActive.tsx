import React from 'react';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

function Icon({fill = '#143154', size = 16, thin = false}) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <G fill="none" fillRule="evenodd">
                <Path d="M.125.375h24v24h-24z"></Path>
                <Path
                    fill={fill}
                    fillRule="nonzero"
                    d="M19.13 4.103c1.102 0 1.995.82 1.995 1.819v14.634c0 1.005-.893 1.819-1.995 1.819H5.12c-1.102 0-1.995-.82-1.995-1.819V5.922c0-1.004.893-1.819 1.995-1.819h14.01zm-3.294 7.18a.749.749 0 00-1.06 0l-3.696 3.694-1.589-1.694-.081-.076a.75.75 0 00-1.013 1.101l2.119 2.26.084.077a.749.749 0 00.993-.06l4.243-4.242.073-.084a.75.75 0 00-.073-.976z"></Path>
                <Path
                    fill={fill}
                    fillRule="nonzero"
                    d="M8.535 2.332a.75.75 0 01.743.648l.007.102v1.5a.75.75 0 01-1.493.102l-.007-.102v-1.5a.75.75 0 01.75-.75zm7.18 0a.75.75 0 01.743.648l.007.102v1.5a.75.75 0 01-1.493.102l-.007-.102v-1.5a.75.75 0 01.75-.75z"></Path>
            </G>
        </Svg>
    );
}

export default Icon;
