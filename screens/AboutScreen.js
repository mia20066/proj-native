import { ScrollView, Text } from 'react-native';
import { Avatar, Card, ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';
import * as Animatable from 'react-native-animatable';

function Mission() {
    return (
        <Card>
            <Card.Title>About Us</Card.Title>
            <Card.Divider />
            <Text style={{ margin: 10 }}>
          As the market in USA lacks for orgnic products ,we as Qattoum family decided to start a business of making homemade organic Lebanese products wholesale and lebanese food for weddings and events.
            </Text>
        </Card>
    );
}

const AboutScreen = () => {
    const products = useSelector((state) => state.products);

    if (products.isLoading) {
        return (
            <ScrollView>
                <Mission />
                <Card>
                    <Card.Title>Lebanese Handmade Organic Products</Card.Title>
                    <Card.Divider />
                    <Loading />
                </Card>
            </ScrollView>
        );
    }
    //delay={1000} it will wait one second after the component is mounted to begin the animation
    if (products.errMess) {
        return (
            <ScrollView>
                <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
                >
                <Mission />
                <Card>
                    <Card.Title>Lebanese Handmade Organic Products</Card.Title>
                    <Card.Divider />
                    <Text>{products.errMess}</Text>
                </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
    return (
        <ScrollView>
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
                >
            <Mission />
            <Card>
                <Card.Title>Lebanese Handmade Organic Products</Card.Title>
                <Card.Divider />
                {products.productsArray.map((product) => (
                    <ListItem key={product.id}>
                        <Avatar
                            rounded
                            source={{ uri: baseUrl + product.image }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{product.name}</ListItem.Title>
                            <ListItem.Subtitle>
                                {product.description}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </Card>
            </Animatable.View>
        </ScrollView>
    );
};

export default AboutScreen;