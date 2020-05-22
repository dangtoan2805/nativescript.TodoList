const Task = require("./taskModal").Task;
const Group = require("./groupModal").Group;

const firebase = require("nativescript-plugin-firebase/app");

var grCollect = "groups";
var cfgCollect = "configs";
var lsTask="tasks";
var db;

function showFailded(er){ console.log(er);}

//Query diract to Firebase
//Reference firebase
function getGroupRef(grID){
    return db.collection(grCollect).doc(grID);
}

function getTaskRef(grID,taskID){
    return getGroupRef(grID).collection(lsTask).doc(taskID) 
}

function getConfigDefaultRef(){
    return db.collection(cfgCollect).doc("default");
}

function getConfigDefault(){
    return getConfigDefaultRef().get()
        .then( doc => {
            if(doc.exists)
                 return doc.data().groupDefault;
            else
                showFailded(`!!! ${doc.id} not exists !!! `);
        }).catch(er =>showFailded(er))
}

function getGroup(grID){
    return isGroupExists(grID)
        .then( async() =>{
            let gr = await getGroupRef(grID)
                        .get()
                        .then( doc => {
                            let gr = new Group(grID);
                            gr.setName(doc.data().name);
                            return gr;});
            return gr;})
        .catch(er => showFailded(er));    
}

// function getListTasks(grID){
//     return getGroupRef(grID).collection('tasks')
//         .get()
//         .then(querySnapShot => {
//             let ls=[];
//             querySnapShot.forEach(e => { 
//                 let t = new Task(e.id);
//                 t.setData(e.data());
//                 ls.push(t);
//             });
//             return ls;
//         }).catch(er =>showFailded(er));    
// }

function isGroupExists(grID){
    return getGroupRef(grID).get()
        .then( doc => {
            if (!doc) throw ("Group is NOT exists !!!") })
        .catch( er => showFailded(er));
}

function isTaskExists(grID,taskID){ //Check Task in DB
    return getTaskRef(grID,taskID)
                .get()
                .then(e => {
                    if(!e.exists) throw ("Task is NOT exists !!!")})
                .catch(er => showFailded(er));
}

function addTask(grID,task){ //Add new Task directly to DB
    getTaskRef(grID,task.getID())
        .set(task.getData())
        .then(() => console.log("Add Task success !"))
        .catch(er => showFailded(er));
}

function updateTask(grID, taskID, propertyChange ){
    getTaskRef(grID,taskID)
        .update(propertyChange)
        .then(()=> console.log("Update Task success !"))
        .catch(er => console.log(er))
}

function delTask(grID,taskID ){
    getTaskRef(grID,taskID)
        .delete()
        .then( () => console.log("Delete Task success !"))
        .catch( er => console.log(er))
}

/**
 * 
 */
//Exports method
function initDB(){
    firebase.initializeApp({persist: false})
    .then (() => {
        console.log("Init Firebase Success");
        db=firebase.firestore();
    })
    .catch(er => console.log("Init Firebase faild" + er));
}

// function loadDefault(){
//     return getConfig()
//             .then( grID => { return getGroup(grID)})
//             .then(async gr => { 
//                     let ar = await getListTasks(gr.getID());
//                     gr.setTasks(ar);
//                     return gr;})
//             .catch(er => showFailded(er));
// }

function newTask(grID,task){   
    isTaskExists(grID,task.getID())
        .then( () => addTask(grID,task) )
        .catch(er => showFailded(er));

}

function updateStatusTask(grID,taskID, sts ){
    let change = { status: sts };
    isTaskExists(grID,taskID)
        .then( () =>  updateTask(grID,taskID,change) )
        .catch(er => showFailded(er));
}

function deleteTask(grID, taskID){
    isTaskExists(grID,taskID)
        .then( () => delTask(grID,taskID) )
        .catch( er => showFailded(er));
}

function getListGroups(){
    return db.collection(grCollect).get()
        .then(async querySnapShot => {
            var ls=[];
            querySnapShot.forEach(async e=>{
                let g =new Group(e.id);
                g.setName(e.data().name);
                ls.push(g);
            });
            return ls;
        })
        .catch (er => showFailded(er))
}

function newGroup(gr){
    getGroupRef(gr.getID()).set({name:gr.getName()})
        .then( () => {
            getTaskRef(gr.getID(),"id").set({});
            console.log("Add Group success !!!");})
        .catch( er => showFailded(er));
}

function renameGroup(grID,nameNew){
    getGroupRef(grID).set({name: nameNew})
        .then( () => Console.log("Update Group success !!!"))
        .catch( er => showFailded(er));
}

function deleteGroup(grID){
    getGroupRef(grID).delete()
        .then( () => Console.log("Delete Group success !!!"))
        .catch( er => showFailded(er));
}

function updateDefault(grID){
    getConfigDefaultRef().set({groupDefault: grID})
        .then( () => console.log("Update Default success !!!"))
        .catch( er => showFailded(er));
}

function changeTask(grIDOld,grIDNew,task){
    console.log(task);
    getTaskRef(grIDOld,task.getID()).delete()
        .then( () =>{
            console.log(`Remove Task in ${grIDOld} success`);
            getTaskRef(grIDNew,task.getID()).set(task.getData())
                .then( () => {
                    console.log(`Addd Task to ${grIDNew} success`);
                })
        }
        )
}

function getTasksOf(grID) {
    return getGroupRef(grID).collection(lsTask).get()
        .then( snapShot => {
            let ls=[];
            snapShot.forEach(e => { 
                let t = new Task(e.id);
                t.setData(e.data());
                ls.push(t);
            });
            return ls;
        });
}

exports.initDB = initDB;
exports.newTask = newTask;
exports.deleteTask=deleteTask;
exports.updateStatusTask= updateStatusTask;
exports.getListGroups= getListGroups;
exports.newGroup =newGroup;
exports.deleteGroup =deleteGroup;
exports.renameGroup =renameGroup;
exports.updateDefault= updateDefault;
exports.changeTask =changeTask;
exports.getConfigDefault=getConfigDefault;
exports.getTasksOf=getTasksOf;