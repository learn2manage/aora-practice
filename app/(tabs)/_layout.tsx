import { View, Text, Image } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import { icons } from '../../constants';

const TabIcon = ({
    icon,
    color,
    name,
    focused,
}: {
    icon: any;
    color: string;
    name: string;
    focused: boolean;
}) => {
    return (
        <View>
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
        </View>
    );
};

const TabsLayout = () => {
    return (
        <>
            <Tabs>
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
            </Tabs>
        </>
    );
};

export default TabsLayout;
