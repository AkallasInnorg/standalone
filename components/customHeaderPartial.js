import React, { useState } from 'react';
import { Text, View } from 'react-native';

import TextCarouselClass from './classTextCarousel';

export default function CustomHeader({ period, leftFunction, rightFunction, frase }) {
    // const { colors } = useTheme();
    return (
        <View style={{flexDirection: 'row', zIndex: 4, width: '50%'}}>
                <Text style={{ fontSize: '200%', marginLeft: '2%', marginTop: '3%' }}>
                    Ciao </Text><Text style={{
                        color: '#E8A383', fontSize: '200%',
                        marginTop: '3%', 
                        marginLeft: '1%'
                    }}>Amir</Text>
                <Text
                    style={{ fontSize: '200%', marginLeft: '2%', marginTop: '3%' }}>
                    {frase}</Text>
            <View style={{ width: '30%', zIndex: 4}}>
                <TextCarouselClass
                    period={period}
                    leftFunction={leftFunction}
                    rightFunction={rightFunction}/>
            </View>
        </View>
    )
}