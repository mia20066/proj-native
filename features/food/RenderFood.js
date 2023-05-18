import { StyleSheet, Text, View, PanResponder, Alert,Modal } from "react-native";
import { Card, Icon } from "react-native-elements";
import { baseUrl } from "../../shared/baseUrl";
import * as Animatable from 'react-native-animatable';
import { useRef} from "react"; // in order to programmatically trigger  an animation on an animatable component we will need first to set a referance to it we will acomplish this by using react ref


// as a parameter for isLeftSwipe it will take an object and destructure from it a property named dx which is the distance of a gesture across x-axis 
//boolean result of the expression : dx <-200 that means we are going to recognize a gesture where there's a horizontal drag (sa7eb lbottom to the left)to the left that's smaller than, -100 is bigger than -200/if you drag from right to left a little bit for example -46 nothing will happen because dx should be -100 or more
const RenderFood = (props) => {
   
    const { food } = props;

    const view = useRef();

 const isRightSwipe = ({ dx }) => dx > 200;
    const isLeftSwipe = ({ dx }) => dx < -200;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true, //start
        onPanResponderGrant: () => {  //during: handler that is triggered when a gesture is first recognized and onstart should set pan responder returns true, so granting this view to repond to touch events
            view.current
                .rubberBand(1000) // rubberband(1000) it means it will have a duration of 1000 ms
                .then((endState) => console.log(endState.finished ? 'finished' : 'canceled'));// animatable method such as rubberband will return a promise , this promise will resolve into an object at the end of the animation, not necessary to console.log anything in this promise

        },
        onPanResponderEnd: (e, gestureState) => { //end
            console.log('pan responder end', gestureState);
            if (isLeftSwipe(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + food.name + 'to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Press')
                        },
                        {
                            text: 'OK',
                            onPress: () =>
                                props.isFavorite
                                    ? console.log('Already set as a favorite')
                                    : props.markFavorite()
                        }

                    ],
                    { cancelable: false }
                )
            }
            else if (isRightSwipe(gestureState)){
          props.onShowModal();

            }
        }

    })



    if (food) { // if not null
        //flex and center they vertically center the content
        return (
            <Animatable.View
                animation='fadeInDownBig'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers} // ...panresponder that means getting all the panresponder here, panhandler calling the API to handle
            >
                <Card containerStyle={styles.cardContainer}>
                    <Card.Image source={{ uri: baseUrl + food.image }}>
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text
                                style={styles.cardText}
                            >
                                {food.name}

                            </Text>

                        </View>

                    </Card.Image>
                    <Text style={{ margin: 20 }}>{food.description}</Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={props.isFavorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() =>
                                props.isFavorite
                                    ? console.log('Already set as Favorite')
                                    : props.markFavorite()

                            }
                        />
                        <Icon
                            name='pencil' type='font-awesome' color='#ff7f50' raised reverse onPress={() => props.onShowModal()}

                        />
                    </View>

                </Card>
            </Animatable.View>
        );
    }
    // in icon raised means will give the icon shadow effect/ reversed means it will reverse color scheme normally this would be a white background with a heart outline in red but the reverse option will make it red background with a heart outline in white
    //handling the condition if the food prop returns false, for that it will just return an empty view
    return <View />;
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 20
    },
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20

    },
    cardText: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
});

export default RenderFood;








