import React from 'react';
import {View, ScrollView, Text} from 'react-native';

import {useTasks} from './TasksProvider';
import TaskItem from './components/TaskItem';
import AddTaskView from './components/AddTaskView';
import TaskSeed from './components/TaskSeed';
import DeleteAllButton from './components/DeleteAllButton';

const TasksView: React.FC = () => {
  const {tasks} = useTasks();

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingVertical: 25,
        }}>
        <AddTaskView />
        <DeleteAllButton />
        <TaskSeed />
      </View>

      <Text>{tasks?.length}</Text>

      {/* <ScrollView>
        {tasks?.map((task) => (
          <TaskItem key={`${task._id}`} task={task} />
        ))}
      </ScrollView> */}
    </>
  );
};

export default TasksView;
