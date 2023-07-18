import { Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    uri: string;
};

export default ({ uri }: Props) => {

    const [height, setHeight] = useState<number>(200);
    const imgRef = useRef<Image>(null);

    useEffect(() => {
        Image.getSize(uri, (width: number, height: number) => {
            imgRef.current?.measureInWindow((x, y, boxWidth, boxHeight) => {
                const showHeight = boxWidth * height / width;
                setHeight(showHeight);
            });
        })
    }, [uri]);


    return (
        <Image
            ref={imgRef}
            style={{
                width: '100%',
                height,
                resizeMode: 'cover'
            }}
            source={{ uri }}
        />
    )
}