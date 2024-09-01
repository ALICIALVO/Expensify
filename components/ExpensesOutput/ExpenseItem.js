import { View,Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

//utils:
import { getFormatedDate } from "../../utils/date";

export function ExpenseItem({ id, description, amount, date}) {
    const navigation = useNavigation();

    function onExpensePressHandler(){
        navigation.navigate('ManageExpense', {
          expenseId: id,
          expenseData: {description, amount, date: date.toISOString()}
        })
        
    }
  return (
    <Pressable onPress={onExpensePressHandler} style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[style=styles.textBase, styles.descriptionText]}>{description}</Text>
          <Text style={styles.textBase}>{getFormatedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
        <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;


const styles = StyleSheet.create({
    expenseItem: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.primary700,
        borderRadius: 6,
        padding: 12,
        marginVertical: 8,
        elevation: 5,
        shadowColor: Colors.primary400,
        shadowOffset: {width: 4, height: 2},
        shadowOpacity: 0.7,
        shadowRadius: 5,
        // width: '90%',
        opacity: 0.75,
        
    },
    pressed: {
        opacity: 0.75,
    },
    textBase: {
        color: Colors.primary350,
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
        
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
    },
     amountText: {
        color: Colors.primary800,
        fontWeight: 'bold',
     }
});