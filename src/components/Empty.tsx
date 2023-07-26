import { Image, View, Text, StyleSheet } from 'react-native';
import React from 'react';

type Props = {
    icon: number,
    tips: string
}

export default ({ icon, tips }: Props) => {
    return (
        <View style={styles.root}>
            <Image style={styles.icon} source={icon} />
            <Text style={styles.tipsTxt}>{tips}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingTop: 120,
    },
    icon: {
        width: 96,
        height: 96,
        resizeMode: 'contain',
    },
    tipsTxt: {
        marginTop: 16,
        fontSize: 14,
        color: '#bbb'
    },
});