import { FlatList, Text, View } from 'react-native';
import { Tile } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';
import * as Animatable from 'react-native-animatable';

const DirectoryScreen = ({ navigation }) => {
    const foods = useSelector((state) => state.foods);

    if (foods.isLoading) {
        return <Loading />;
    }
    if (foods.errMess) {
        return (
            <View>
                <Text>{foods.errMess}</Text>
            </View>
        );
    }

    const renderDirectoryItem = ({ item: food }) => {
        return (
            <Animatable.View
                animation='fadeInRightBig'
                duration={2000}
             
                >
            <Tile
                title={food.name}
                caption={food.description}
                featured
                onPress={() =>
                    navigation.navigate('FoodInfo', { food })
                }
                imageSrc={{ uri: baseUrl + food.image }}
            />
            </Animatable.View>
        );
    };
    return (
        <FlatList
            data={foods.foodsArray}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default DirectoryScreen;