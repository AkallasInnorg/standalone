import { StyleSheet, SafeAreaView, FlatList, Text, SectionList } from "react-native"
import { Card } from "react-native-elements"

export default function WikiGridList() {

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
        { title: 19, data: ['File19' ]},
        { title: 20, data: ['File20'] },
        { title: 21, data: ['File21'] },
        { title: 22, data: ['File22'] },
        { title: 23, data: ['File23'] },
        { title: 24, data: ['File24'] },
        { title: 25, data: ['File25'] },
    ]




    return (
        <SafeAreaView style={styles.container1}>
            {/* <FlatList
                columnWrapperStyle={{
                    flex: 1,
                    paddingVertical: 0,
                }}
                data={dataSource}
                renderItem={({ item }) => (
                    <Card containerStyle={styles.cardStyle1}>
                        <Text style={{ color: 'white' }}>{item.item}</Text>
                    </Card>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index}
            /> */}
            <SectionList
                sections={dataSource}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                    <Card containerStyle={styles.cardStyle1}>
                        <Text style={{ color: 'white' }}>{item}</Text>
                    </Card>
                )} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cardStyle1: {
        flex: 1,
        width: '30%',
        height: '20%',
        backgroundColor: 'black',
        borderRadius: 15,
        margin: 0,
        paddingVertical: '8%'
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'plum',
        width: '90%',
        borderRadius: 15
    },
})