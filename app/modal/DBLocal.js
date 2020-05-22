const Task = require("./taskModal").Task;
const Group = require("./groupModal").Group;
const db = require("./DBFirebase");
//Property
var grDefault;
var lsGrdata=[];
var lsGrPreivew=[];
function showError(er){
    console.log("! Local: "+er);
}

function findGroup(grID){
    return lsGrdata.findIndex(e => e.getID()==grID);
}

exports.loadData= async (success) => {
    console.log("Loading Data");
    await db.getConfigDefault()
        .then( async grID => {
            grDefault = grID;
            await db.getListGroups().then(ls => lsGrdata = ls)
            lsGrPreivew = lsGrdata;
            let len = lsGrdata.length;
            for(let i =0;i<len;i++){
                await db.getTasksOf(lsGrdata[i].getID())
                    .then(ar => lsGrdata[i].setTasks(ar))
            }
            success();})
        .catch(er => showError(er));
}

exports.getDefault= () => lsGrdata[findGroup(grDefault)];

exports.changeDefault =(grID) => grDefault=grID

exports.addNewTask = (task) => {
    let pos = findGroup(grDefault);
    lsGrdata[pos].addTask(task);
}

exports.delTask = (taskID) => {

}

exports.changeStatus = (taskID) =>{

}

exports.updateTask = (task) =>{

}

exports.changeGroupOfTask = (grIDOld, grIDNew, taskID) =>{}

exports.getListGroups= () =>{
    return lsGrPreivew;
}

exports.addNewGroup = (gr) =>{
    lsGrPreivew.push(gr);
}

exports.renameGroup = (gr) =>{

}
exports.delGroup = (grID) =>{

}

exports.getTaskEdit = (task) =>{
    let pos = findGroup(grDefault);
    let g=  lsGrPreivew[pos];
    return ({
        task: task,
        gr : {
            id: g.getID(),
            name:g.getName()}
    })
}

