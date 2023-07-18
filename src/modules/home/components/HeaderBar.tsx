import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

import icon_daily from '../../../assets/icon_daily.png';
import icon_search from '../../../assets/icon_search.png';

type Props = {
    tab: number,
    onChangeTab: (tabIndex: number) => void
}

export default (props: Props) => {
    const { tab, onChangeTab } = props;

    const [tabIndex, setTabIndex] = useState<number>(1);

    useEffect(() => {
        setTabIndex(tab);
    }, [])

    return (
        <View style={headerStyles.headerLayout}>
            <TouchableOpacity style={[headerStyles.imgBtn, headerStyles.dailyBtn]}>
                <Image style={headerStyles.icon} source={icon_daily} />
            </TouchableOpacity>

            <TouchableOpacity style={headerStyles.tabBtn} onPress={() => {
                setTabIndex(0);
                onChangeTab?.(0);
            }}>
                <Text style={tabIndex === 0 ? headerStyles.tabTxtSelected : headerStyles.tabTxt}>关注</Text>
                {tabIndex === 0 && <View style={headerStyles.line} />}
            </TouchableOpacity>
            <TouchableOpacity style={headerStyles.tabBtn} onPress={() => {
                setTabIndex(1);
                onChangeTab?.(1);
            }}>
                <Text style={tabIndex === 1 ? headerStyles.tabTxtSelected : headerStyles.tabTxt}>发现</Text>
                {tabIndex === 1 && <View style={headerStyles.line} />}
            </TouchableOpacity>
            <TouchableOpacity style={headerStyles.tabBtn} onPress={() => {
                setTabIndex(2);
                onChangeTab?.(2);
            }}>
                <Text style={tabIndex === 2 ? headerStyles.tabTxtSelected : headerStyles.tabTxt}>北京</Text>
                {tabIndex === 2 && <View style={headerStyles.line} />}
            </TouchableOpacity>

            <TouchableOpacity style={[headerStyles.imgBtn, headerStyles.searchBtn]}>
                <Image style={headerStyles.icon} source={icon_search} />
            </TouchableOpacity>
        </View>
    );
}

const headerStyles = StyleSheet.create({
    headerLayout: {
        paddingHorizontal: 16,
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    imgBtn: {
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dailyBtn: {
        paddingRight: 12,
        marginRight: 42
    },
    searchBtn: {
        paddingLeft: 12,
        marginLeft: 42
    },
    icon: {
        width: 28,
        height: 28,
    },
    tabBtn: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabTxt: {
        fontSize: 15,
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