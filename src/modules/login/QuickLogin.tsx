import { View, Image, Linking, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

import icon_main_logo from '../../assets/icon_main_logo.png';
import icon_wx_small from '../../assets/icon_wx_small.png';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_selected from '../../assets/icon_selected.png';
import icon_unselected from '../../assets/icon_unselected.png';

type Props = {
    onChangeLoginType: () => void,
    children: JSX.Element
}

export default (props: Props) => {
    const { onChangeLoginType } = props;

    return (
        <View style={styles.root}>
            <Image style={styles.logo} source={icon_main_logo} />

            <TouchableOpacity style={[styles.loginBtn, styles.oneKeyLoginBtn]}>
                <Text style={styles.loginTxt}>一键登录</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.loginBtn, styles.wxLoginBtn]}>
                <Image style={styles.icon_wx} source={icon_wx_small} />
                <Text style={styles.loginTxt}>微信登录</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.otherLoginBtn} onPress={() => {
                onChangeLoginType()
            }}>
                <Text style={styles.otherLoginTxt}>其它登陆方式</Text>
                <Image style={styles.icon_arrow} source={icon_arrow} />
            </TouchableOpacity>

            <View style={styles.protocolWrap}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 56,
        paddingBottom: 40,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    logo: {
        position: 'absolute',
        top: 170,
        width: 180,
        height: 95,
        resizeMode: 'contain'
    },
    loginBtn: {
        width: '100%',
        height: 56,
        borderRadius: 28,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTxt: {
        fontSize: 18,
        color: 'white'
    },
    oneKeyLoginBtn:  {
        marginBottom: 20,
        backgroundColor: '#ff2442'
    },
    wxLoginBtn: {
        backgroundColor: '#05c160'
    },
    icon_wx: {
        marginTop: 5,
        marginRight: 6,
        width: 40,
        height: 40
    },
    otherLoginBtn: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    otherLoginTxt: {
        fontSize: 16,
        color: '#303080'
    },
    icon_arrow: {
        marginLeft: 6,
        marginTop: 5,
        width: 14,
        height: 14,
        resizeMode: 'contain',
        transform: [{rotate: '180deg'}]
    },
    protocolWrap: {
        marginTop: 100
    }
});