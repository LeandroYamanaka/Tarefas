import React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'moment/locale/pt-br';
import Task from './components/Task.js';
import style from './style/style.js';
import imgHeader from './img/header1.jpg';
import moment from 'moment';
import AddTask from './components/AddTask.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  showAddTask: false,
  showDoneTasks: true,
  visibleTasks: [],
  tasks: []
}

export default class TaskList extends Component {

  state = {
    ...initialState
  }

  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('tasksState')
    const state = JSON.parse(stateString) || initialState
    this.setState(state)
  }

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
  }

  filterTasks = () => {
    let visibleTasks = null
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks]
    } else {
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
    }

    this.setState({ visibleTasks })
    AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
  }

  toggleTask = taskId => {
    const tasks = [...this.state.tasks]
    tasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date()
      }
    })

    this.setState({ tasks })
  }

  addTask = newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição não informada')
      return
    }
    const tasks = [...this.state.tasks]
    tasks.push({
      id: Math.random(),
      desc: newTask.desc,
      estimateAt: newTask.date,
      prior: newTask.prior,
      doneAt: null
    })
    this.setState({ tasks, showAddTask: false }, this.filterTasks)
  }

  deleteTask = id => {
    const tasks = this.state.tasks.filter(task => task.id != id)
    this.setState({ tasks }, this.filterTasks)
  }


  render() {

    const today = moment().locale('pt-br').format('ddd, DD - MMM')

    return (

      <View style={style.container}>
        <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({ showAddTask: false })} onSave={this.addTask} />
        <ImageBackground source={imgHeader} style={style.background}>
          <View style={style.title}>
            <Text style={style.titleText}>Hoje</Text>
            <Text style={style.titleText}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={style.taskList}>
          <FlatList data={this.state.tasks}
            keyExtractor={item => '${item.id}'}
            renderItem={({ item }) => <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />} />
        </View>
        <TouchableOpacity style={style.addBotao} onPress={() => this.setState({ showAddTask: true })} activeOpacity={0.7}>
          <Icon name='plus' size={20} color='black' />
        </TouchableOpacity>
      </View>

    )
  }
}


