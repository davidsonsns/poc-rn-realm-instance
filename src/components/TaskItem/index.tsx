import React, {useState} from 'react';
import {Text, ListItem} from 'react-native-elements';

import Task, {STATUS} from '../../database/Task';
import {useTasks} from '../../TasksProvider';
import {ActionSheet} from './ActionSheet';

const TaskItem: React.FC<{task: Task}> = ({task}) => {
  const {deleteTask, setTaskStatus} = useTasks();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const actions = [
    {
      title: 'Delete',
      action: () => {
        deleteTask(task);
      },
    },
  ];

  if (task.status !== STATUS.OPEN) {
    actions.push({
      title: 'Mark Open',
      action: () => {
        setTaskStatus(task, STATUS.OPEN);
      },
    });
  }
  if (task.status !== STATUS.IN_PROGRESS) {
    actions.push({
      title: 'Mark In Progress',
      action: () => {
        setTaskStatus(task, STATUS.IN_PROGRESS);
      },
    });
  }
  if (task.status !== STATUS.COMPLETE) {
    actions.push({
      title: 'Mark Complete',
      action: () => {
        setTaskStatus(task, STATUS.COMPLETE);
      },
    });
  }

  return (
    <>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => setActionSheetVisible(false)}
        actions={actions}
      />
      <ListItem
        key={task._id.toHexString()}
        onPress={() => {
          setActionSheetVisible(true);
        }}
        title={task.name}
        bottomDivider
        checkmark={
          task.status === STATUS.COMPLETE ? (
            <Text>&#10004; {/* checkmark */}</Text>
          ) : task.status === STATUS.IN_PROGRESS ? (
            <Text>In Progress</Text>
          ) : undefined
        }
      />
    </>
  );
};

export default TaskItem;
