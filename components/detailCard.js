import React from "react";
import { Card } from "react-native-elements";
import { View, Text } from "react-native";

export default function DetailsCard({details}) {
        // const tempo_trascorso = (
        //     details['planned_release']-details['dev_start'])
    return (
        <Card containerStyle={{
            flexDirection: 'column',
            borderRadius: 15,
            height: '30%',
            width: '25%'
        }}>
            <View
                style={{ alignItems: 'center', marginBottom: '10%' }}
            ><Text>DESCRIPTION - ID</Text></View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'column', flex: 0.8, width: '50%' }}>
                    <Text>TEMPO STIMATO:  </Text>
                    <Text>TEMPO TRASCORSO:</Text>
                    <Text>STATUS:         </Text>
                    <Text>NOTE:           </Text>
                    <Text>TICKET:         </Text>
                    <Text>RESOURCES:      </Text>
                    <Text>CR:             </Text>
                </View>
                { !details ?  
                <View style={{
                    flexDirection: 'column',
                    alignItems: 'center', flex: 1}}>
                    <Text>5 GG</Text>
                    <Text>2 GG</Text>
                    <Text>Test Interni</Text>
                    <Text>+re-work per gestione scarico</Text>
                    <Text>1234567</Text>
                    <Text>Davide Ferriero</Text>
                    <Text>D33K284637</Text>
                </View> :  
                <View style={{
                    flexDirection: 'column',
                    alignItems: 'center', flex: 1}}>
                    <Text>{(details['planned_release']-details['dev_start'])}</Text>
                    <Text>{(details['planned_release']-details['dev_start'])}</Text>
                    <Text>{details['status']}</Text>
                    <Text>{details['notes']}</Text>
                    <Text>{details['ticket']}</Text>
                    <Text>{details['text']}</Text> //momentaneo
                    <Text>{details['commission']}</Text> //momentaneo
                </View> }
            </View>
        </Card>
    )
}