import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { format, replaceBlank } from '../../utils/StringUtil';

import icon_triangle from '../../assets/icon_triangle.png';
import icon_eye_open from '../../assets/icon_eye_open.png';
import icon_eye_close from '../../assets/icon_eye_close.png';
import icon_exchange from '../../assets/icon_exchange.png';
import icon_wx from '../../assets/icon_wx.png';
import icon_qq from '../../assets/icon_qq.webp';
import icon_close_modal from '../../assets/icon_close_modal.png';

type Props = {
    onChangeLoginType: () => void,
    jumpMainTab: (phone: string, pwd: string) => void,
    children: JSX.Element
}

export default (props: Props) => {
    const [eyeOpen, setEyeOpen] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const { onChangeLoginType, jumpMainTab } = props;

    const canLogin = phone?.length === 13 && pwd?.length === 6;
    return (
        <View style={styles.root}>
            <Text style={styles.pwdLogin}>密码登录</Text>
            <Text style={styles.tip}>未注册的手机号登录成功后将自动注册</Text>
            <View style={styles.phoneLayout}>
                <Text style={styles.pre86}>+86</Text>
                <Image style={styles.icon_triangle} source={icon_triangle} />
                <TextInput
                    style={styles.phoneInput}
                    placeholder='请输入手机号码'
                    placeholderTextColor='#ddd'
                    maxLength={13}
                    autoFocus={false}
                    keyboardType='number-pad'
                    value={phone}
                    onChangeText={(value: string) => {
                        setPhone(format(value));
                    }}
                />
            </View>
            <View style={styles.pwdLayout}>
                <TextInput
                    style={styles.pwdInput}
                    placeholder='请输入密码'
                    placeholderTextColor='#ddd'
                    maxLength={6}
                    autoFocus={false}
                    keyboardType='number-pad'
                    secureTextEntry={!eyeOpen}
                    value={pwd}
                    onChangeText={(value: string) => {
                        setPwd(value);
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        setEyeOpen(!eyeOpen);
                    }}
                >
                    <Image style={styles.icon_eyes} source={eyeOpen ? icon_eye_open : icon_eye_close} />
                </TouchableOpacity>
            </View>
            <View style={styles.changeLayout}>
                <Image style={styles.icon_exchange} source={icon_exchange} />
                <Text style={styles.codeLoginTxt}>验证码登录</Text>
                <Text style={styles.forgetPwdTxt}>忘记密码？</Text>
            </View>
            <TouchableOpacity
                activeOpacity={canLogin ? 0.7 : 1}
                style={[styles.loginBtn, !canLogin && styles.loginBtnDisable]}
                onPress={() => {
                    if (!canLogin) {
                        return;
                    }
                    const purePhone: string = replaceBlank(phone);
                    jumpMainTab(purePhone, pwd);
                }}
            >
                <Text style={styles.loginBtntxt}>登录</Text>
            </TouchableOpacity>
            <View style={styles.protocolWrap}>
                {props.children}
            </View>
            <View style={styles.wxqqLayout}>
                <Image style={styles.icon_wx} source={icon_wx} />
                <Image style={styles.icon_wx} source={icon_qq} />
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={() => {
                onChangeLoginType()
            }}>
                <Image style={styles.closeImg} source={icon_close_modal} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 48,
        flexDirection: 'column',
        alignItems: 'center'
    },
    pwdLogin: {
        marginTop: 56,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333'
    },
    tip: {
        marginTop: 6,
        fontSize: 14,
        color: '#ddd'
    },
    phoneLayout: {
        marginTop: 28,
        width: '100%',
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    pre86: {
        fontSize: 24,
        color: '#999'
    },
    icon_triangle: {
        marginLeft: 6,
        width: 12,
        height: 6,
        resizeMode: 'contain'
    },
    phoneInput: {
        marginLeft: 16,
        flex: 1,
        height: 60,
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 24,
        color: '#333',
        backgroundColor: 'transparent'
    },
    pwdLayout: {
        marginTop: 8,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    pwdInput: {
        marginRight: 16,
        flex: 1,
        height: 60,
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 24,
        color: '#333',
        backgroundColor: 'transparent'
    },
    icon_eyes: {
        width: 30,
        height: 30
    },
    changeLayout: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon_exchange: {
        marginTop: 2,
        width: 16,
        height: 16
    },
    codeLoginTxt: {
        marginLeft: 4,
        flex: 1,
        fontSize: 14,
        color: '#303080'
    },
    forgetPwdTxt: {
        fontSize: 14,
        color: '#303080'
    },
    loginBtn: {
        marginTop: 20,
        width: '100%',
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        backgroundColor: '#ff2442'
    },
    loginBtnDisable: {
        color: '',
        backgroundColor: '#dddddd'
    },
    loginBtntxt: {
        fontSize: 20,
        color: 'white'
    },
    protocolWrap: {
        marginTop: 12
    },
    wxqqLayout: {
        marginTop: 54,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    icon_wx: {
        width: 50,
        height: 50
    },
    closeBtn: {
        position: 'absolute',
        left: 36,
        top: 24
    },
    closeImg: {
        width: 28,
        height: 28
    }
});