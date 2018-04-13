import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { isPrivate: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const user = Meteor.users.findOne(this.userId);
    const username = user.username || user.profile.name;

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username,
      isPrivate: false,
    });
  },

  'tasks.remove'(_id) {
    check(_id, String);

    const task = Tasks.findOne(_id);
    if (task.isPrivate && task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(_id);
  },

  'tasks.setChecked'(_id, checked) {
    check(_id, String);
    check(checked, Boolean);

    const task = Tasks.findOne(_id);
    if (task.isPrivate && task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(_id, { $set: { checked } });
  },

  'tasks.setPrivate'(_id, isPrivate) {
    check(_id, String);
    check(isPrivate, Boolean);
    Tasks.update(_id, { $set: { isPrivate } });
  },
});

export default Tasks;
