import { Text, View, TextInput, Image, StyleSheet, Button} from "react-native";

export default function SplashScreen ({navigation}) {
    return (
        <View style={styles.container}>
            <Text>SplashScreen</Text>
            <Button title="Click here" onPress={() => navigation.navigate("Login")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
})