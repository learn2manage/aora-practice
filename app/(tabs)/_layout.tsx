import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import { icons } from '../../constants';

const TabIcon = ({
    icon,
    color,
    name,
    focused,
}: {
    icon: ImageSourcePropType;
    color: string;
    name: string;
    focused: boolean;
}) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text
                className={`${
                    focused ? 'font-psemibold' : 'font-pregular'
                } text-xs`}>
                {name}
            </Text>
        </View>
    );
};

const TabsLayout = () => {
    return (
        <>
            <Tabs screenOptions={{ tabBarShowLabel: false }}>
                {/* even without <Tabs.Screen /> tags, tabs still display based on files in the folder. */}
                <Tabs.Screen
                    name="home"
                    options={{
                        headerShown: false,

                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                name="home"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        headerShown: false,

                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.upload}
                                color={color}
                                name="create"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="bookmark"
                    options={{
                        headerShown: false,

                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.bookmark}
                                color={color}
                                name="bookmark"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        headerShown: false,

                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.profile}
                                color={color}
                                name="profile"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="test"
                    options={{
                        headerShown: false,

                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.eye}
                                color={color}
                                name="test"
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;
