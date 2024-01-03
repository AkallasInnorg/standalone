import { useTheme } from "@react-navigation/native";
import { StyleSheet, useWindowDimensions } from "react-native";



export default function CustomStyles() {
    const { height, width } = useWindowDimensions();
    const colors = useTheme().colors;
    return StyleSheet.create({
        myCalStyle: {
            height: height * 0.46,
            width: width * 0.33,
            borderRadius: 20,
            marginRight: '4px',
            marginTop: '7px',
            marginLeft: '11px'
        },
        prova: {
            backgroundColor: colors.background,
            flex: 1
        },
        provaText: {
            color: colors.text
        },
        containerHome: {
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            height: height
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'plum',
            width: width / 1.5,
            borderRadius: 10
        },
        imageThumbnail: {
            justifyContent: 'center',
            alignItems: 'center',
            height: height / 3,
        },
        daysText: {
            flex: 1,
            textAlign: 'center',
            backgroundColor: 'transparent',
            // color: colIndex == 6 ? '#a00' : '#000',
            fontWeight: 'bold'
        },
        containerAgenda: {
            flex: 1,
            width: width / 2,
            height: height / 3
        },
        itemAgenda: {
            flex: 1,
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            marginTop: 17
        },
        filterBar: {
            backgroundColor: colors.border,
            borderRadius: 20, 
            height: '20px', 
            width: '98%',  
            marginBottom: '0px',
            paddingBottom: '0px',
            borderBottomWidth: '0px',
            flexDirection: 'row'
        }
    })
}