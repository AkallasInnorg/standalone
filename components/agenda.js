import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import CustomStyles from '../utils/globalStyles';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

export default function MyAgenda () {
    const gStyle = CustomStyles();
    const [items, setItems] = React.useState({});

    const loadItems = (day) => {

        setTimeout(() => {
            for (let i = -150; i < 185; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                if (!items[strTime]) {
                    items[strTime] = [];

                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(10, Math.floor(Math.random() * 150)),
                            day: strTime
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            setItems(newItems);
            console.log(newItems)
        }, 1000);
    }

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={gStyle.itemAgenda}>
                <Card>
                    <Card.Content>
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    }


    return (
        <View style={gStyle.containerAgenda}> 
            <Agenda
                showWeekNumbers={true}
                style={{borderRadius: 15}}
                theme={{calendarBackground: 'plum'}}
                items={items}
                loadItemsForMonth={loadItems}
                refreshControl={null}
                showClosingKnob={false}
                renderItem={renderItem}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
});
