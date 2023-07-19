import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import HomeStore from '../../stores/HomeStore';
import FlatListView from '../../components/flowlist/FlowList.js';
import ResizeImage from '../../components/ResizeImage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import HomeBar from './components/HeaderBar';
import ScrollHeader from './components//ScrollHeader';
import Heart from '../../components/Heart';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default observer(() => {

    const store = useLocalObservable(() => new HomeStore());
    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        store.requestHomeList();
        store.getCategoryList();
    }, []);

    // 刷新
    const onRefresh = () => {
        store.resetPage();
        store.requestHomeList();
    };

    // 上拉加载
    const onEndReached = () => {
        if (store.loadingFinish) {
            return;
        }
        store.requestHomeList();
    };

    const onFollowChange = (value: boolean) => {
        console.log(value);
    };

    const onArticlePress = useCallback((article: ArticleSimple) => () => {
        navigation.push('ArticleDetail', {
            id: article.id
        });
    }, []);


    const renderItem = ({item, index}: {item: ArticleSimple, index: number}) => {
        return (
            <TouchableOpacity style={styles.item} onPress={onArticlePress(item)}>
                <View style={styles.itemImageWrap}>
                    <ResizeImage uri={item.image} />
                </View>
                <Text style={styles.itemTxt}>{item.title}</Text>
                <View style={styles.nameLayout}>
                    <Image style={styles.avatarImg} source={{ uri: item.avatarUrl }} />
                    <Text style={styles.nameTxt}>{item.userName}</Text>
                    <Heart follow={item.isFavorite} onFollowChange={onFollowChange} />
                    <Text style={styles.countTxt}>{item.favoriteCount}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    const onChangeCategory = (category: Category) => {
        console.log(category);
    }

    return (
        <View style={styles.root}>

            <HomeBar
                tab={1}
                onChangeTab={(tabIndex: number) => {
                    console.log(tabIndex);
                }}
            />

            <FlatListView
                style={styles.flatList}
                data={store.homeList}
                keyExtrator={(item: ArticleSimple) => item.id}
                numColumns={2}
                refreshing={store.refreshing}
                onRefresh={onRefresh}
                onEndReachedThreshold={0.2}
                onEndReached={onEndReached}
                ListHeaderComponent={
                    <ScrollHeader
                        allCategoryList={store.categoryList}
                        onChangeCategory={onChangeCategory}
                    />
                }
                renderItem={renderItem}
                ListFooterComponent={
                    <Text style={styles.footerTxt}>
                        {store.loadingFinish ? '没有更多数据了' : '加载更多中...'}
                    </Text>
                }
            />
        </View>
    );
});

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0'
    },
    flatList: {
        width: '100%',
        height: '100%'
    },
    item: {
        marginLeft: 6,
        marginBottom: 6,
        width: SCREEN_WIDTH - 18 >> 1,
        borderRadius: 8,
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    itemImageWrap: {
        width: '100%'
    },
    itemTxt: {
        paddingHorizontal: 10,
        marginVertical: 4,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333'
    },
    nameLayout: {
        width: '100%',
        minHeight: 20,
        flexDirection: 'row',
        // alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    avatarImg: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
        borderRadius: 10
    },
    nameTxt: {
        marginLeft: 6,
        flex: 1,
        fontSize: 12,
        color: '#999'
    },
    countTxt: {
        marginLeft: 4,
        fontSize: 14,
        color: '#999'
    },
    footerTxt: {
        marginVertical: 16,
        width: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
        color: '#999'
    }
});