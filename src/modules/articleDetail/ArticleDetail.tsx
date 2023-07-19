import { Dimensions, Image, View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';
import ArticleDetailStore from '../../stores/ArticleDetailStore';
import UserStore from '../../stores/UserStore';

import { ImageSlider } from '../../components/slidePager';
import Heart from '../../components/Heart';

import icon_arrow from '../../assets/icon_arrow.png';
import icon_share from '../../assets/icon_share.png';
import icon_edit_comment from '../../assets/icon_edit_comment.png';
import icon_collection from '../../assets/icon_collection.png';
import icon_collection_selected from '../../assets/icon_collection_selected.png';
import icon_comment from '../../assets/icon_comment.png';

type RouteParams = {
    ArticleDetail: {
        id: number
    }
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default observer(() => {

    const store = useLocalObservable(() => new ArticleDetailStore());
    const navigation = useNavigation<StackNavigationProp<any>>()

    const { params } = useRoute<RouteProp<RouteParams, 'ArticleDetail'>>();

    const [height, setHeight] = useState<number>(400);

    useEffect(() => {
        store.requestArtilceDetail(params.id);
    }, []);

    useEffect(() => {
        if (!store.detail?.images?.length) return;

        const firstImg = store.detail?.images?.[0];
        Image.getSize(firstImg, (width: number, height: number) => {
            const showHeight = SCREEN_WIDTH * height / width;
            setHeight(showHeight);
        })
    }, [store.detail?.images]);

    const renderTitle = () => {
        const { detail } = store;

        return (
            <View style={styles.titleLayout}>
                <TouchableOpacity style={styles.backBtn} onPress={() => {
                    navigation.pop();
                }}>
                    <Image style={styles.backImg} source={icon_arrow} />
                </TouchableOpacity>
                <Image style={styles.avatarImg} source={{ uri: detail.avatarUrl }} />
                <Text style={styles.userNameTxt}>{detail.userName}</Text>
                <Text style={styles.followTxt}>关注</Text>
                <Image style={styles.shareImg} source={icon_share} />
            </View>
        )
    }

    const renderImages = () => {
        const { detail } = store;
        if (!detail.images?.length) {
            return null;
        }

        const data: any[] = detail.images.map(i => ({ img: i }));

        return (
            <View style={{ paddingBottom: 30 }}>
                <ImageSlider
                    data={data}
                    autoPlay={false}
                    closeIconColor='white'
                    caroselImageStyle={{ height }}
                    indicatorContainerStyle={{
                        bottom: -40
                    }}
                    inActiveIndicatorStyle={styles.inActiveDot}
                    activeIndicatorStyle={styles.activeDot}
                />
            </View>
        )
    }

    const renderInfo = () => {
        const { detail } = store;
        const tags = detail.tag?.map(i => `# ${i}`).join(' ');
        return (
            <>
                <Text style={styles.articleTitleTxt}>{detail.title}</Text>
                <Text style={styles.descTxt}>{detail.desc}</Text>
                <Text style={styles.tagsTxt}>{tags}</Text>
                <Text style={styles.timeAndLocationTxt}>{detail.dateTime}  {detail.location}</Text>
                <View style={styles.line} />
            </>
        );
    }

    const renderComments = () => {
        const { detail } = store;
        const count = detail.comments?.length || 0;

        const styles = StyleSheet.create({
            commentsTxt: {
                marginTop: 20,
                marginLeft: 16,
                fontSize: 14,
                color: '#666'
            },
            inputLayout: {
                width: '100%',
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center'
            },
            userAvatar: {
                width: 32,
                height: 32,
                borderRadius: 16,
                resizeMode: 'cover'
            },
            commentInput: {
                marginLeft: 12,
                paddingHorizontal: 12,
                paddingVertical: 0,
                flex: 1,
                height: 32,
                fontSize: 14,
                textAlignVertical: 'center',
                borderRadius: 16,
                color: '#333',
                backgroundColor: '#f0f0f0'
            },
            commentsContainer: {
                paddingHorizontal: 12,
                paddingTop: 16,
                paddingBottom: 32
            },
            commentItem: {
                width: '100%',
                flexDirection: 'row',
            },
            cAvatar: {
                width: 36,
                height: 36,
                resizeMode: 'cover',
                borderRadius: 18
            },
            contentLayout: {
                flex: 1,
                marginHorizontal: 12
            },
            nameTxt: {
                fontSize: 12,
                color: '#999'
            },
            messageTxt: {
                marginTop: 6,
                fontSize: 14,
                color: '#333'
            },
            timeLocationTxt: {
                fontSize: 12,
                color: '#bbb'
            },
            countLayout: {
                alignItems: 'center'
            },
            fCount: {
                marginTop: 2,
                fontSize: 12,
                color: '#666'
            },
            divider: {
                marginVertical: 16,
                marginLeft: 50,
                marginRight: 0,
                height: StyleSheet.hairlineWidth,
                backgroundColor: '#eee'
            }
        })

        return (
            <>
                <Text style={styles.commentsTxt}>
                    {count ? `共 ${count} 条评论` : '暂无评论'}
                </Text>
                <View style={styles.inputLayout}>
                    <Image style={styles.userAvatar} source={{ uri: UserStore.userInfo?.avatar }} />
                    <TextInput
                        style={styles.commentInput}
                        placeholder='说点什么吧，万一火了呢'
                        placeholderTextColor='#bbb'
                    />
                </View>
                {
                    !!count &&
                    <View style={styles.commentsContainer}>
                        {
                            detail.comments?.map((i: ArticleComment, index: number) => {
                                return (
                                    <View key={index}>
                                        <View style={styles.commentItem}>
                                            <Image style={styles.cAvatar} source={{ uri: i.avatarUrl }} />
                                            <View style={styles.contentLayout}>
                                                <Text style={styles.nameTxt}>{i.userName}</Text>
                                                <Text style={styles.messageTxt}>
                                                    {i.message}
                                                    <Text style={styles.timeLocationTxt}> {dayjs(i.dateTime).format('MM-DD')} {i.location}</Text>
                                                </Text>
                                                {
                                                    !!i.children?.length &&
                                                    i.children.map((j: ArticleComment, subIndex: number) => {
                                                        return (
                                                            <View key={`${index}_${subIndex}`} style={[styles.commentItem, { marginTop: 12, width: SCREEN_WIDTH - 72 }]}>
                                                                <Image style={styles.cAvatar} source={{ uri: j.avatarUrl }} />
                                                                <View style={styles.contentLayout}>
                                                                    <Text style={styles.nameTxt}>{j.userName}</Text>
                                                                    <Text style={styles.messageTxt}>
                                                                        {j.message}
                                                                        <Text style={styles.timeLocationTxt}> {dayjs(j.dateTime).format('MM-DD')} {j.location}</Text>
                                                                    </Text>
                                                                </View>

                                                                <View style={styles.countLayout}>
                                                                    <Heart follow={j.isFavorite} size={20} />
                                                                    <Text style={styles.fCount}>{j.favoriteCount}</Text>
                                                                </View>
                                                            </View>
                                                        );
                                                    })
                                                }
                                            </View>

                                            <View style={styles.countLayout}>
                                                <Heart follow={i.isFavorite} size={20} />
                                                <Text style={styles.fCount}>{i.favoriteCount}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.divider} />
                                    </View>
                                );
                            })
                        }
                    </View>
                }
            </>
        )
    }

    const renderBottom = () => {
        const { detail } = store;

        return (
            <View style={styles.bottomLayout}>
                <View style={styles.bottomEditLayout}>
                    <Image style={styles.iconEdit} source={icon_edit_comment} />
                    <TextInput
                        style={styles.bottomCommentInput}
                        placeholder='说点什么'
                        placeholderTextColor='#333'
                    />
                </View>
                <Heart follow={detail.isFavorite} size={30} />
                <Text style={styles.bottomCount}>{detail.favoriteCount}</Text>
                <Image style={styles.bottomIcon} source={detail.isCollection ? icon_collection_selected : icon_collection} />
                <Text style={styles.bottomCount}>{detail.collectionCount}</Text>
                <Image style={styles.bottomIcon} source={icon_comment} />
                <Text style={styles.bottomCount}>{detail.comments?.length || 0}</Text>
            </View>
        )
    }

    return store.detail?.id ? (
        <View style={styles.root}>
            {renderTitle()}
            <ScrollView
                style={{
                    flex: 1
                }}
                showsVerticalScrollIndicator={false}
            >
                {renderImages()}
                {renderInfo()}
                {renderComments()}
            </ScrollView>
            {renderBottom()}
        </View>
    ) : null
});

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    titleLayout: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    backBtn: {
        paddingHorizontal: 16,
        height: '100%',
        justifyContent: 'center'
    },
    backImg: {
        width: 20,
        height: 20
    },
    avatarImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: 'cover'
    },
    userNameTxt: {
        flex: 1,
        marginLeft: 16,
        fontSize: 15,
        color: '#333'
    },
    followTxt: {
        paddingHorizontal: 16,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 12,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ff2442',
        color: '#ff2442'
    },
    shareImg: {
        marginHorizontal: 16,
        width: 28,
        height: 28
    },
    inActiveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#c0c0c0'
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ff2442'
    },
    articleTitleTxt: {
        paddingHorizontal: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    descTxt: {
        marginTop: 6,
        paddingHorizontal: 16,
        fontSize: 15,
        color: '#333'
    },
    tagsTxt: {
        marginTop: 6,
        paddingHorizontal: 16,
        fontSize: 15,
        color: '#305090'
    },
    timeAndLocationTxt: {
        marginVertical: 16,
        marginLeft: 16,
        fontSize: 12,
        color: '#bbb'
    },
    line: {
        marginHorizontal: 16,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#eee'
    },
    bottomLayout: {
        paddingHorizontal: 16,
        width: '100%',
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },
    bottomEditLayout: {
        flex: 1,
        height: 40,
        paddingHorizontal: 12,
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#f0f0f0'
    },
    iconEdit: {
        width: 20,
        height: 20,
        tintColor: '#333'
    },
    bottomCommentInput: {
        height: '100%',
        paddingVertical: 0,
        flex: 1,
        textAlignVertical: 'center',
        fontSize: 16,
        color: '#333',
    },
    bottomCount: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    bottomIcon: {
        marginLeft: 12,
        width: 30,
        height: 30,
        resizeMode: 'contain'
    }
});