import { useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import * as Animatable from 'react-native-animatable';
import {
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
    ViewToken,
} from 'react-native';

import { icons } from '../constants';
import { Models } from 'react-native-appwrite';

const zoomIn: Animatable.CustomAnimation = {
    0: {
        scaleX: 0.9,
    },
    1: {
        scaleX: 1,
    },
};

const zoomOut: Animatable.CustomAnimation = {
    0: {
        scaleX: 1,
    },
    1: {
        scaleX: 0.9,
    },
};

interface TrendingProps {
    posts: Models.Document[];
}

const TrendingItem = ({
    activeItem,
    item,
}: {
    activeItem: Models.Document;
    item: Models.Document;
}) => {
    const [play, setPlay] = useState(false);

    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
            duration={500}>
            {play ? (
                <Video
                    source={{ uri: item.video }}
                    className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if ('didJustFinish' in status && status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    className="relative flex justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}>
                    <ImageBackground
                        source={{
                            uri: item.thumbnail,
                        }}
                        className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
                        resizeMode="cover"
                    />

                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
};

const Trending = ({ posts }: TrendingProps) => {
    const [activeItem, setActiveItem] = useState(posts[0]);

    const viewableItemsChanged = ({
        viewableItems,
    }: {
        viewableItems: ViewToken<Models.Document>[];
    }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].item);
        }
    };

    return (
        <FlatList
            data={posts}
            horizontal
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
            contentOffset={{ x: 100, y: 0 }}
        />
    );
};

export default Trending;
