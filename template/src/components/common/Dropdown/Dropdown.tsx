import * as React from 'react';
import {Platform, View, TouchableOpacity} from 'react-native';
import {Menu, Divider, Provider, useTheme} from 'react-native-paper';
import Text from 'components/common/Text';
import Button from 'components/common/Button';

import MaComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LocalizationContext from 'translation/context';

const Dropdown = ({
    items = [],
    multi = false,
    style = {},
    label = '',
    header = '',
    onSelect = () => {},
    centered = false,
    labelStyle,
}) => {
    const {colors, customFonts} = useTheme();
    const [visible, setVisible] = React.useState(false);
    let {t} = React.useContext(LocalizationContext);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            style={{width: '91%', marginTop: 95}}
            anchor={
                <TouchableOpacity
                    style={[
                        {
                            borderBottomColor: colors.secondary,
                            borderBottomWidth: 1,
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4,
                            backgroundColor: colors.gray,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 48,
                            paddingRight: 16,
                            paddingLeft: 0,
                            paddingTop: header.length > 0 ? 4 : 0,
                        },
                        style,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setVisible(true)}>
                    <Text
                        type="small"
                        color={colors.secondary}
                        style={{
                            top: 4,
                            left: 12,
                            position: 'absolute',
                            // top: 4,
                            fontSize: 10,
                        }}>
                        {header}
                    </Text>
                    <Text type="small14" style={{top: 0, left: 12, ...labelStyle}}>
                        {label}
                    </Text>
                    <MaComIcon name="menu-down" size={24} />
                </TouchableOpacity>
            }>
            {items.length === 0 ? (
                <Text center type="smallBold">
                    {t('errors.noItems')}
                </Text>
            ) : (
                items.map((item, index) => (
                    <TouchableOpacity
                        key={index.toString()}
                        style={{
                            width: '100%',
                            alignItems: centered ? 'center' : 'flex-start',
                            padding: 8,
                            paddingHorizontal: 20,
                        }}
                        onPress={() => {
                            onSelect(item, index);
                            if (!multi) closeMenu();
                        }}
                        activeOpacity={0.5}>
                        <Text
                            type="smallBold"
                            color={
                                !multi
                                    ? colors.text
                                    : item?.active
                                    ? colors.text
                                    : colors.placeholder
                            }>
                            {item?.name.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                ))
            )}
        </Menu>
    );
};

export default Dropdown;
