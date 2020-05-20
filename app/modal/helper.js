const Task = require("./taskModal").createTask;
const Group = require("./groupModal").createGroup;

var counter = 1;

function createGroup() {
    let name_g = "Group" + counter;
    let group = new Group(counter, name_g);

    for (let i = 0; i < 10; i++) {
        group.addTask(createTask());
    }

    return group;
}

function createTask() {
    let id_t = Date.now();
    let name_t = "Task" + id_t;
    return new Task(id_t, name_t);
}



function createHelper() {
    this.list_Group = [
        createGroup(),
        createGroup()
    ];

    this.getListGroup = () => {
        return list_Group;
    }
}


function GetListGroup() {
    
}

function CreateGroup(name) {
    
}

function GetGroup(id) {
    
}

function UpdateGroup(id,name) {
    
}

function DeleteGroup(id) {
    
}

function  GetListTask() {
    
}



exports.createHelper = createHelper;