import React, {useState} from 'react';
import {Overlay, Input, Button} from 'react-native-elements';
import {taskSeed} from '../database';

const TaskSeed = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [numberOfTasks, setNewTaskName] = useState('');

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{width: '90%'}}
        onBackdropPress={() => setOverlayVisible(false)}>
        <>
          <Input
            placeholder="Number of tasks"
            value={numberOfTasks}
            onChangeText={(text) => {
              setNewTaskName(text.replace(/[^0-9]/g, ''));
            }}
            keyboardType="numeric"
            autoFocus={true}
          />
          <Button
            title="Create"
            onPress={() => {
              setOverlayVisible(false);
              taskSeed(Number(numberOfTasks));
            }}
          />
        </>
      </Overlay>
      <Button
        type="outline"
        title="Seed"
        onPress={() => {
          setOverlayVisible(true);
        }}
      />
    </>
  );
};

export default TaskSeed;
