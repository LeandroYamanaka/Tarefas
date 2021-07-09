import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'moment/locale/pt-br';
import moment from 'moment';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default props => {

    const doneStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}
    const late = props.id < moment() ?
        { color: 'red' } : {}

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formatedDate = moment(date).locale('pt-br').format('ddd, DD - MMM')

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styleTask.swipeRight} onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name='trash' size={30} color='#FFF' />
            </TouchableOpacity>
        )
    }

    return (
        <Swipeable renderRightActions={getRightContent}>
            <View style={styleTask.container}>
                <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
                    <View style={styleTask.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styleTask.desc, doneStyle, late]}>{props.desc}</Text>
                    <Text style={styleTask.date}>{formatedDate}</Text>
                    <Text style={styleTask.date}>{props.prior}</Text>
                </View>
            </View>
        </Swipeable>

    )

}

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styleTask.concluido}>
                <Icon name='check' size={20} color="#FFF"></Icon>
            </View>
        )
    } else {
        return (
            <View style={styleTask.pendente}>

            </View>
        )
    }
}



const styleTask = StyleSheet.create({

    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10

    },

    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    pendente: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },

    concluido: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },

    desc: {
        color: '#222',
        fontSize: 15
    },

    date: {
        color: '#555',
        fontSize: 13
    },

    swipeRight: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    }

});
