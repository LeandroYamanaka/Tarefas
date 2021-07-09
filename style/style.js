import { StyleSheet, Dimensions } from "react-native";

var width = Dimensions.get('window').width;

const style = StyleSheet.create({

    container: {
        flex: 1
    },

    background: {
        flex: 2
    },

    taskList: {
        flex: 8
    },

    title: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10
    },

    titleText: {
        fontSize: 30
    },

    addBotao: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#B12B44',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default style;