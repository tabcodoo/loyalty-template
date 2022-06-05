import * as React from 'react';
import {View, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import SwiperFlatList from 'react-native-swiper-flatlist';

import Header from 'components/common/LoggedInHeader';
import Text from 'components/common/Text';

let {width, height} = Dimensions.get('window');

let Instruction = ({img, imageStyle, header, body}) => (
    <View style={{width, flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 4, justifyContent: 'space-between', paddingTop: 56}}>
            <View style={{alignItems: 'center', paddingHorizontal: 32}}>
                <View
                    style={{
                        width: 200,
                        height: 150,
                        paddingLeft: 32,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image style={imageStyle} resizeMode="contain" source={img} />
                </View>
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                }}>
                <Text type="header2">{header}</Text>
            </View>
        </View>
        <View style={{flex: 4, padding: 32, width: '100%'}}>
            <Text center color={'#9C9C9C'}>
                {body}
            </Text>
        </View>
    </View>
);

const Instructions = (props: any) => {
    const {t} = props;
    const {colors} = useTheme();
    let [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <SwiperFlatList
            style={{flex: 1}}
            renderAll={true}
            index={activeIndex}
            paginationIndexes={{index: activeIndex, prevIndex: activeIndex - 1}}
            showPagination
            paginationActiveColor={colors.secondary}
            paginationDefaultColor={colors.gray}
            paginationStyle={{bottom: 24}}
            paginationStyleItem={{height: 12, width: 12}}>
            <Instruction
                img={require('assets/images/instructions/1coupon-icon-01.png')}
                imageStyle={{width: 200, marginRight: 24}}
                header={'Pogledajte aktivne kupone'}
                body={
                    'Nakon instalacije aplikacije pogledajte kupone koje možete iskoristiti u našim poslovnicama i ostvariti uštedu. Da bi iskoristili kupon, morate se registrovati.'
                }
            />
            <Instruction
                img={require('assets/images/instructions/1stopwatch-icon-01-01-01.png')}
                imageStyle={{height: 150, width: 200, marginRight: 32}}
                header={'Aktivirajte kupon'}
                body={
                    'Odaberite kupon koji želite iskoristiti. Aktivirajte kupon. Pazite jer imate samo 5 minuta da ga iskoristite nakon aktivacije.'
                }
            />
            <Instruction
                img={require('assets/images/instructions/1phone-code-icon-01.png')}
                imageStyle={{height: 150, width: 200, marginRight: 32}}
                header={'Skeniranje kupona'}
                body={
                    'Nakon aktivacije kupona, prinesite svoj telefon osoblju na kasi kako bi skenirali kupon. Nemojte gasiti telefon dok je kupon aktivan.'
                }
            />
            <Instruction
                img={require('assets/images/instructions/1phone-icon-01-01.png')}
                imageStyle={{height: 150, width: 200}}
                header={'Platite manje'}
                body={
                    'To je sve, iskoristili ste kupon. Umjesto pune cijene, sada platite manji iznos.'
                }
            />
        </SwiperFlatList>
    );
};

export default Instructions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
