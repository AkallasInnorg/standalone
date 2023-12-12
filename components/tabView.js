import * as React from 'react';
import { Card } from 'react-native-paper';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import MonthGantt from './monthGantt/customGantt';

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'grey' }}>
        <Text>Tab One</Text>
    </View>
);
const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'darkgrey' }} >
        <Text>Tab Two</Text>
    </View>
);

const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'darkgrey' }} >
        <Text>Tab Three</Text>
    </View>
);

export default function TabViewExample({}) {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    // const [routes] = React.useState([
    //     { key: 'first', title: 'First' },
    //     { key: 'second', title: 'Second' },
    //     { key: 'third', title: 'Third' }
    // ]);

    const routes = [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' }
    ];

    const renderScenex = ()=>{
        switch(routes[index].key){
            case 'first':
                return <MonthGantt />;
            case 'second':
                return SecondRoute;
            case 'third':
                return ThirdRoute;
        }
    }

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'white'}
            inactiveColor={'black'}
            style={{ backgroundColor: 'plum', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
        />
    );

    return (
        <Card contentStyle={{ height: layout.height * 0.45, backgroundColor: 'black', borderRadius: 15 }} style={{ padding: 0 }}>
            <TabView
                style={{ height: layout.height / 4, borderRadius: 15 }}
                sceneContainerStyle={{ height: layout.height / 4 }}
                pagerStyle={{ width: layout.width / 2 }}
                navigationState={{ index, routes }}
                renderScene={renderScenex}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width / 2 }}
            /></Card>
    );
}