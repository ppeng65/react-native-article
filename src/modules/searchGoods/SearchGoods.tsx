import { Image, View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import icon_arrow from '../../assets/icon_arrow.png';
import icon_search from '../../assets/icon_search.png';

export default () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [showBack, setShowBack] = useState<boolean>(false);
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            setShowBack(true);
            inputRef.current?.focus();
        }, 100);
    }, []);

    const onBackPop = () => {
        LayoutAnimation.easeInEaseOut();
        setShowBack(false);
        inputRef.current?.blur();
        setTimeout(() => {
            navigation.pop();
        }, 300);
    }

    const renderTitle = () => {
        return (
            <View style={styles.titleLayout}>
                {showBack && <TouchableOpacity style={styles.backBtn} onPress={onBackPop}>
                    <Image style={styles.backImg} source={icon_arrow} />
                </TouchableOpacity>}
                <View style={styles.searchLayout}>
                    <Image style={styles.icon_search} source={icon_search} />
                    <TextInput
                        ref={inputRef}
                        style={styles.searchTxt}
                        placeholder='纯良小麦粉'
                        placeholderTextColor='#bbb'
                    />
                </View>
                <Text style={styles.searchBtn}>搜 索</Text>
            </View>
        );
    }

    return (
        <View>
            {renderTitle()}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
    },
    titleLayout: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    backBtn: {
        height: '100%',
        paddingLeft: 16,
        justifyContent: 'center'
    },
    backImg: {
        width: 20,
        height: 20
    },
    searchLayout: {
        marginLeft: 16,
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
        paddingHorizontal: 8,
        paddingVertical: 0,
        fontSize: 14,
        color: '#bbb'
    },
    searchBtn: {
        marginHorizontal: 12,
        fontSize: 16,
        color: '#666'
    }
})