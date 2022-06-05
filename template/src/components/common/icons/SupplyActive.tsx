import React from 'react';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

function Icon({fill = '#143154', size = 16}) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <Path d="M0 0H24V24H0z"></Path>
                <Path
                    fill={fill}
                    d="M19.005 2C20.107 2 21 2.898 21 3.99v16.02c0 1.099-.893 1.99-1.995 1.99H4.995A1.997 1.997 0 013 20.01V3.99C3 2.892 3.893 2 4.995 2h14.01zM14.5 16.75h-8l-.102.007A.75.75 0 006.5 18.25h8l.102-.007a.75.75 0 00-.102-1.493zm-2-2.57h-6l-.102.008A.75.75 0 006.5 15.68h6l.102-.007a.75.75 0 00-.102-1.493zm2-5.79h-8l-.102.006A.75.75 0 006.5 9.889h8l.102-.007A.75.75 0 0014.5 8.39zm-2-2.57h-6l-.102.007A.75.75 0 006.5 7.32h6l.102-.007A.75.75 0 0012.5 5.82z"></Path>
            </G>

            {/*<Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">*/}
            {/*    <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">*/}
            {/*        <Path d="M0 0H24V24H0z"></Path>*/}
            {/*        <Path*/}
            {/*            fill={fill}*/}
            {/*            d="M19.005 2C20.107 2 21 2.898 21 3.99v16.02c0 1.099-.893 1.99-1.995 1.99H4.995A1.997 1.997 0 013 20.01V3.99C3 2.892 3.893 2 4.995 2h14.01zm-1.522 13.5H6.5l-.09.008a.5.5 0 00.09.992h10.983l.09-.008a.5.5 0 00-.09-.992zm-4.983-2h-6l-.09.008a.5.5 0 00.09.992h6l.09-.008a.5.5 0 00-.09-.992zm4.983-4H6.5l-.09.008a.5.5 0 00.09.992h10.983l.09-.008a.5.5 0 00-.09-.992zm-4.983-2h-6l-.09.008a.5.5 0 00.09.992h6l.09-.008a.5.5 0 00-.09-.992z"></Path>*/}
            {/*    </G>*/}
            {/*</Svg>*/}
        </Svg>
    );
}

export default Icon;
