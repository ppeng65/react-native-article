import { Image, Modal, View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions, LayoutAnimation } from 'react-native';
import React, { forwardRef, useState, useImperativeHandle, useEffect, useCallback } from 'react';
import { setItem } from '../../../utils/Storage';

import icon_arrow from '../../../assets/icon_arrow.png';
import icon_delete from '../../../assets/icon_delete.png';

type Props = {
    allCategoryList: Category[],
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface ICategoryModalRef {
    show: () => void;
    hide: () => void;
}

export default forwardRef((props: Props, ref) => {

    const { allCategoryList } = props;

    const [myList, setMyList] = useState<Category[]>([]);
    const [otherList, setOtherList] = useState<Category[]>([]);

    const [visible, setVisible] = useState<boolean>(false);

    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        const list1 = allCategoryList.filter(i => i.isAdd);
        const list2 = allCategoryList.filter(i => !i.isAdd);

        setMyList(list1);
        setOtherList(list2);
    }, [allCategoryList]);

    const show = () => {
        setVisible(true);
    }

    const hide = () => {
        setVisible(false);
    }

    useImperativeHandle(ref, () => ({
        show,
        hide
    }));

    const onMyItemPress = useCallback((item: Category) => () => {
        if (!edit || item.default) {
            return;
        }
        const newMyList = myList.filter(i => i.name !== item.name);
        const copy = {...item, isAdd: false};
        const newOtherList = [...otherList, copy];

        LayoutAnimation.easeInEaseOut();
        setMyList(newMyList);
        setOtherList(newOtherList);
    }, [edit, myList, otherList]);

    const onOtherListPress = useCallback((item: Category) => () => {
        if (!edit) {
            return;
        }
        const newOtherList = otherList.filter(i => i.name !== item.name);
        const copy = {...item, isAdd: true};
        const newMyList = [...myList, copy];

        LayoutAnimation.easeInEaseOut();
        setOtherList(newOtherList);
        setMyList(newMyList);
    }, [edit, myList, otherList]);

    const renderMyList = () => {
        return (
            <>
                <View style={styles.row}>
                    <Text style={styles.titleTxt}>我的频道</Text>
                    <Text style={styles.subTxt}>点击进入频道</Text>
                    <TouchableOpacity style={styles.editBtn} onPress={() => {
                        setEdit((data) => {
                            if (data) {
                                setItem('categoryList', [...myList, ...otherList]);
                                return false;
                            }
                            return true;
                        });
                    }}>
                        <Text style={styles.editTxt}>
                            { edit ? '完成编辑' : '进入编辑' }
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => {
                        hide();
                    }}>
                        <Image style={styles.closeImg} source={icon_arrow} />
                    </TouchableOpacity>
                </View>
                <View style={styles.listContent}>
                    {
                        myList.map((item: Category) => {
                            return (
                                <TouchableOpacity
                                    key={item.name}
                                    activeOpacity={item.default ? 1 : 0.7}
                                    style={[styles.itemLayout, item.default && styles.itemLayoutDefault]}
                                    onPress={onMyItemPress(item)}
                                >
                                    <Text style={styles.itemTxt}>{ item.name }</Text>
                                    { edit && !item.default && <Image style={styles.deleteImg} source={icon_delete} /> }
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </>
        )
    }

    const renderOtherList = () => {
        return (
            <>
                <View style={[styles.row, { marginTop: 32 }]}>
                    <Text style={styles.titleTxt}>推荐频道</Text>
                    <Text style={styles.subTxt}>点击添加频道</Text>
                </View>
                <View style={styles.listContent}>
                    {
                        otherList.map((item: Category) => {
                            return (
                                <TouchableOpacity key={item.name} style={styles.itemLayout} onPress={onOtherListPress(item)}>
                                    <Text style={styles.itemTxt}>+ { item.name }</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </>
        )
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            statusBarTranslucent={true}
            animationType='fade'
            onRequestClose={hide}
        >
            <View style={styles.modalWrap}>
                <View style={styles.content}>
                    { renderMyList() }
                    { renderOtherList() }
                </View>
                <View style={styles.mask}></View>
            </View>
        </Modal>
    )
});

const styles = StyleSheet.create({
    modalWrap: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
    },
    content: {
        marginTop: 48 + (StatusBar.currentHeight || 0),
        paddingBottom: 40,
        width: '100%',
        backgroundColor: 'white'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleTxt: {
        marginLeft: 16,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    subTxt: {
        marginLeft: 12,
        flex: 1,
        fontSize: 13,
        color: '#999'
    },
    editBtn: {
        paddingHorizontal: 10,
        height: 28,
        justifyContent: 'center',
        borderRadius: 14,
        backgroundColor: '#eee'
    },
    editTxt: {
        fontSize: 13,
        color: '#3050ff'
    },
    closeBtn: {
        padding: 16
    },
    closeImg: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        transform: [{rotate: '90deg'}]
    },
    listContent: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemLayout: {
        marginTop: 12,
        marginLeft: 16,
        width: SCREEN_WIDTH - 80 >> 2,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 6
    },
    itemLayoutDefault: {
        backgroundColor: '#eee'
    },
    itemTxt: {
        fontSize: 16,
        color: '#666'
    },
    deleteImg: {
        position: 'absolute',
        top: -6,
        right: -6,
        width: 16,
        height: 16
    },
    mask: {
        width: '100%',
        flex: 1,
        backgroundColor: '#00000060'
    }
});