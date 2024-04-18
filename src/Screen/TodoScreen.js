import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Alert, StyleSheet } from 'react-native';

const TodoScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim() === '' || taskDescription.trim() === '') {
      Alert.alert('Error', 'Please fill in both task title and description');
      return;
    }

    const newTask = { id: tasks.length + 1, title: taskTitle, description: taskDescription, completed: false };
    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setTaskDescription('');
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={text => setTaskTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        value={taskDescription}
        onChangeText={text => setTaskDescription(text)}
      />
      <Pressable
        style={styles.addButton}
        onPress={handleAddTask}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={[styles.taskTitle, item.completed && styles.completedTask]}>
              {item.title}
            </Text>
            <View style={styles.taskActions}>
              <Pressable
                style={[styles.actionButton, item.completed ? styles.undoButton : styles.completeButton]}
                onPress={() => handleCompleteTask(item.id)}
              >
                <Text style={styles.buttonText}>
                  {item.completed ? 'Done' : 'Complete'}
                </Text>
              </Pressable>
              <Pressable
                style={styles.actionButton}
                onPress={() => handleDeleteTask(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  taskTitle: {
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  taskActions: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: 'red',
    padding: 5,
    marginLeft: 5,
  },
  completeButton: {
    backgroundColor: 'green',
  },
  undoButton: {
    backgroundColor: 'orange',
  },
});

export default TodoScreen;
