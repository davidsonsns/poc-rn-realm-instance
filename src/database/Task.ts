import {ObjectId} from 'bson';

import {getRealmApp} from '.';

export enum STATUS {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
}

class Task {
  _id!: ObjectId;
  name!: string;
  status!: STATUS;
  createdAt!: Date;

  constructor({
    name,
    status = STATUS.OPEN,
    _id = new ObjectId(),
  }: {
    name: string;
    status?: STATUS;
    _id?: ObjectId;
  }) {
    this._id = _id;
    this.name = name;
    this.status = status;
  }

  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      status: 'string',
      // createdAt: 'date',
    },
  };

  static deleteAll() {
    const realm = getRealmApp();
    realm.write(() => {
      realm.deleteAll();
    });
  }
}

export default Task;
