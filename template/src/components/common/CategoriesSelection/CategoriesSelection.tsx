import React, {forwardRef, useState, useEffect} from 'react';
import {View, Platform, TouchableOpacity} from 'react-native';
import {useTheme, Switch, Divider} from 'react-native-paper';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Checkbox} from 'react-native-paper';
import Text from 'components/common/Text';
import color from 'color';
import {useDispatch, useSelector} from 'react-redux';
import actions from 'store/actions';
import {categoriesData} from '../../../constants/bracomCategories';
import constants from '@constants';

const CategoriesSelection = ({bottomSheet = false, filters = false}) => {
    let offerCategoriesSettings = useSelector((state) => state.offerCategoriesSettings);
    let offerCategoriesFilters = useSelector((state) => state.offerCategoriesFilters);
    let categoriesObject = filters ? offerCategoriesFilters : offerCategoriesSettings;

    const [allCategoriesSelected, setAllCategoriesSelected] = useState(
        categoriesObject?.categories.length ===
            categoriesObject?.categories.filter((c) => c.isEnabled).length,
    );

    const [bracomCategories, setBracomCategories] = useState(categoriesData);

    let {colors} = useTheme();
    const dispatch = useDispatch();

    useEffect(() => {
        // console.tron.log('categoriesObject', categoriesObject);
        setAllCategoriesSelected(
            categoriesObject?.categories.length ===
                categoriesObject?.categories.filter((c) => c.isEnabled).length,
        );
    }, [categoriesObject]);

    let toggleAllCategories = (enable = false) => {
        if (!filters) dispatch(actions.toggleAllSettingsCategories(enable));
        else dispatch(actions.toggleAllFilterCategories(enable));
    };

    let setSelectedCategory = (id) => {
        if (!filters) dispatch(actions.setSelectedCategory(id));
        else {
            // console.tron.log('setSelectedCategory edited');
            // dispatch(actions.toggleEdit());
            dispatch(actions.addCategoriesFilter(id));
        }
    };

    let disableSelectedCategory = (id) => {
        if (!filters) dispatch(actions.deleteSelectedCategory(id));
        else {
            // console.tron.log('disableSelectedCategory edited', id);
            // dispatch(actions.toggleEdit());
            dispatch(actions.removeCategoriesFilter(id));
        }
    };

    const disabledSelectedCategoryBracom = (category) => {
        const selectedCategories = categoriesObject?.categories.filter(
            (item) => item.mapToName === category.mapToName,
        );

        dispatch(actions.removeCategoriesFilterBracom(selectedCategories));
    };

    const enableSelectedCategoriesBracom = (category) => {
        const selectedCategories = categoriesObject?.categories.filter(
            (item) => item.mapToName === category.mapToName,
        );
        dispatch(actions.addCategoriesFilterBracom(selectedCategories));
    };

    let CategoryItem = ({
        // value = false,
        selected = false,
        title = '',
        subtitle = null,
        onPress = () => {},
        marginTop = 0,
    }) => {
        const [checked, setChecked] = React.useState(selected);
        return (
            <TouchableOpacity
                onPress={() => {
                    setChecked(!checked);
                    onPress();
                }}
                style={{
                    marginTop: marginTop,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    // backgroundColor: '#faf',
                }}>
                <Checkbox.Android
                    color={colors.primary}
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        onPress();
                        setChecked(!checked);
                    }}
                />
                <View style={{flex: 1, marginLeft: 12}}>
                    <Text
                        type="bold"
                        style={{
                            marginTop: 7,
                        }}>
                        {title}
                    </Text>
                    {!!subtitle && (
                        <Text
                            type="small14"
                            color={color('#3c4c58').alpha(0.6).rgb().toString()}
                            style={{marginTop: 8}}>
                            {subtitle}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    const renderCategories = () => {
        if (constants.applicationId === '8265e2ee-d9a3-48d8-a209-99779c8509b3') {
            let newData = [];
            categoriesObject?.categories.forEach((category) => {
                const doesExist = newData.length
                    ? newData.find((item) => item.mapToName === category.mapToName)
                    : false;
                if (!doesExist) newData = [...newData, category];
            });

            return newData.map((category, index) => {
                return (
                    <CategoryItem
                        marginTop={!index ? 0 : 8}
                        title={category?.mapToName}
                        // subtitle={category?.details}
                        selected={category.isEnabled}
                        onPress={() => {
                            if (category.isEnabled) {
                                disabledSelectedCategoryBracom(category);
                                setTimeout(() => setAllCategoriesSelected(false), 500);
                            } else enableSelectedCategoriesBracom(category);
                        }}
                    />
                );
            });
        } else {
            return categoriesObject?.categories.map((category, index) => {
                return (
                    <CategoryItem
                        marginTop={!index ? 0 : 8}
                        title={category?.name}
                        subtitle={category?.details}
                        selected={category.isEnabled}
                        onPress={() => {
                            if (category.isEnabled) {
                                disableSelectedCategory(category.id);
                                setTimeout(() => setAllCategoriesSelected(false), 500);
                            } else setSelectedCategory(category.id);
                        }}
                    />
                );
            });
        }
    };

    let ConditionalView = bottomSheet ? BottomSheetScrollView : View;

    return (
        <ConditionalView bottomSheet>
            <View style={{left: -8, marginBottom: 10}}>
                <CategoryItem
                    title="Sve kategorije"
                    selected={allCategoriesSelected}
                    onPress={() => {
                        toggleAllCategories(!allCategoriesSelected);
                        // if (!allCategoriesSelected) {
                        //     categoriesObject?.categories.forEach((c) => setSelectedCategory(c.id));
                        // } else {
                        //     categoriesObject?.categoriesSelected.forEach((c) =>
                        //         disableSelectedCategory(c.id),
                        //     );
                        // }
                        // setAllCategoriesSelected(!allCategoriesSelected);
                    }}
                />
            </View>
            <Divider />
            <View style={{marginLeft: 30, marginTop: 8}}>{renderCategories()}</View>
        </ConditionalView>
    );
};

export default CategoriesSelection;
