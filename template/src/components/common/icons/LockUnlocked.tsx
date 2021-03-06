import React from 'react';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

function Icon({fill = '#fff', size = 16}) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16">
            <Path
                fill={fill}
                fillRule="evenodd"
                d="M9.562 13c.518 0 .938-.42.938-.937v-3.75a.938.938 0 00-.938-.938h-.937V6.152c0-1.38 1.107-2.52 2.486-2.527a2.503 2.503 0 012.514 2.5v1.64c0 .13.105.235.234.235h.157a.234.234 0 00.234-.234V6.154c0-1.726-1.389-3.148-3.115-3.154A3.127 3.127 0 008 6.125v1.25H2.688a.938.938 0 00-.938.938v3.75c0 .517.42.937.938.937h6.874zm0-.625H2.688a.313.313 0 01-.313-.312v-3.75c0-.172.14-.313.313-.313h6.874c.172 0 .313.14.313.313v3.75c0 .171-.14.312-.313.312zm-3.378-1.23c.214 0 .39-.176.39-.391v-1.25a.391.391 0 00-.781 0v1.25c0 .215.176.39.39.39z"></Path>
        </Svg>
    );
}

export default Icon;
