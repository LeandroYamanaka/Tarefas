import React, { Component } from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import styleModal from '../style/stylemodal.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const initialState = { desc: '', date: new Date(), showDatePicker: false, prior: '' }

export default class AddTask extends Component {

    state = {
        ...initialState
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date,
            prior: this.state.prior
        }
        this.props.onSave && this.props.onSave(newTask)
        this.setState({ ...initialState })
    }

    getDatePicker = () => {
        let datePicker = (
            <DateTimePicker mode="date" value={this.state.date}
                onChange={(_, date) => {
                    date = date ? date : new Date()
                    this.setState({ date, showDatePicker: false })
                }}
            />
        )

        const dateString = moment(this.state.date).format('ddd, DD, MMMM - YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={styleModal.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
    }

    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styleModal.background}>

                    </View>
                </TouchableWithoutFeedback>
                <View style={styleModal.container}>
                    <Text style={styleModal.header}>Nova Tarefa</Text>
                    <TextInput style={styleModal.input} placeholder='Informe a Tarefa' value={this.state.desc} onChangeText={desc => this.setState({ desc })}></TextInput>
                    {this.getDatePicker()}
                    <TextInput style={styleModal.input} placeholder='Informe a prioridade' value={this.state.prior} onChangeText={prior => this.setState({ prior })}></TextInput>
                    <View style={styleModal.botoes}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styleModal.botao}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styleModal.botao}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styleModal.background}>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}