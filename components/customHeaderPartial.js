import React, { useState } from 'react';
import { Text, View} from 'react-native';
// import { useTheme } from '@react-navigation/native';
// import { SelectList } from 'react-native-dropdown-select-list';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Button } from 'react-native-elements';

import TextCarouselClass from './classTextCarousel';

export default function CustomHeader({period, leftFunction, rightFunction, frase}) {
    // const { colors } = useTheme();
    const [selected, setSelected] = useState('');
    const data = [
        { key: 'Giorno', value: 'il tuo giorno' },
        { key: 'Settimana', value: 'la tua settimana' },
        { key: 'Mese', value: 'il tuo mese' }
    ]
    return (
        <View style={{ flexDirection: 'row', zIndex: 4}}>
            <View style={{ flexDirection: 'row'}}>
                <Text style={{fontSize: '200%', marginLeft: '5%', marginTop: '10%'}}>
                    Ciao </Text><Text style={{ color: '#E8A383', fontSize: '200%',
                marginTop: '10%', marginLeft: '5%' }}>Amir</Text>
                <Text 
                style={{fontSize: '200%', marginLeft: '5%', marginTop: '10%'}}>
                    {frase}</Text></View>
            <View style={{ width: '60%', zIndex: 4}}>
                <TextCarouselClass
                period={period}
                leftFunction={leftFunction}
                rightFunction={rightFunction}/>
            </View>
        </View>
    )
}