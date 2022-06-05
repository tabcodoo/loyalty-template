import React from 'react';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

function Icon({fill}) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <Path
                fill={fill ? fill : '#0B3039'}
                fillRule="evenodd"
                d="M16.456 21.78l1.237-1.238a.75.75 0 000-1.062L10.288 12l7.405-7.48a.75.75 0 000-1.062L16.456 2.22a.751.751 0 00-1.062 0L6.22 11.47a.751.751 0 000 1.062l9.174 9.249a.751.751 0 001.062 0z"></Path>
        </Svg>
    );
}

export default Icon;
