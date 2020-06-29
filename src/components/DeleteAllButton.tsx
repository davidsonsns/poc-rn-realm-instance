import React from 'react';
import {Button} from 'react-native-elements';
import Task from '../database/Task';

const DeleteAllButton: React.FC = () => {
  return <Button type="outline" title="Delete" onPress={Task.deleteAll} />;
};

export default DeleteAllButton;
