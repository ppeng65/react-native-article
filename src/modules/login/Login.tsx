import { View, Image, Linking, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import QuickLogin from './QuickLogin';
import InputLogin from './InputLogin';
import Toast from '../../components/widget/Toast';

import UserStore from '../../stores/UserStore';

import icon_selected from '../../assets/icon_selected.png';
import icon_unselected from '../../assets/icon_unselected.png';

export default () => {
    const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
    const [isSelect, setIsSelect] = useState<boolean>(false);

    const navigation = useNavigation<StackNavigationProp<any>>();

    const onChangeLoginType = () => {
        LayoutAnimation.easeInEaseOut();
        setLoginType(state => {
            if (state == 'quick') {
                return 'input';
            }
            return 'quick';
        })
    }

    const onChangeSelect = () => {
        setIsSelect(!isSelect);
    }

    const jumpMainTab = async (phone: string, pwd: string) => {
        if (!isSelect) {
            return;
        }
        Keyboard.dismiss();
        UserStore.requestLogin(phone, pwd, (success) => {
            if (success) {
                navigation.replace('MainTab');
            } else {
                Toast.show('登录失败，请检查用户名和密码');
            }
        });
    }

    const renderQuickLogin = () => {
        return (
            <QuickLogin onChangeLoginType={onChangeLoginType}>
                <View style={styles.protocolLayout}>
                    <TouchableOpacity onPress={() => {
                        onChangeSelect();
                    }}>
                        <Image style={styles.radioBtn} source={isSelect ? icon_selected : icon_unselected} />
                    </TouchableOpacity>
                    <Text style={styles.lableTxt}>我已阅读并同意</Text>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL('https://www.baidu.com');
                            }}
                        >
                            <Text style={styles.protocolTxt}>《用户协议》和《隐私政策》</Text>
                        </TouchableOpacity>
                </View>
            </QuickLogin>
        )
    }

    const renderInputLogin = () => {
        return (
            <InputLogin onChangeLoginType={onChangeLoginType} jumpMainTab={jumpMainTab}>
                <View style={styles.protocolLayout}>
                    <TouchableOpacity onPress={() => {
                        onChangeSelect();
                    }}>
                        <Image style={styles.radioBtn} source={isSelect ? icon_selected : icon_unselected} />
                    </TouchableOpacity>
                    <Text style={styles.lableTxt}>我已阅读并同意</Text>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL('https://www.baidu.com');
                            }}
                        >
                            <Text style={styles.protocolTxt}>《用户协议》和《隐私政策》</Text>
                        </TouchableOpacity>
                </View>
            </InputLogin>
        )
    }

    return (
        <View style={styles.root}>
            {
                loginType === 'quick' ? renderQuickLogin() : renderInputLogin()
            }
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    protocolLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioBtn: {
        marginTop: 2,
        width: 20,
        height: 20
    },
    lableTxt: {
        marginLeft: 6,
        fontSize: 12,
        color: '#999'
    },
    protocolTxt: {
        fontSize: 12,
        color: '#1020ff'
    }
});