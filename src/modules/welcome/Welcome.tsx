import { View, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getItem } from '../../utils/Storage';

import icon_main_logo from '../../assets/icon_main_logo.png';

export default () => {

    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        setTimeout(async () => {
            getUserInfo();
        }, 2000);
    }, []);

    const getUserInfo = async () => {
        const userInfo = await getItem('userInfo');
        if (userInfo && userInfo.name) {
            jumpMainTab();
        } else {
            jumpLogin();
        }
    }

    const jumpLogin = () => {
        navigation.replace('Login');
    }

    const jumpMainTab = () => {
        navigation.replace('MainTab');
    }

    return (
        <View style={styles.root}>
            <Image style={styles.logo} source={icon_main_logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    logo: {
        marginTop: 200,
        width: 200,
        height: 110,
        resizeMode: 'contain'
    }
});