import React from 'react';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

function Icon({fill}) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <Path
                fill={fill ? fill : '#fff'}
                fillRule="evenodd"
                d="M21.464 18.286c.296 0 .536.24.536.535v1.429c0 .296-.24.536-.536.536H2.536A.536.536 0 012 20.25v-1.429c0-.295.24-.535.536-.535zm0-7.143c.296 0 .536.24.536.536v1.428c0 .296-.24.536-.536.536H2.536A.536.536 0 012 13.107V11.68c0-.296.24-.536.536-.536zM11.732 4c.148 0 .268.24.268.536v1.428c0 .296-.12.536-.268.536H2.268C2.12 6.5 2 6.26 2 5.964V4.536C2 4.24 2.12 4 2.268 4z"></Path>
        </Svg>
    );
}

export default Icon;
