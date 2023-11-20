import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, useWindowDimensions } from 'react-native';
import CustomStyles from '../utils/globalStyles';
import TextCarouselClass from './classTextCarousel';

export default function TimeSheet() {
    const periods = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile',
        'Maggio', 'Giugno', 'Luglio', 'Agosto',
        'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    var [period, setPeriod] = useState(periods[0]);
    var [count, setCount] = useState(0);
    const style = CustomStyles();
    const [dataSource, setDataSource] = useState([]);

    function changePeriodRight() {
        if (count < 11) {
            count++
            setCount(count)
            setPeriod(periods[count])
            // console.log(period)
        } else {
            count = 0;
            setCount(count);
            setPeriod(periods[count])
            // console.log(period)
        }
    }
    function changePeriodLeft() {
        if (count > 0) {
            count--
            setCount(count)
            setPeriod(periods[count])
            // console.log(period)
        } else {
            count = 11
            setCount(count)
            setPeriod(periods[count])
            // console.log(period)
        }
    }

    useEffect(() => {
        let items = Array.apply(null, Array(35)).map((v, i) => {
            return {
                id: i,
                src: 'https://unsplash.it/400/400?image=' + (i + 1)
            };
        });
        setDataSource(items);
    }, []);

    return (
        <SafeAreaView style={style.container}>

            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <TextCarouselClass period={period} 
                        leftFunction={changePeriodLeft} rightFunction={changePeriodRight} />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: '99%',
                            alignSelf: 'center'
                        }}>
                            <Text style={{}}>Lunedì</Text>
                            <Text style={{ marginLeft: '1%' }}>Martedì</Text>
                            <Text style={{}}>Mercoledì</Text>
                            <Text style={{ marginRight: '0.5%' }}>Giovedì</Text>
                            <Text style={{}}>Venerdì</Text>
                        </View></View>
                }
                data={dataSource}
                renderItem={({ item }) => (
                    <View
                        // <Card
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            margin: 4,
                            height: 100,
                            width: 20,
                            borderRadius: 10,
                            borderWidth: 1.5
                        }}>
                        <Text style={{ alignSelf: 'center', textAlignVertical: 'top' }}>
                            {item.id + 1}</Text>
                    </View>
                    // </Card>
                )}
                //Setting the number of column
                numColumns={5}
                keyExtractor={(item, index) => index}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'plum',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
});