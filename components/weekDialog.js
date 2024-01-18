import { Dialog } from 'react-native-paper';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Button } from 'react-native-elements';

export default function WeekAddTaskDialog({ data, data1, visible, method, method1, methodText, methodNote, mothodHours }) {
    return <>
        <Dialog visible={visible}
            onDismiss={method}
            style={styles.dialogStyle}>
            <Dialog.Title style={styles.titleStyle}>Add Task</Dialog.Title>
            <Dialog.Content style={styles.contentStyle}>
                <SafeAreaView style={styles.firstRow}>
                    <SafeAreaView style={{ flexDirection: 'column', width: '90%' }}>
                        <Text style={{ fontSize: '120%' }}>Attività:</Text>
                        <SelectDropdown
                            selectedRowStyle={{ justifyContent: 'flex-start', alignContent: 'flex-start', paddingHorizontal: 0, marginHorizontal: 0 }}
                            defaultButtonText='Select Task'
                            // buttonTextStyle={{ textAlign: 'justify', marginEnd: 0, flexWrap:'wrap' }}
                            // selectedRowTextStyle={{textAlign: 'left', marginLeft: 0}}
                            rowTextStyle={{ textAlign: 'justify' }}
                            // onSelect={(sel, idx) => { console.log(sel, idx) }}
                            onSelect={(sel) => { method1(sel) }}
                            data={data}
                            dropdownStyle={styles.firstDDStyle}
                            rowStyle={{ color: 'plum', backgroundColor: 'plum' }}
                            buttonStyle={styles.firstDbutton}
                            searchPlaceHolderColor='plum'
                            searchInputStyle={{ color: 'plum', backgroundColor: 'plum' }}
                        />
                    </SafeAreaView>
                </SafeAreaView>
                <SafeAreaView style={styles.secondRow}>
                    <SafeAreaView style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={{ fontSize: '120%' }}>Sub-Attività:</Text>
                        <SelectDropdown
                            defaultButtonText='Select sub-task'
                            data={data1}
                            dropdownStyle={styles.secondDDStyle}
                            rowStyle={{ color: 'plum', backgroundColor: 'plum' }}
                            buttonStyle={styles.secondDButton}
                            searchPlaceHolderColor='plum'
                            searchInputStyle={{ color: 'plum', backgroundColor: 'plum' }}
                        />
                    </SafeAreaView>
                    <SafeAreaView style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={{ fontSize: '120%' }}>Ore:</Text>
                        <View style={{ height: '70%' }}>
                            <TextInput
                                onChangeText={(text) => { mothodHours(text) }}
                                style={styles.hourText}
                                inputMode='numeric'
                                placeholder='0'
                                placeholderTextColor={'grey'} />
                        </View>
                    </SafeAreaView>
                </SafeAreaView>
                <SafeAreaView style={{ flexDirection: 'row', columnGap: '10%', height: '70%' }}>
                    <SafeAreaView style={styles.container}>
                        <Text style={{ fontSize: '120%' }}>Descrizione:</Text>
                        <View style={styles.containerView}>
                            <TextInput
                                onChangeText={(text) => { methodText(text) }}
                                style={styles.inputSimpleBorder}
                                placeholder="Enter Description"
                                placeholderTextColor={'grey'}
                                multiline={true}
                                numberOfLines={5}
                            />
                        </View>
                    </SafeAreaView>
                    <SafeAreaView style={styles.container}>
                        <Text style={{ fontSize: '120%' }}>Note interne:</Text>
                        <View style={styles.containerView}>
                            <TextInput
                                onChangeText={(text) => { methodNote(text) }}
                                style={styles.inputSimpleBorder}
                                placeholder="Enter Internal note"
                                placeholderTextColor={'grey'}
                                multiline={true}
                                numberOfLines={5}
                            />
                        </View>
                    </SafeAreaView>
                </SafeAreaView>
            </Dialog.Content>
            <Dialog.Actions style={{ alignItems: 'flex-end', flexDirection: 'row', columnGap: '2%' }}>
                <Button
                    containerStyle={{ bottom: '20%' }}
                    buttonStyle={{ backgroundColor: 'grey' }}
                    title='Annulla' onPress={method} />
                <Button
                    containerStyle={{ bottom: '20%' }}
                    title='Conferma' onPress={method} />
            </Dialog.Actions>
        </Dialog></>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        width: '45%',
        flexDirection: 'column',
        rowGap: '3%',
    },
    containerView: {
        height: '70%'
    },
    inputSimpleBorder: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'grey',
        padding: '2%',
        fontSize: 15,
        textAlignVertical: 'top',
        height: '60%'
    },
    dialogStyle: {
        width: '70%',
        alignSelf: 'center',
        height: '90%'
    },
    titleStyle: {
        fontSize: '250%',
        textAlign: 'center'
    },
    contentStyle: {
        flexDirection: 'column',
        rowGap: '25%',
        height: '80%',
        width: '100%'
    },
    firstRow: {
        flexDirection: 'row',
        columnGap: '10%',
        height: '20%',
        width: '40%',
        backgroundColor: 'black',
        flex: 1
    },
    firstDDStyle: {
        color: 'plum',
        backgroundColor: 'plum',
        borderRadius: 15
    },
    firstDbutton: {
        color: 'plum',
        backgroundColor: 'plum',
        borderRadius: 15,
        width: '182%',
        flexWrap: 'wrap'
    },
    secondRow: {
        flexDirection: 'row',
        columnGap: '10%',
        height: '40%',
        width: '80%',
        flex: 1
    },
    secondDDStyle: {
        color: 'plum',
        backgroundColor: 'plum',
        borderRadius: 15
    },
    secondDButton: {
        color: 'plum',
        backgroundColor: 'plum',
        borderRadius: 15,
        width: '100%',
        flexWrap: 'wrap',
    },
    hourText: {
        backgroundColor: 'plum',
        width: '60%',
        fontSize: 25,
        padding: '2.5%',
        borderRadius: 15
    }
});