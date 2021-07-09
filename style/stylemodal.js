import { StyleSheet, Dimensions } from "react-native";

var width = Dimensions.get('window').width;

const stylemodal = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        backgroundColor: '#B12B44',
        color: '#FFF',
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    botoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    botao: {
        margin: 20,
        marginRight: 30,
        color: '#B12B44'
    },
    date: {
        fontSize: 20,
        marginLeft: 15
    }
});

export default stylemodal;