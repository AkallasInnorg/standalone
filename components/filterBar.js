import { useState } from "react";
import { Overlay, Card, ListItem } from "react-native-elements";
import { View, Animated, ScrollView } from "react-native";
import { SearchBar } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from 'react-native-select-dropdown';
import RNPickerSelect from 'react-native-picker-select';

import globalStyles from "../utils/globalStyles";

export default function FilterBar({ animatedHeight, toggle }) {
    const gStyle = globalStyles();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);
    const [open7, setOpen7] = useState(false);
    const [open8, setOpen8] = useState(false);
    const [open9, setOpen9] = useState(false);
    const [open10, setOpen10] = useState(false);
    const [open11, setOpen11] = useState(false);
    const [open12, setOpen12] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Banana1', value: 'banana' },
        { label: 'Banana2', value: 'banana' },
        { label: 'Banana3', value: 'banana' },
        { label: 'Banana4', value: 'banana' },
    ]);
    const [visible, setVisible] = useState(false);
    function toggleOver() {
        setVisible(!visible);
    }

    // var drop = (plHolder, opener, setOpener, width) => {
    //     return <View
    //         style={{ width: width }}
    //     ><DropDownPicker
    //             zIndex={3000}
    //             zIndexInverse={3000}
    //             style={{ borderRadius: 20 }}
    //             placeholderStyle={{ borderRadius: 20 }}
    //             searchContainerStyle={{ borderRadius: 20 }}
    //             dropDownContainerStyle={{ borderRadius: 20 }}
    //             containerStyle={{ borderRadius: 20 }}
    //             theme="DARK"
    //             placeholder={plHolder}
    //             autoScroll={true}
    //             open={opener}
    //             value={value}
    //             items={items}
    //             setOpen={setOpener}
    //             setValue={setValue}
    //             setItems={setItems}
    //         /></View>
    // }

    var drop = (plHolder, width) => {
        return <SelectDropdown
        defaultButtonText={plHolder}
        dropdownStyle={{
            color: 'grey',
            backgroundColor: 'grey',
            borderRadius: 15
        }}
        rowStyle={{ color: 'grey', backgroundColor: 'grey' }}
        buttonStyle={{
            color: 'grey',
            backgroundColor: 'rgb(41, 45, 62)',
            borderRadius: 15,
            width: width,
            flexWrap: 'wrap'
        }}
        searchPlaceHolder="ID"
        searchPlaceHolderColor='plum'
        searchInputStyle={{ color: 'plum', backgroundColor: 'plum' }}
    />}

    return (
        <Animated.View style={[gStyle.filterBar,
        { height: animatedHeight }]}>
            <View style={{
                flexDirection: "column", borderRadius: 20, backgroundColor: 'plum',
                width: '100%'
            }}>
                <View style={{
                    flexDirection: "row", zIndex: 2000, zIndexInverse: 2000, justifyContent: "space-around"
                }}>
                    {/* {drop('ID', open, setOpen, '14%')} */}
                    {/* <SelectDropdown
                        defaultButtonText="ID"
                        dropdownStyle={{
                            color: 'grey',
                            backgroundColor: 'grey',
                            borderRadius: 15
                        }}
                        rowStyle={{ color: 'grey', backgroundColor: 'grey' }}
                        buttonStyle={{
                            color: 'grey',
                            backgroundColor: 'rgb(41, 45, 62)',
                            borderRadius: 15,
                            width: '10%',
                            flexWrap: 'wrap'
                        }}
                        searchPlaceHolder="ID"
                        searchPlaceHolderColor='plum'
                        searchInputStyle={{ color: 'plum', backgroundColor: 'plum' }}
                    /> */}
                    {/* {drop('Tag', open1, setOpen1, '14%')}
                    {drop('Stato', open2, setOpen2, '14%')}
                    {drop('Cliente', open3, setOpen3, '14%')}
                    {drop('Descrizione', open4, setOpen4, '14%')}
                    {drop('Tipo', open5, setOpen5, '14%')}
                    {drop('Ticket', open6, setOpen6, '14%')} */}
                    {drop('ID', '14%')}
                    {drop('Tag', '14%')}
                    {drop('Stato', '14%')}
                    {drop('Cliente', '14%')}
                    {drop('Descrizione', '14%')}
                    {drop('Tipo', '14%')}
                    {drop('Ticket', '14%')}
                </View>
                <View style={{
                    flexDirection: "row", zIndex: 1000, zIndexInverse: 1000, top: '40%', justifyContent: "space-around"
                }}>
                    {/* {drop('Commessa', open7, setOpen7, '16.2%')}
                    {drop('Commessa mancante', open8, setOpen8, '16.2%')}
                    {drop('Presona', open9, setOpen9, '16.2%')}
                    {drop('Intervallo data richiesta', open10, setOpen10, '16.2%')}
                    {drop('Intervallo data rilascio', open11, setOpen11, '16.2%')}
                    {drop('Modulo', open12, setOpen12, '16.2%')} */}
                    {drop('Commessa', '16.2%')}
                    {drop('Commessa mancante', '16.2%')}
                    {drop('Presona', '16.2%')}
                    {drop('Intervallo data richiesta', '16.2%')}
                    {drop('Intervallo data rilascio', '16.2%')}
                    {drop('Modulo', '16.2%')}
                </View>
            </View>
        </Animated.View>
    )
}