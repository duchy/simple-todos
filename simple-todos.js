// simple-todos.js

//if (Meteor.isClient) {
//  // This code only runs on the client
//  Template.body.helpers({
//    tasks: [
//      { text: "This is task 1" },
//      { text: "This is task 2" },
//      { text: "This is task 3" }
//    ]
//  });
//}

Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  // Inside the if (Meteor.isClient) block, right after Template.body.helpers:
  Template.body.events({
    "submit .new-task": function (event) {
      // This function is called when the new task form is submitted
  
      var text = event.target.text.value;

      if (text == null || text == '')
        return false;
  
      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });
  
      // Clear form
      event.target.text.value = "";
  
      // Prevent default form submit
      return false;
    }
  });
}
