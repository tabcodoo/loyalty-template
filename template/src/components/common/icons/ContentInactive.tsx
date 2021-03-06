import React from 'react';
import Svg, {G, Path, Defs, Circle, Rect} from 'react-native-svg';

function Icon({fill = '#143154', size = 16, thin = false}) {
    return thin ? (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <Path d="M0 0H24V24H0z"></Path>
                <Path
                    fill={fill}
                    fillRule="nonzero"
                    d="M19.005 2C20.107 2 21 2.898 21 3.99v16.02c0 1.099-.893 1.99-1.995 1.99H4.995A1.997 1.997 0 013 20.01V3.99C3 2.892 3.893 2 4.995 2h14.01zM20 12H4v8.01c0 .503.386.926.88.983l.115.007h14.01a.993.993 0 00.988-.875l.007-.116V12zm-5.5 5a.5.5 0 01.09.992L14.5 18h-8a.5.5 0 01-.09-.992L6.5 17h8zm-2-2a.5.5 0 01.09.992L12.5 16h-6a.5.5 0 01-.09-.992L6.5 15h6zm6.505-12H4.995a.993.993 0 00-.988.875L4 3.991V11h1.293l3.222-4.485a1.318 1.318 0 011.937-.26l.11.1L13 8.793l1.437-1.437c.579-.579 1.44-.537 1.946.073l.09.121L18.796 11H20V3.99a.998.998 0 00-.88-.983L19.006 3zM9.382 7.035l-.055.063L6.525 11h11.066l-1.947-2.891c-.118-.175-.28-.21-.435-.101l-.065.055-1.79 1.79a.5.5 0 01-.638.058l-.07-.057-2.791-2.792c-.15-.15-.337-.156-.473-.027z"></Path>
            </G>
        </Svg>
    ) : (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <Path d="M0 0H24V24H0z"></Path>
                <Path
                    fill={fill}
                    fillRule="nonzero"
                    d="M19.005 2C20.107 2 21 2.898 21 3.99v16.02c0 1.099-.893 1.99-1.995 1.99H4.995A1.997 1.997 0 013 20.01V3.99C3 2.892 3.893 2 4.995 2h14.01zM4.5 12.215v7.794c0 .237.177.44.407.483l.088.008h14.01a.494.494 0 00.487-.403l.008-.088v-7.761l-15-.033zm10 4.535a.75.75 0 01.102 1.493l-.102.007h-8a.75.75 0 01-.102-1.493l.102-.007h8zm-2-2.57a.75.75 0 01.102 1.494l-.102.007h-6a.75.75 0 01-.102-1.493l.102-.007h6zM19.005 3.5H4.995a.494.494 0 00-.487.403L4.5 3.99v6.724l.689.002 3.123-4.348a1.568 1.568 0 012.31-.297l.117.106L13 8.439l1.26-1.26c.69-.69 1.734-.632 2.33.109l.09.122 2.249 3.338.571.001V3.991a.498.498 0 00-.407-.483l-.088-.008zM9.557 7.212l-.027.032-2.497 3.477 10.084.023-1.68-2.496c-.038-.055-.05-.066-.085-.037l-1.822 1.82a.75.75 0 01-.976.072l-.084-.073L9.678 7.24c-.05-.05-.085-.058-.12-.027z"></Path>
            </G>
        </Svg>
    );
}

export default Icon;
