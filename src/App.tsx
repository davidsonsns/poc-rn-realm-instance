import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StatusBar, ActivityIndicator} from 'react-native';

import TasksView from './TasksView';
import {TasksProvider} from './TasksProvider';
import {getRealmApp} from './database';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getRealmApp();
      setLoading(false);
    }, 0);
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <TasksProvider>
            <TasksView />
          </TasksProvider>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
