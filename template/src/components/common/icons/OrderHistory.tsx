import React from 'react';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

function Icon({fill = '#000', size = 16}) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16">
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <Path d="M0 0H16V16H0z"></Path>
                <Path
                    fill={fill}
                    d="M12.5 14a.75.75 0 00.75-.75V2.75A.75.75 0 0012.5 2h-9a.75.75 0 00-.75.75v10.5c0 .412.335.75.75.75h9zm0-.75h-9V2.75h9v10.5zM6.125 6.125a.75.75 0 00.75-.75v-.75a.75.75 0 00-.75-.75h-.75a.75.75 0 00-.75.75v.75c0 .413.335.75.75.75h.75zm0-.75h-.75v-.75h.75v.75zm4.687 0A.188.188 0 0011 5.188v-.375a.188.188 0 00-.188-.188h-3a.188.188 0 00-.187.188v.375c0 .103.084.187.188.187h3zM5.708 8.713l1.505-1.491a.126.126 0 000-.178l-.296-.298a.126.126 0 00-.178 0L5.623 7.852l-.482-.49a.126.126 0 00-.178 0l-.298.296a.126.126 0 000 .178l.865.877c.049.049.129.049.178 0zm5.104-.338A.188.188 0 0011 8.188v-.375a.188.188 0 00-.188-.188h-3a.188.188 0 00-.187.188v.375c0 .103.084.187.188.187h3zm-4.687 3.75a.75.75 0 00.75-.75v-.75a.75.75 0 00-.75-.75h-.75a.75.75 0 00-.75.75v.75c0 .412.335.75.75.75h.75zm0-.75h-.75v-.75h.75v.75zm4.687 0a.188.188 0 00.188-.187v-.375a.188.188 0 00-.188-.188h-3a.188.188 0 00-.187.188v.375c0 .103.084.187.188.187h3z"></Path>
            </G>
        </Svg>
    );
}

export default Icon;
