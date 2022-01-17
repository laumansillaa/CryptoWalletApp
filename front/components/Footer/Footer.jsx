import * as React from 'react';
import {
    Dimensions,
    StatusBar,
    Pressable,
    Animated,
} from 'react-native';

import { TabView, SceneMap } from 'react-native-tab-view';
import { NativeBaseProvider, Box, Icon, Center } from 'native-base';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import HomeIndex from '../Home/HomeIndex';
import HeaderCurrencies from '../HeaderCurrencies/HeaderCurrencies';
import Account from '../Account/Account';

const FirstRoute = () => <HomeIndex />;

const SecondRoute = () => <HeaderCurrencies />

const ThirdRoute = () => <Account />;

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
});

export default function Footer() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {
            key: 'first', title: 'Home', icon: <Icon
                as={MaterialCommunityIcons}
                name="home"
            />
        },
        {
            key: 'second', title: 'Currencies', icon: <Icon
                as={MaterialCommunityIcons}
                name='wallet'
            />
        },
        {
            key: 'third', title: 'Account', icon: <Icon
                as={MaterialCommunityIcons}
                name='account'
            />
        },
    ]);

    const renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
            <Box flexDirection="row">
                {props.navigationState.routes.map((route, i) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) =>
                            inputIndex === i ? 1 : 0.5
                        ),
                    });
                    const color = index === i ? '#1f2937' : '#a1a1aa';
                    const borderColor = index === i ? '#1f2937' : '#a1a1aa';

                    return (
                        <Box
                            borderBottomWidth="3"
                            borderColor={borderColor}
                            flex={1}
                            alignItems="center"
                            p="3">
                            <Pressable
                                onPress={() => {
                                    console.log(i);
                                    setIndex(i);
                                }}>
                                <Center>
                                    {route.icon}
                                   {/*  <Animated.Text style={{ color }}>{route.title}</Animated.Text> */}
                                </Center>
                            </Pressable>
                        </Box>
                    );
                })}
            </Box>
        );
    };

    return (
        <NativeBaseProvider>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                tabBarPosition='bottom'
                style={{ marginTop: StatusBar.currentHeight }}

            />
        </NativeBaseProvider>
    );
}