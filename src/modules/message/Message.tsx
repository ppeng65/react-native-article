import { FlatList, Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import MessageStore from '../../stores/MessageStore';
import FloatMenu, { FloatMenuRef } from './FloatMenu';

import icon_group from '../../assets/icon_group.png';
import icon_star from '../../assets/icon_star.png';
import icon_new_follow from '../../assets/icon_new_follow.png';
import icon_comments from '../../assets/icon_comments.png';
import icon_to_top from '../../assets/icon_to_top.png';

export default observer(() => {
    const store = useLocalObservable(() => new MessageStore());
    const [pageY, setePageY] = useState<number>(0);
    const ref = useRef<FloatMenuRef>(null);

    useEffect(() => {
        store.requestMessageList();
        store.requestUnRead();
    }, []);

    const renderTitle = () => {
        return (
            <View style={styles.titleLayout}>
                <Text style={styles.titleTxt}>消息</Text>
                <TouchableOpacity
                    style={styles.groupBtn}
                    onLayout={(e) => {
                        const { y } = e.nativeEvent.layout;
                        setePageY(y);
                    }}
                    onPress={() => {
                        ref.current?.show(pageY + 48);
                    }}
                >
                    <Image style={styles.icon_group} source={icon_group} />
                    <Text style={styles.groupTxt}>群聊</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const UnReadCount = ({ count }: { count: number }) => {
        const styles = StyleSheet.create({
            txt: {
                position: 'absolute',
                top: -6,
                right: -10,
                paddingHorizontal: 8,
                height: 24,
                fontSize: 12,
                borderRadius: 12,
                textAlign: 'center',
                textAlignVertical: 'center',
                color: 'white',
                backgroundColor: '#ff2442'
            }
        })
        return <Text style={styles.txt}>{count > 99 ? '99+' : count}</Text>
    }

    const ListHeader = () => {
        const headerStyles = StyleSheet.create({
            headerLayout: {
                paddingVertical: 20,
                paddingHorizontal: 16,
                flexDirection: 'row'
            },
            headerItem: {
                flex: 1,
                alignItems: 'center'
            },
            itemImg: {
                width: 60,
                height: 60
            },
            itemTxt: {
                marginTop: 8,
                fontSize: 16,
                color: '#333'
            }
        });

        const { unread } = store;

        return (
            <View style={headerStyles.headerLayout}>
                <View style={headerStyles.headerItem}>
                    <View>
                        <Image style={headerStyles.itemImg} source={icon_star} />
                        {unread?.unreadFavorate && <UnReadCount count={unread.unreadFavorate} />}
                    </View>
                    <Text style={headerStyles.itemTxt}>赞和收藏</Text>
                </View>
                <View style={headerStyles.headerItem}>
                    <View>
                        <Image style={headerStyles.itemImg} source={icon_new_follow} />
                        {unread?.newFollow && <UnReadCount count={unread.newFollow} />}
                    </View>
                    <Text style={headerStyles.itemTxt}>新增关注</Text>
                </View>
                <View style={headerStyles.headerItem}>
                    <View>
                        <Image style={headerStyles.itemImg} source={icon_comments} />
                        {unread?.comment && <UnReadCount count={unread.comment} />}
                    </View>
                    <Text style={headerStyles.itemTxt}>评论和@</Text>
                </View>
            </View>
        );
    }

    const renderitem = ({ item, index }: { item: MessageListItem, index: number }) => {
        const styles = StyleSheet.create({
            item: {
                paddingHorizontal: 16,
                width: '100%',
                height: 80,
                flexDirection: 'row',
                alignItems: 'center'
            },
            avatarImg: {
                width: 48,
                height: 48,
                borderRadius: 24,
                resizeMode: 'cover'
            },
            contentLayout: {
                flex: 1,
                marginHorizontal: 12,
            },
            nameTxt: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#333'
            },
            lastMessageTxt: {
                marginTop: 4,
                fontSize: 15,
                color: '#999'
            },
            rightLayout: {
                alignItems: 'flex-end'
            },
            timeTxt: {
                fontSize: 12,
                color: '#999'
            },
            iconTop: {
                marginTop: 6,
                width: 8,
                height: 16,
                resizeMode: 'contain'
            }
        });

        return (
            <View style={styles.item}>
                <Image style={styles.avatarImg} source={{ uri: item.avatarUrl }} />
                <View style={styles.contentLayout}>
                    <Text style={styles.nameTxt}>{item.name}</Text>
                    <Text style={styles.lastMessageTxt}>{item.lastMessage}</Text>
                </View>
                <View style={styles.rightLayout}>
                    <Text style={styles.timeTxt}>{item.lastMessageTime}</Text>
                    <Image style={styles.iconTop} source={icon_to_top} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.root}>
            {renderTitle()}
            <FlatList
                style={{ flex: 1 }}
                data={store.messageList}
                extraData={store.unread}
                keyExtractor={item => `${item.id}`}
                ListHeaderComponent={<ListHeader />}
                renderItem={renderitem}
            />

            <FloatMenu ref={ref} />
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
        width: '100%',
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleTxt: {
        fontSize: 18,
        color: '#333'
    },
    groupBtn: {
        position: 'absolute',
        right: 16,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon_group: {
        width: 16,
        height: 16
    },
    groupTxt: {
        marginLeft: 6,
        fontSize: 14,
        color: '#333'
    }
});
