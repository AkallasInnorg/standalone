import { StyleSheet, SafeAreaView, FlatList, Text, SectionList } from "react-native"
import { ListItem } from "@rneui/themed";
import { useState, useEffect } from "react";
import { Card } from "react-native-elements"
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";


export default function WikiGridList() {
    const toggle = false
    const [data, setData] = useState([])
    const dataSource = [
        { title: 1, data: ['File1'] },
        { title: 2, data: ['File2'] },
        { title: 3, data: ['File3'] },
        { title: 4, data: ['File4'] },
        { title: 5, data: ['File5'] },
        { title: 6, data: ['File6'] },
        { title: 7, data: ['File7'] },
        { title: 8, data: ['File8'] },
        { title: 9, data: ['File9'] },
        { title: 10, data: ['File10'] },
        { title: 11, data: ['File11'] },
        { title: 12, data: ['File12'] },
        { title: 13, data: ['File13'] },
        { title: 14, data: ['File14'] },
        { title: 15, data: ['File15'] },
        { title: 16, data: ['File16'] },
        { title: 17, data: ['File17'] },
        { title: 18, data: ['File18'] },
        { title: 19, data: ['File19'] },
        { title: 20, data: ['File20'] },
        { title: 21, data: ['File21'] },
        { title: 22, data: ['File22'] },
        { title: 23, data: ['File23'] },
        { title: 24, data: ['File24'] },
        { title: 25, data: ['File25'] },
    ]

    function getDocs() {
        axios.get(`http://localhost:3000/documents/all`).then(
            function (res) {
                console.log(res.data)
                // data = res.data
                setData(res.data)
                console.log(dataSource)
            }
        )
    }

    useEffect(() => {
        getDocs()
    }, [])


    return (
        <SafeAreaView style={styles.container1}>
            {
            toggle ? <FlatList
                columnWrapperStyle={{
                    flex: 1,
                    paddingVertical: 0,
                }}
                data={dataSource}
                renderItem={({ item }) => (
                    <Card containerStyle={styles.cardStyle2}>
                        <Text style={{ color: 'white' }}>{item.item}</Text>
                    </Card>
                )}
                //Setting the number of column
                numColumns={5}
                keyExtractor={(item, index) => index}
            /> :
            
                
                <FlatList
                data={data}
                renderItem={({ item }) => 
                <ListItem 
                containerStyle={{paddingVertical: 0, width: '100%', paddingHorizontal: 0}}
                title={item.title}>
                    <Card containerStyle={styles.cardStyle1}>
                        <Ionicons name="document-text-outline" />
                        <Text style={{ color: 'black' }}>{item.name}</Text>
                    </Card>
                </ListItem>}/>
                }
        </SafeAreaView>
        
    )
}
{/* <SectionList
                data={data}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                    <Card containerStyle={styles.cardStyle1}>
                        <Ionicons name="document-text-outline" />
                        <Text style={{ color: 'white' }}>{item}</Text>
                    </Card>
                )} /> */}

const styles = StyleSheet.create({
    cardStyle1: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'grey',
        borderRadius: 15,
        margin: 0,
        flexDirection: "row"
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'plum',
        width: '90%',
        borderRadius: 15,
        flexDirection: 'row'
    },
    cardStyle2: {
        flex: 1,
        width: '30%',
        backgroundColor: 'grey',
        borderRadius: 15,
        borderColor: 'black',
        margin: '0.02%',
        paddingVertical: '6%',
        elevation: 10,
    },
})