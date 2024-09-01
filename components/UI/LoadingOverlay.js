import {View, StyleSheet,ActivityIndicator } from "react-native";
import Colors from "../../constants/colors";


export function LoadingOverlay(){
return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#b691f1" />
    </View>
)
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: Colors.primary800,
    }
});