import { ScrollView, Text } from "react-native";
import { Card } from "react-native-elements";
import * as Animatable from 'react-native-animatable';


const ContactScreen = () => {
    return (
        <ScrollView>
             <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
                >
            <Card wrapperStyle={{ margin: 20 }}>
                <Card.Title>
                    Contact Information
                </Card.Title>
                <Card.Divider />
                <Text>Lebanese Heaven Of Food</Text>
                <Text>6787 Peter Farm, christiansted</Text>
                <Text style={{ marginBottom: 10 }}> U.S.V.I</Text>
                <Text>Phone: 1-208-666-1789</Text>
                <Text>Email: Lebaneseheaven@res.co</Text>

            </Card>
            </Animatable.View>
        </ScrollView>
    )
}
export default ContactScreen;