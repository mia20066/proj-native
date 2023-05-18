import { useDispatch, useSelector } from "react-redux";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import Loading from '../components/LoadingComponent';
import { baseUrl } from "../shared/baseUrl";
import { SwipeRow } from "react-native-swipe-list-view";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import * as Animatable from 'react-native-animatable';

//rightOpenValue={-100} it cause the the swipe to open from right and to open on a value equal to negative inetger of 100 pixels

const FavoritesScreen = ({ navigation }) => {
    const { foodsArray, isLoading, errMess } = useSelector(
(state) => state.foods
    );
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch(); 
//the first parameter in alert(...) is the alert title, then the other parameter is the content, the third parameter is a list of actions the first is cancel and the other ok, and a forth parameter which is optional which is cancelable=false which means it disable when you press out of the alert box the canceling behavior you either press cancel or ok to exit
    const renderFavoriteItem = ({ item: food }) => {
        return (
            <SwipeRow rightOpenValue={-100}>
                <View style={styles.deleteView}>
                    <TouchableOpacity 
                    style={styles.deleteTouchable}
                    onPress={() => Alert.alert('Delete Favorite?',
                    'Are you sure you wish to delete the favorite food ' + food.name + '?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log(food.name + 'Not Deleted'),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () => dispatch(toggleFavorite(food.id))
                        }
                    ],
                    { cancelable: false }

                
                    )}  
                        
                       
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity> 

                </View>
                <View>
            <ListItem 
            onPress={() =>
                navigation.navigate('Directory', {
                    screen: 'FoodInfo',
                    params: { food }
                })
            }
            >
                <Avatar rounded source={{ uri: baseUrl + food.image }} />
                <ListItem.Content>
                    <ListItem.Title>{food.name}</ListItem.Title>
                    <ListItem.Subtitle>{food.description}</ListItem.Subtitle>


                </ListItem.Content>

            </ListItem>
            </View>
            </SwipeRow>
        );
    };

    if(isLoading){
        return <Loading />
    }
    if (errMess) {
        return (
            <View>
                <Text>{errMess}</Text>
            </View>
        );
        
    }
    return (
        <Animatable.View
        animation='fadeInRightBig'
        duration={2000}
     
        >
        <FlatList data={foodsArray.filter((food)=> 
            favorites.includes(food.id)
        )}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}

         />
         </Animatable.View>
    );
};

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
       flex: 1 // to be suitable to the beside info
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
})

export default FavoritesScreen;