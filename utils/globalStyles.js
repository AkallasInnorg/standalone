import { useTheme } from "@react-navigation/native";
import { StyleSheet, useWindowDimensions } from "react-native";



export default function CustomStyles(){
    const {height, width} = useWindowDimensions();
    const colors = useTheme().colors;
    return StyleSheet.create({
        prova: {
            backgroundColor: colors.background,
            flex: 1
        },
        provaText:{
            color: colors.text
        },
        containerHome: {
            // flex: 1,
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
    })
}

// export default StyleSheet.create({
    // prova: {
    //     backgroundColor: colors.background
    // }
// })