import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";



export default function CustomStyles(){
    const colors = useTheme().colors;
    return StyleSheet.create({
        prova: {
            backgroundColor: colors.background
        },
        provaText:{
            color: colors.text
        }
    })
}

// export default StyleSheet.create({
    // prova: {
    //     backgroundColor: colors.background
    // }
// })