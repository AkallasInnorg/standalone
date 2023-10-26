import React, { useState } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TextCarouselClass ({period, leftFunction, rightFunction}){
        return(
            <Card
                wrapperStyle={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    alignItems: 'center'}}
                containerStyle={{ borderRadius: 20, height: 57, width: 280 }}>
                <Ionicons name="chevron-back-outline" size={20}
                    onPress={leftFunction}/>
                <Text style={{
                    fontSize: 20, verticalAlign: 'middle'}}>
                    {period}</Text>
                <Ionicons name="chevron-forward-outline" size={20} 
                onPress={rightFunction}/>
            </Card>)}

