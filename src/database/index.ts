import Realm from 'realm';
import schemas from './schemas';
import Task from './Task';

export const schemaVersion = 0;
let app: Realm;
const appConfig: Realm.Configuration = {
  schemaVersion,
  schema: schemas,
  migration: (oldRealm, newRealm) => {
    console.time('migration');
    if (oldRealm.schemaVersion <= 1) {
      const oldObjects = oldRealm.objects<Task>('Task');
      const newObjects = newRealm.objects<Task>('Task');

      const createdAt = new Date();
      // loop through all objects and set the name property in the new schema
      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].createdAt = createdAt;
      }
    }
    console.timeEnd('migration');
  },
};

// Returns the shared instance of the Realm app.
export function getRealmApp() {
  if (app === undefined) {
    app = new Realm(appConfig);
  }

  return app;
}

export async function startRealmAsync() {
  const realm = await Realm.open(appConfig);
  app = realm;
  return realm;
}

export const taskSeed = (numberOfTasks: number) => {
  const realm = getRealmApp();

  realm.write(() => {
    [...new Array(numberOfTasks)].forEach((_, i) => {
      realm.create('Task', new Task({name: `New Task from Seed ${i}`}));
    });
  });
};
