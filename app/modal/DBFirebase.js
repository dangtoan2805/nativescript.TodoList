const Task = require("./taskModal").Task;
const Group = require("./groupModal").Group;

const firebase = require("nativescript-plugin-firebase/app");

var grCollect = "groups";
var cfgCollect = "configs";
var db;

function initDB(){
    firebase.initializeApp({persist: false})
    .then (() => {
        console.log("Init Firebase Success");
        db=firebase.firestore();
    })
    .catch(er => console.log("Init Firebase faild" + er));
}

function showFailded(er){ console.log(er);}
//Query
// * Main
function getGroupDefault(){
    return getConfig().then( grID => { return getGroupByID(grID)})
    .then(async gr => { 
        let ar = await getListTaskByGroup(gr.getID());
        gr.setTasks(ar);
        return gr;
    }).catch(er => showFailded(er));
}

function getConfig(){
    return db.collection(cfgCollect).doc("default").get()
    .then( doc => {
        let i;
        if(doc.exists)
            i=doc.data().groupDefault;
        else
            showFailded(`!!! ${doc.id} not exists !!! `);
        return i;
    }).catch(er =>showFailded(er))
}

function getGroupByID(grID){
    return db.collection(grCollect).doc(grID).get()
        .then( doc => {
            let gr = new Group(grID);
            if(doc.exists)
                gr.setName(doc.data().name);
            else
                failed(" ? Table default not found");
            return gr;
        }).catch(er =>showFailded(er));    
}

function getListTaskByGroup(grID){
    return db.collection(grCollect).doc(grID).collection('tasks').get()
        .then(querySnapShot => {
            let ls=[];
            querySnapShot.forEach(e => { 
                let t = new Task(e.id);
                t.setData(e.data());
                ls.push(t);
            });
            return ls;
        }).catch(er =>showFailded(er));    
}


function delTask(taskID, grID){

}

function updateTask(taskID,grID){

}

function createTask(namTask, grID){

}

exports.initDB = initDB;
exports.getGroupDefault =getGroupDefault;
exports.createTask = createTask;
exports.delTask=delTask;
exports.updateTask= updateTask;