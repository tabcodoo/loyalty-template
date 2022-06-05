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
                    d="M19.13 4.103c1.102 0 1.995.82 1.995 1.819v14.634c0 1.005-.893 1.819-1.995 1.819H5.12c-1.102 0-1.995-.82-1.995-1.819V5.922c0-1.004.893-1.819 1.995-1.819h14.01zm0 1.37H5.12c-.244 0-.445.16-.487.369l-.008.08v14.634c0 .217.177.403.407.441l.088.008h14.01c.244 0 .445-.16.487-.368l.008-.08V5.921c0-.216-.177-.402-.407-.441l-.088-.007z"></Path>
                <Path
                    fill={fill}
                    fillRule="nonzero"
                    d="M4.088 5.302l16.16.044c.414.001.75.425.749.946-.001.478-.284.872-.65.934l-.102.008-16.16-.045c-.414 0-.75-.424-.749-.946.001-.477.284-.872.65-.933l.102-.008z"></Path>
                <Path
                    stroke={fill}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8.944 13.796l2.119 2.26 4.243-4.243"></Path>
                <Path
                    stroke={fill}
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M8.535 4.582v-1.5m7.181 1.5v-1.5"></Path>
            </G>
        </Svg>
    );
}

export default Icon;
