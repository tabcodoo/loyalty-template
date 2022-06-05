import React from 'react';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

function Icon({fill = '#143154', size = 16, thin = false}) {
    return thin ? (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <Path d="M0 0H24V24H0z"></Path>
                <Path
                    // fill="#36434D"
                    fill={fill}
                    fillRule="nonzero"
                    d="M19.005 2C20.107 2 21 2.898 21 3.99v16.02c0 1.099-.893 1.99-1.995 1.99H4.995A1.997 1.997 0 013 20.01V3.99C3 2.892 3.893 2 4.995 2h14.01zm0 1H4.995a.993.993 0 00-.988.875L4 3.991v16.018c0 .504.386.927.88.984l.115.007h14.01a.993.993 0 00.988-.875l.007-.116V3.991a.998.998 0 00-.88-.984L19.006 3z"></Path>
                <Path
                    // fill="#36434D"
                    fill={fill}
                    fillRule="nonzero"
                    d="M12.5 13.5a.5.5 0 01.09.992l-.09.008h-6a.5.5 0 01-.09-.992l.09-.008h6z"></Path>
                <Path
                    fill={fill}
                    // fill="#36434D"
                    fillRule="nonzero"
                    d="M12.5 7.5a.5.5 0 01.09.992l-.09.008h-6a.5.5 0 01-.09-.992L6.5 7.5h6z"></Path>
                <Path
                    fill={fill}
                    // fill="#36434D"
                    fillRule="nonzero"
                    d="M17.483 9.5a.5.5 0 01.09.992l-.09.008H6.5a.5.5 0 01-.09-.992L6.5 9.5h10.983z"></Path>
                <Path
                    fill={fill}
                    // fill="#36434D"
                    fillRule="nonzero"
                    d="M17.483 15.5a.5.5 0 01.09.992l-.09.008H6.5a.5.5 0 01-.09-.992l.09-.008h10.983z"></Path>
            </G>
        </Svg>
    ) : (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <Path d="M0 0H24V24H0z"></Path>
                <Path
                    fill={fill}
                    fillRule="nonzero"
                    d="M19.005 2C20.107 2 21 2.898 21 3.99v16.02c0 1.099-.893 1.99-1.995 1.99H4.995A1.997 1.997 0 013 20.01V3.99C3 2.892 3.893 2 4.995 2h14.01zm0 1.5H4.995a.494.494 0 00-.487.403L4.5 3.99v16.018c0 .237.177.44.407.483l.088.008h14.01a.494.494 0 00.487-.403l.008-.088V3.991a.498.498 0 00-.407-.483l-.088-.008z"></Path>
                <Path
                    fill={fill}
                    fillRule="nonzero"
                    d="M12.5 14.18a.75.75 0 01.102 1.494l-.102.007h-6a.75.75 0 01-.102-1.493l.102-.007h6z"></Path>
                <Path
                    fill={fill}
                    fillRule="nonzero"
                    d="M12.5 5.82a.75.75 0 01.102 1.493l-.102.007h-6a.75.75 0 01-.102-1.493L6.5 5.82h6z"></Path>
                <Path
                    fill={fill}
                    fillRule="nonzero"
                    d="M14.5 16.75a.75.75 0 01.102 1.493l-.102.007h-8a.75.75 0 01-.102-1.493l.102-.007h8z"></Path>
                <Path
                    fill={fill}
                    fillRule="nonzero"
                    d="M14.5 8.39a.75.75 0 01.102 1.492l-.102.007h-8a.75.75 0 01-.102-1.493l.102-.007h8z"></Path>
            </G>
        </Svg>
    );
}

export default Icon;
