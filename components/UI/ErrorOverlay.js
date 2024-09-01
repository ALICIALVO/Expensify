import { View,Text,StyleSheet } from 'react-native';
import Button from './Button';
import Colors from '../../constants/colors';



export function ErrorOverlay({msg, onConfirm}){
return (
    <View style={styles.container}>
    <Text style={[ styles.text,styles.title]}>An error occurred!</Text>
    <Text style={styles.text}>{msg}</Text>
    <Button onPress={onConfirm}>Okay</Button>
</View>
)
}

export default ErrorOverlay;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: Colors.primary800,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',

    }
});