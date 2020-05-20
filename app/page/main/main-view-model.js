const fromObject = require("tns-core-modules/data/observable").fromObject;
const ObservableArray = require("data/observable-array").ObservableArray;
const myAnim= require("../../anim/anim").myAnim;
const comps= require("../../components/comps");
//Page
const task_page = "page/task/task-page"
const group_page = "page/group/group-page";
//Modal
const Task = require("../../modal/taskModal").Task;
const db = require('../../modal/DBFirebase');

//View
let listView;
let tab;
//Attr;
let objVM;
let anim;
let grID;
let groupName="Empty";
let isShowDone=false;
let listNot = [];
let listDone = [];
let listDisplay= new ObservableArray();

//DataBase
function addTask(task){ db.createTask(task,grID); }

function updateStatusTask(task){ db.updateTask(task, grID); }

function delTask(id){ db.delTask(id, grID); }

function loadData(){
    db.getGroupDefault()
        .then(group => showGroup(group))
        .catch(er => showError(er));     
}

function showGroup(gr){
    if(gr!=null){
        this.groupName=gr.getName();
        let tasks= gr.getTasks();
        for (const task of tasks) {
            if(task.status)
                listDone.push(task);
            else
                listNot.push(task);
        }
        displayList(listNot,false);
    } 

}

function showError(er){
    console.log(" !!!Err :");
    console.log(er);
}

exports.createViewModel = (lv, seTab)=> {
    listView=lv;
    tab=seTab;
    objVM = new fromObject({
        "onPageLoaded":onPageLoaded,
        "listTask": listDisplay,
        "grName":groupName,
        "isEmpty": true,
        "progress":updateProgress,
        "onShowTaskDone":onShowTaskDone,
        "onShowTaskNot":onShowTaskNot,
        "onItemTap":onItemTap,
        "onCreateTask":onCreateTask,
        "onRemoveTask":onRemoveTask,
        "onEditTask":onEditTask,      
        "onShowGroups":onShowGroups
    });
    return objVM;
}

//Event Main Page
function onPageLoaded(args){
    loadData(); 
    anim= new myAnim(); 
    anim.animCSS(listView,"leftToRight");
    anim.animRightToLeft(tab);
}
 
function onItemTap (args){ // Change Status of Task
    let pos= args.index;
    let task= listDisplay.getItem(pos);
    if(isShowDone)
        changeStatusTask(listDone,listNot,pos);
    else
        changeStatusTask(listNot,listDone,pos);
    updateProgress();
}

function onRemoveTask(index){ // Remove Task
    let pos= index;
    if(isShowDone)
        deleteTask(listDone,pos);
    else
        deleteTask(listNot,pos);
    updateProgress();
}

function onShowTaskDone (){// Show List Task has Status is TRUE 
    displayList(listDone,true);    
}

function onShowTaskNot (){ // Show List Task has Status is FALSE
    displayList(listNot,false);  
}

function animDisplayList(flag){
    if(flag){
        anim.animCSS(listView,"rightToLeft");
        anim.animLeftToRight(tab); 
    }
    else{
        anim.animCSS(listView,"leftToRight");
        anim.animRightToLeft(tab);
    }
}

// Logic View
function updateProgress(){// Update width of Progress bar
    let not =listNot.length;
    let done=listDone.length;
    let total=not+done;
    objVM.progress =(done/total)*100;
} 

function deleteTask(list,pos){ // Return Boolean For list isEmpty.
    let task= listDisplay.getItem(pos);
    //Update view
    listDisplay.splice(pos,1);
    list.splice(pos,1);
    checkEmpty(list.length);
    //Update database
    delTask(task.id);
}

function checkEmpty(len){
    objVM.isEmpty = len > 0 ? false:true;
}

function createNewTask(text){
    if(text!=null){
        let obj = new Task();
        obj.setName(text);
        listDisplay.unshift(obj);
        listNot.unshift(obj);
        addTask(obj);
    }
}

function displayList(ls,flag){// Change between List Done (Status task ==  True) and List Not (Status task == False)
    isShowDone=flag;
    animDisplayList(flag);
    let length= ls.length;
    if (length !=0){
        //Remove all item in list
        listDisplay.splice(0,length); 
        //Add new item 
        for (let i = 0; i < length;  i++) {
            listDisplay.push(ls[i]);
        }
    }   
    checkEmpty(length);
}

function changeStatusTask(listPop,listPush,pos){ 
    let task= listDisplay.getItem(pos);
    task.status= !task.status;
    //Update view
    listDisplay.splice(pos,1);
    listPop.splice(pos,1);
    listPush.push(task);
    checkEmpty(listPop.length);
    //Update Database
    updateStatusTask(task.id);
}

//Navigation
function onShowGroups(args){
    args.object.page.frame.navigate(group_page);
}

function onCreateTask(args){
    comps.ShowPrompt(args,"Task","",createNewTask);
}

function onEditTask(args,index){
    args.object.page.frame.navigate({
        moduleName:task_page,
        context:{ 
            task: listDisplay.getItem(index)
        }
    })
}





















