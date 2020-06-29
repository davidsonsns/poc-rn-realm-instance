import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {schemaVersion} from './database';
import Task, {STATUS} from './database/Task';

interface TasksContext {
  createTask: (newTaskName: string) => void;
  deleteTask: (task: Task) => void;
  setTaskStatus: (task: Task, status: STATUS) => void;
  tasks: Task[];
}

const TasksContext = React.createContext<TasksContext | null>(null);

const TasksProvider: React.FC = ({children}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const realmRef = useRef<Realm | null>();

  useEffect(() => {
    const config: Realm.Configuration = {
      schema: [Task.schema],
      schemaVersion,
    };

    let canceled = false;

    Realm.open(config)
      .then((openedRealm) => {
        // If this request has been canceled, we should close the realm.
        if (canceled) {
          openedRealm.close();
          return;
        }

        // Update the realmRef so we can use this opened realm for writing.
        realmRef.current = openedRealm;
        const syncTasks = openedRealm.objects<Task>('Task');

        openedRealm.addListener('change', () => {
          setTasks([...syncTasks]);
        });

        // Set the tasks state variable and re-render.
        setTasks([...syncTasks]);
      })
      .catch((error) => console.warn('Failed to open realm:', error));

    // Return the cleanup function to be called when the component is unmounted
    // or the next time the effect runs.
    return () => {
      // Update the canceled flag shared between both this callback and the
      // realm open success callback above in case this runs first.
      canceled = true;

      // If there is an open realm, we must close it.
      const realm = realmRef.current;
      if (realm != null) {
        realm.removeAllListeners();
        realm.close();
        realmRef.current = null;
      }
    };
  }, []); // Declare dependencies list in the second parameter to useEffect().

  const createTask = (newTaskName: string) => {
    const realm = realmRef.current;
    realm?.write(() => {
      realm.create('Task', new Task({name: newTaskName || 'New Task'}));
    });
  };

  const setTaskStatus = (task: Task, status: STATUS) => {
    if (![STATUS.OPEN, STATUS.IN_PROGRESS, STATUS.COMPLETE].includes(status)) {
      throw new Error(`Invalid Status ${status}`);
    }

    const realm = realmRef.current;

    realm?.write(() => {
      task.status = status;
    });
  };

  // Define the function for deleting a task.
  const deleteTask = (task: Task) => {
    const realm = realmRef.current;

    realm?.write(() => {
      realm.delete(task);
    });
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <TasksContext.Provider
      value={{
        createTask,
        deleteTask,
        setTaskStatus,
        tasks,
      }}>
      {children}
    </TasksContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useTasks = () => {
  const task = useContext(TasksContext);
  if (task == null) {
    throw new Error('useTasks() called outside of a TasksProvider?');
  }

  return task;
};

export {TasksProvider, useTasks};
