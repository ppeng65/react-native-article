import { Image, View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import CategoryModal, { ICategoryModalRef } from './ScrollHeaderModal';

import icon_arrow from '../../../assets/icon_arrow.png';

type Props = {
    allCategoryList: Category[],
    onChangeCategory: (category: Category) => void
}

export default (props: Props) => {

    const { allCategoryList, onChangeCategory } = props;

    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [category, setCategory] = useState<Category>();

    const modalRef = useRef<ICategoryModalRef>();


    useEffect(() => {
        const list = allCategoryList.filter(i => i.isAdd);
        setCategoryList(list);
        setCategory(list?.[0]);
    }, [allCategoryList]);

    const onCategoryPress = (category: Category) => {
        setCategory(category);
        onChangeCategory?.(category);
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {
                    categoryList.map((item: Category) => {
                        const isSelected = item.name === category?.name;

                        return(
                            <TouchableOpacity
                                key={item.name}
                                activeOpacity={0.7}
                                style={styles.tabItem}
                                onPress={() => onCategoryPress(item)}
                            >
                                <Text
                                    style={isSelected ? styles.tabItemTxtSelected : styles.tabItemTxt}
                                >{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
            <TouchableOpacity style={styles.openBtn} onPress={() => {
                modalRef?.current?.show();
            }}>
                <Image style={styles.img} source={icon_arrow} />
            </TouchableOpacity>

            <CategoryModal
                ref={modalRef}
                allCategoryList={allCategoryList}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 6,
        width: '100%',
        height: 36,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    scrollView: {
        flex: 1,
        height: '100%'
    },
    tabItem: {
        width: 64,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabItemTxt: {
        fontSize: 16,
        color: '#999'
    },
    tabItemTxtSelected: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    openBtn: {
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 18,
        height: 18,
        transform: [{ rotate: '-90deg' }]
    }
});