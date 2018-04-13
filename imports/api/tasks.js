import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).profile.name,
    });
  },

  'tasks.remove'(_id) {
    check(_id, String);
    Tasks.remove(_id);
  },

  'tasks.setChecked'(_id, checked) {
    check(_id, String);
    check(checked, Boolean);
    Tasks.update(_id, { $set: { checked } });
  },
});

export default Tasks;
