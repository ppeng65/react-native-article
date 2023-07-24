import { Image, View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ShopStore from '../../stores/ShopStore';

import icon_search from '../../assets/icon_search.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_orders from '../../assets/icon_orders.png';
import icon_menu_more from '../../assets/icon_menu_more.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ITEM_WIDTH = SCREEN_WIDTH - 18 >> 1;

export default observer(() => {

    const store = useLocalObservable(() => new ShopStore());
    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        store.requestShopList();
        store.requestTop10CateGory();
    }, []);

    const onSearchPress = () => {
        navigation.push('SearchGoods');
    }

    const renderTitle = () => {
        return (
            <View style={styles.titleLayout}>
                <TouchableOpacity
                    style={styles.searchLayout}
                    onPress={onSearchPress}
                >
                    <Image style={styles.icon_search} source={icon_search} />
                    <Text style={styles.searchTxt}>bm吊带</Text>
                </TouchableOpacity>
                <Image style={styles.menuIcon} source={icon_shop_car} />
                <Image style={styles.menuIcon} source={icon_orders} />
                <Image style={styles.menuIcon} source={icon_menu_more} />
            </View>
        );
    }

    const ListHeader = () => {
        const { top10Category } = store;

        const headerStyles = StyleSheet.create({
            container: {
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap'
            },
            categoryItem: {
                paddingVertical: 16,
                width: '20%',
                alignItems: 'center'
            },
            itemImg: {
                width: 40,
                height: 40,
                resizeMode: 'contain'
            },
            itemNameTxt: {
                marginTop: 6,
                fontSize: 14,
                color: '#333'
            }
        });

        return (
            <View style={headerStyles.container}>
                {
                    top10Category.map((item, index) => {
                        return (
                            <View key={item.id} style={headerStyles.categoryItem}>
                                <Image style={headerStyles.itemImg} source={{ uri: item.image }} />
                                <Text style={headerStyles.itemNameTxt}>{item.name}</Text>
                            </View>
                        );
                    })
                }
            </View>
        )
    }

    const renderItem = ({ item, index }: { item: GoodsSimple, index: number }) => {
        const itemStyles = StyleSheet.create({
            item: {
                marginTop: 6,
                marginLeft: 6,
                width: ITEM_WIDTH,
                borderRadius: 8,
                overflow: 'hidden'
            },
            img: {
                width: '100%',
                height: 200,
                resizeMode: 'cover'
            },
            titleTxt: {
                marginTop: 6,
                fontSize: 14,
                color: '#333'
            },
            promotionTxt: {
                marginTop: 4,
                width: 78,
                textAlign: 'center',
                fontSize: 12,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: '#bbb',
                color: '#999'
            },
            prefix: {
                marginTop: 4,
                fontSize: 14,
                fontWeight: 'bold',
                color: '#333'
            },
            priceTxt: {
                fontSize: 22,
                fontWeight: 'bold',
                textAlign: 'justify',
                color: '#333'
            },
            originTxt: {
                fontSize: 13,
                fontWeight: 'normal',
                color: '#999'
            }
        });

        return (
            <View style={itemStyles.item}>
                <Image style={itemStyles.img} source={{ uri: item.image }} />
                <Text style={itemStyles.titleTxt}>{item.title}</Text>
                {!!item.promotion && <Text style={itemStyles.promotionTxt}>{item.promotion}</Text>}
                <Text style={itemStyles.prefix}>
                    &yen;<Text style={itemStyles.priceTxt}>{item.price}  {!!item.originPrice && <Text style={itemStyles.originTxt}>原价：{item.originPrice}</Text>}</Text>
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.root}>
            {renderTitle()}
            <FlatList
                style={{ flex: 1 }}
                data={store.goodsList}
                extraData={[store.top10Category]}
                keyExtractor={item => `${item.id}`}
                ListHeaderComponent={<ListHeader />}
                numColumns={2}
                renderItem={renderItem}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    titleLayout: {
        paddingHorizontal: 16,
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchLayout: {
        height: 32,
        paddingHorizontal: 16,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: '#f0f0f0'
    },
    icon_search: {
        width: 18,
        height: 18,
        resizeMode: 'contain'
    },
    searchTxt: {
        marginLeft: 6,
        fontSize: 14,
        color: '#bbb'
    },
    menuIcon: {
        width: 22,
        height: 22,
        marginHorizontal: 6
    }
});
