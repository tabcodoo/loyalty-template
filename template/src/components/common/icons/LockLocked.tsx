import React from 'react';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

function Icon({fill = '#fff', size = 16}) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16">
            <Path
                fill={fill}
                fillRule="evenodd"
                d="M11.437 13c.518 0 .938-.42.938-.937v-3.75a.938.938 0 00-.938-.938h-.312v-1.22c0-1.727-1.389-3.15-3.115-3.155a3.127 3.127 0 00-3.135 3.125v1.25h-.312a.938.938 0 00-.938.938v3.75c0 .517.42.937.938.937h6.874zM10.5 7.375h-5v-1.25c0-1.379 1.121-2.5 2.5-2.5s2.5 1.121 2.5 2.5v1.25zm.937 5H4.563a.313.313 0 01-.313-.312v-3.75c0-.172.14-.313.313-.313h6.874c.172 0 .313.14.313.313v3.75c0 .171-.14.312-.313.312zM8 11.203c.215 0 .39-.176.39-.39v-1.25A.391.391 0 008 9.172a.391.391 0 00-.39.39v1.25c0 .215.175.391.39.391z"></Path>
        </Svg>
    );
}

export default Icon;
