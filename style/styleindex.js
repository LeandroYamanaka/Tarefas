import { StyleSheet, Dimensions } from "react-native";

var width = Dimensions.get('window').width;

const styleindex = StyleSheet.create({

    container: {
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 7,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 3,
        }
    },

    task: {
        color: '#121212',
        fontSize: 20,
        paddingLeft: 8,
        paddingRight: 20
    }
})

export default styleindex;