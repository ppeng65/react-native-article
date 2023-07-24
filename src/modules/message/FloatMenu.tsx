import { Image, View, Text, StyleSheet, StatusBar, Modal, TouchableOpacity } from 'react-native';
import React, { forwardRef, useState, useImperativeHandle } from 'react';

import icon_group from '../../assets/icon_group.png';
import icon_create_group from '../../assets/icon_create_group.png';

export interface FloatMenuRef {
    show: (y: number) => void,
    hide: () => void
}

export default forwardRef((props: any, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [y, setY] = useState<number>(0);

    useImperativeHandle(ref, () => ({
        show,
        hide
    }))

    const show = (pageY: number) => {
        setY(pageY + (StatusBar.currentHeight || 0));
        setVisible(true);
    }

    const hide = () => {
        setVisible(false);
    }

    const renderMenus = () => {
        return (
            <View style={[styles.content, { top: y }]}>
                <TouchableOpacity style={styles.menuItem}>
                    <Image style={styles.menuIcon} source={icon_group} />
                    <Text style={styles.menuTxt}>群聊广场</Text>
                </TouchableOpacity>

                <View style={styles.line} />

                <TouchableOpacity style={styles.menuItem}>
                    <Image style={styles.menuIcon} source={icon_create_group} />
                    <Text style={styles.menuTxt}>创建群聊</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            statusBarTranslucent={true}
            animationType='fade'
            onRequestClose={hide}
        >
            <TouchableOpacity style={styles.root} onPress={hide}>
                {renderMenus()}
            </TouchableOpacity>
        </Modal>
    )
})

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00000040'
    },
    content: {
        position: 'absolute',
        right: 16,
        width: 170,
        borderRadius: 16,
        backgroundColor: 'white'
    },
    menuItem: {
        paddingLeft: 20,
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuIcon: {
        width: 28,
        height: 28,
        resizeMode: 'cover'
    },
    menuTxt: {
        marginLeft: 10,
        fontSize: 18,
        color: '#333'
    },
    line: {
        marginHorizontal: 20,
        height: 1,
        backgroundColor: '#eee'
    }
});
