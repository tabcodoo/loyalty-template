import React from 'react';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

function Icon({fill}) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <Path
                fill={fill ? fill : '#CEA589'}
                fillRule="evenodd"
                d="M18.2 30c6.734-1.058 11.885-6.885 11.885-13.915C30.085 8.305 23.781 2 16 2 8.22 2 1.915 8.304 1.915 16.085c0 7.03 5.15 12.857 11.884 13.915v-9.843h-3.578v-4.072H13.8v-3.103c0-3.53 2.102-5.48 5.32-5.48 1.253 0 2.551.182 2.995.25l.14.022.018.003v3.465h-1.776c-1.75 0-2.295 1.086-2.295 2.2v2.643h3.906l-.625 4.072h-3.281V30z"></Path>
        </Svg>
    );
}

export default Icon;
