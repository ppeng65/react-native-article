import { Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';

import icon_heart from '../assets/icon_heart.png';
import icon_heart_empty from '../assets/icon_heart_empty.png';

type Props = {
    follow: boolean,
    onFollowChange?: (follow: boolean) => void,
    size?: number
};

export default (props: Props) => {
    const { follow, onFollowChange, size = 20 } = props;

    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const scale = useRef<Animated.Value>(new Animated.Value(0)).current;
    const alpha = useRef<Animated.Value>(new Animated.Value(0)).current;

    useEffect(() => {
        setIsFavorite(follow);
    }, [follow]);

    const onImagePress = () => {
        const value = !isFavorite;

        setIsFavorite(value);
        onFollowChange?.(value);

        if (value) {
            alpha.setValue(1);

            const scaleAnim = Animated.timing(scale, {
                toValue: 1.8,
                duration: 200,
                useNativeDriver: false
            });

            const alphaAnim = Animated.timing(alpha, {
                toValue: 0,
                duration: 300,
                delay: 100,
                useNativeDriver: false
            });

            Animated.parallel([scaleAnim, alphaAnim]).start();
        } else {
            scale.setValue(0);
            alpha.setValue(0);
        }
    }

    return (
        <TouchableOpacity onPress={onImagePress}>
            <Image style={{ width: size, height: size, resizeMode: 'cover' }} source={isFavorite ? icon_heart : icon_heart_empty} />
            <Animated.View style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: size / 20,
                position: 'absolute',
                borderColor: '#ff2442',
                opacity: alpha,
                transform: [
                    { scale }
                ]
            }} />
        </TouchableOpacity>
    )
};
