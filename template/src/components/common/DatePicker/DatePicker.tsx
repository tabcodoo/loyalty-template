import * as React from 'react';
import {View, TouchableOpacity, Platform} from 'react-native';
import {Menu, Divider, Provider, useTheme} from 'react-native-paper';
import Text from 'components/common/Text';
import Button from 'components/common/Button';

import LocalizationContext from 'translation/context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownHolder from 'services/DropDownHolder';
import moment from 'moment';

const Dropdown = ({
  date = null,
  multi = false,
  style = {},
  label = 'Odaberi datum rođenja',
  onSelect = () => {},
  centered = false,
}) => {
  const {colors, roundness} = useTheme();
  const [visible, setVisible] = React.useState(false);
  let {t} = React.useContext(LocalizationContext);

  const openPicker = () => setVisible(true);
  const closePicker = () => setVisible(false);

  return (
    <>
      <TouchableOpacity
        style={[
          {
            borderBottomColor: colors.secondary,
            borderBottomWidth: 1,
            borderTopLeftRadius: roundness,
            borderTopRightRadius: roundness,
            backgroundColor: colors.gray,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: Platform.OS === 'ios' ? 0 : 4,
            height: 48,
            paddingRight: 16,
            paddingLeft: 0,
          },
          style,
        ]}
        activeOpacity={0.8}
        onPress={() => openPicker()}>
        <Text
          type={!date ? 'small' : 'small14'}
          color={!date ? colors.placeholder : colors.text}
          style={{top: 4, left: 12}}>
          {date ? moment(date).format('DD/MM/YYYY') : label}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        onConfirm={(date) => {
          closePicker();
          if (date.getFullYear() > new Date().getFullYear()) {
            DropDownHolder.dropDown.alertWithType(
              'error',
              t('errors.title'),
              t('errors.invalidDate', 'ba'),
            );
          } else {
            onSelect(moment(date).format('YYYY-MM-DD'));
          }
        }}
        onCancel={() => closePicker()}
        // cancelTextIOS={gt('register.date-of-birth-cancel', 'ba')}
        // confirmTextIOS={gt('register.date-of-birth-confirm', 'ba')}
        // headerTextIOS={gt('register.date-of-birth-header', 'ba')}
      />
    </>
  );
};

export default Dropdown;
