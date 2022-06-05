import React from 'react';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

function Icon({fill = '#0B3039', size = 16}) {
    return (
        // <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        //     <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        //         <Path d="M0 0H24V24H0z"></Path>
        //         <Path
        //             fill={fill}
        //             fillRule="nonzero"
        //             d="M13.408 2.58l6.704 6.645a3 3 0 01.888 2.13V20a2 2 0 01-2 2h-5v-6.326a2 2 0 00-3.995-.15l-.005.15V22H5a2 2 0 01-2-2v-9.06a2 2 0 01.592-1.421l7-6.939a2 2 0 012.816 0zm-1.056 1.066a.5.5 0 00-.635-.058l-.069.058-7 6.938a.5.5 0 00-.142.276l-.006.08V20a.5.5 0 00.41.492L5 20.5l3.5-.001.001-4.88.009-.205a3.5 3.5 0 016.985.068l.005.192v4.825l3.5.001a.5.5 0 00.492-.41L19.5 20v-8.644a1.5 1.5 0 00-.343-.955l-.101-.11-6.704-6.645z"></Path>
        //     </G>

        // </Svg>
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 17">
            <Path
                fill="#333"
                fillRule="evenodd"
                d="M8 14.4c3.315 0 6-2.685 6-6s-2.685-6-6-6-6 2.685-6 6 2.685 6 6 6zm0-.774A5.226 5.226 0 118 3.173a5.226 5.226 0 010 10.453zm2.03-3.153l.198-.273a.289.289 0 00-.063-.406L8.46 8.552v-3.54a.292.292 0 00-.29-.29h-.34a.292.292 0 00-.29.29v3.862c0 .092.044.18.119.235l1.964 1.427a.292.292 0 00.407-.063z"></Path>
        </Svg>
    );
}

export default Icon;
