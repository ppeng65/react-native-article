import { Dimensions, Image, View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, LayoutChangeEvent } from 'react-native';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import UserStore from '../../stores/UserStore';
import MineStore from '../../stores/MineStore';

import Empty from '../../components/Empty';
import Heart from '../../components/Heart';
import SideMenu, { SideMenuRef } from './SideMenu';

import icon_mine_bg from '../../assets/icon_mine_bg.png';
import icon_menu from '../../assets/icon_menu.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_share from '../../assets/icon_share.png';
import icon_location_info from '../../assets/icon_location_info.png';
import icon_qrcode from '../../assets/icon_qrcode.png';
import icon_add from '../../assets/icon_add.png';
import icon_male from '../../assets/icon_male.png';
import icon_female from '../../assets/icon_female.png';
import icon_setting from '../../assets/icon_setting.png';
import icon_no_note from '../../assets/icon_no_note.webp';
import icon_no_collection from '../../assets/icon_no_collection.webp';
import icon_no_favorate from '../../assets/icon_no_favorate.webp';

const EMPTY_CONFIG = [
    { icon: icon_no_note, tips: '快去发布今日的好心情吧～' },
    { icon: icon_no_collection, tips: '快去收藏你喜欢的作品吧～' },
    { icon: icon_no_favorate, tips: '喜欢点赞的人运气不会太差哦～' },
]

export default observer(() => {

    const store = useLocalObservable(() => new MineStore());
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { width: SCREEN_WIDTH } = Dimensions.get('window');


    const [bgImgHeight, setBgImgHeight] = useState<number>(400);

    const [tabIndex, setTabIndex] = useState<number>(0);

    const sideRef = useRef<SideMenuRef>(null);


    useEffect(() => {
        store.requestAll();
    }, [])

    const onArticlePress = useCallback((article: ArticleSimple) => () => {
        navigation.push('ArticleDetail', {
            id: article.id
        });
    }, []);

    const onFollowChange = (value: boolean) => {
        console.log(value);
    };

    const renderTitle = () => {
        const styles = StyleSheet.create({
            titleLayout: {
                width: '100%',
                height: 48,
                flexDirection: 'row',
                alignItems: 'center'
            },
            menuBtn: {
                height: '100%',
                paddingHorizontal: 16,
                justifyContent: 'center'
            },
            menuImg: {
                width: 28,
                height: 28,
                resizeMode: 'contain',
                tintColor: 'white'
            },
            rightMenuImg: {
                marginHorizontal: 12
            }
        });

        return (
            <View style={styles.titleLayout}>
                <TouchableOpacity style={styles.menuBtn} onPress={() => {
                    sideRef.current?.show();
                }}>
                    <Image style={styles.menuImg} source={icon_menu} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <Image style={[styles.menuImg, styles.rightMenuImg]} source={icon_shop_car} />
                <Image style={[styles.menuImg, styles.rightMenuImg]} source={icon_share} />
            </View>
        );
    }

    const renderInfo = () => {
        const { userInfo } = UserStore;

        const styles = StyleSheet.create({
            avatarLayout: {
                padding: 16,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'flex-end'
            },
            avatarImg: {
                width: 96,
                height: 96,
                resizeMode: 'cover',
                borderRadius: 48
            },
            addImg: {
                marginLeft: -28,
                marginBottom: 2,
                width: 20,
                height: 20
            },
            nameLayout: {
                marginLeft: 20
            },
            nameTxt: {
                fontSize: 22,
                fontWeight: 'bold',
                color: 'white'
            },
            idLayout: {
                marginTop: 16,
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center'
            },
            idTxt: {
                fontSize: 12,
                color: '#bbb'
            },
            qrcodeImg: {
                marginLeft: 6,
                width: 12,
                height: 12,
                tintColor: '#bbb'
            },
            descTxt: {
                marginHorizontal: 16,
                fontSize: 14,
                color: 'white'
            },
            sexLayout: {
                marginTop: 12,
                marginLeft: 16,
                width: 32,
                height: 24,
                paddingHorizontal: 16,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                backgroundColor: '#ffffff50'
            },
            sexImg: {
                width: 12,
                height: 12,
                resizeMode: 'contain'
            },
            infoLayout: {
                marginTop: 20,
                marginBottom: 28,
                width: '100%',
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center'
            },
            infoItem: {
                paddingRight: 16,
                alignItems: 'center'
            },
            infoValue: {
                fontSize: 18,
                color: 'white'
            },
            infoLabel: {
                marginTop: 6,
                fontSize: 12,
                color: '#ddd'
            },
            infoBtn: {
                marginLeft: 16,
                paddingHorizontal: 16,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 16
            },
            editTxt: {
                fontSize: 14,
                color: '#ffffff'
            },
            settingImg: {
                width: 20,
                height: 20,
                tintColor: 'white'
            }
        });

        const { info } = store;

        return (
            <View onLayout={(e: LayoutChangeEvent) => {
                const { height } = e.nativeEvent.layout;
                setBgImgHeight(height + 48 + 48);
            }}>
                <View style={styles.avatarLayout}>
                    <Image style={styles.avatarImg} source={{ uri: userInfo.avatar }} />
                    <Image style={styles.addImg} source={icon_add} />
                    <View style={styles.nameLayout}>
                        <Text style={styles.nameTxt}>{userInfo.nickName}</Text>
                        <View style={styles.idLayout}>
                            <Text style={styles.idTxt}>小红书号：{userInfo.redBookId}</Text>
                            <Image style={styles.qrcodeImg} source={icon_qrcode} />
                        </View>
                    </View>
                </View>
                <Text style={styles.descTxt}>{userInfo.desc}</Text>
                <View style={styles.sexLayout}>
                    <Image style={styles.sexImg} source={userInfo.sex === 'male' ? icon_male : icon_female} />
                </View>
                <View style={styles.infoLayout}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoValue}>{info.followCount}</Text>
                        <Text style={styles.infoLabel}>关注</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoValue}>{info.fans}</Text>
                        <Text style={styles.infoLabel}>粉丝</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoValue}>{info.favorateCount}</Text>
                        <Text style={styles.infoLabel}>获赞与收藏</Text>
                    </View>

                    <View style={{ flex: 1 }} />

                    <TouchableOpacity style={styles.infoBtn}>
                        <Text style={styles.editTxt}>编辑资料</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.infoBtn}>
                        <Image style={styles.settingImg} source={icon_setting} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const renderTabs = () => {
        const styles = StyleSheet.create({
            tabLayout: {
                paddingHorizontal: 16,
                width: '100%',
                height: 48,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
                backgroundColor: 'white'
            },
            tabBtn: {
                paddingHorizontal: 14,
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            },
            tabTxt: {
                fontSize: 16,
                color: '#999'
            },
            tabTxtSelected: {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#333'
            },
            line: {
                position: 'absolute',
                bottom: 6,
                width: 28,
                height: 2,
                borderRadius: 1,
                backgroundColor: '#ff2442'
            }
        });

        return (
            <View style={styles.tabLayout}>
                <TouchableOpacity style={styles.tabBtn} onPress={() => {
                    setTabIndex(0);
                }}>
                    <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>笔记</Text>
                    {tabIndex === 0 && <View style={styles.line} />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabBtn} onPress={() => {
                    setTabIndex(1);
                }}>
                    <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>收藏</Text>
                    {tabIndex === 1 && <View style={styles.line} />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabBtn} onPress={() => {
                    setTabIndex(2);
                }}>
                    <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>赞过</Text>
                    {tabIndex === 2 && <View style={styles.line} />}
                </TouchableOpacity>
            </View>
        );
    }

    const renderList = () => {
        const { noteList, collectionList, favorateList } = store;
        const currentList = [noteList, collectionList, favorateList][tabIndex];

        if (!currentList?.length) {
            const config = EMPTY_CONFIG[tabIndex];
            return <Empty icon={config.icon} tips={config.tips} />
        }

        const styles = StyleSheet.create({
            listContainer: {
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                backgroundColor: 'white'
            },
            item: {
                marginTop: 8,
                marginLeft: 6,
                marginBottom: 6,
                width: SCREEN_WIDTH - 18 >> 1,
                borderRadius: 8,
                backgroundColor: 'white',
                overflow: 'hidden'
            },
            itemImg: {
                width: '100%',
                height: 240,
                borderRadius: 8
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
            }
        });

        return (
            <View style={styles.listContainer}>
                {
                    currentList.map((item) => {
                        return (
                            <TouchableOpacity key={item.id} style={styles.item} onPress={onArticlePress(item)}>
                                <Image style={styles.itemImg} source={{ uri: item.image }} />
                                <Text style={styles.itemTxt}>{item.title}</Text>
                                <View style={styles.nameLayout}>
                                    <Image style={styles.avatarImg} source={{ uri: item.avatarUrl }} />
                                    <Text style={styles.nameTxt}>{item.userName}</Text>
                                    <Heart follow={item.isFavorite} onFollowChange={onFollowChange} />
                                    <Text style={styles.countTxt}>{item.favoriteCount}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        );
    }

    return (
        <View style={styles.root}>
            <Image style={[styles.bgImg, { height: bgImgHeight }]} source={icon_mine_bg} />
            {renderTitle()}
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={store.refreshing}
                        onRefresh={() => {
                            store.requestAll();
                        }}
                    />
                }
            >
                {renderInfo()}
                {renderTabs()}
                {renderList()}
            </ScrollView>
            <SideMenu ref={sideRef} />
        </View>
    )
});

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    bgImg: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 400
    },
    scrollView: {
        flex: 1,
        width: '100%'
    }
})