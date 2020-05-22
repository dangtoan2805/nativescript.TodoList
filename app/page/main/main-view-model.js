const fromObject = require("tns-core-modules/data/observable").fromObject;
const ObservableArray = require("data/observable-array").ObservableArray;
const myAnim= require("../../anim/anim").myAnim;
const comps= require("../../components/comps");
//Page
const task_page = "page/task/task-page"
const group_page = "page/group/group-page";
//Modal
const Task = require("../../modal/taskModal").Task;
const local = require("../../modal/DBLocal");
//View
let listView;
let tab;
//Attr;
let objVM;
let anim;
let isShowDone=false;2
let listNot = [];
let listDone = [];
let listDisplay= new ObservableArray();

exports.createViewModel = (lv, seTab)=> {
    listView=lv;
    tab=seTab;
    objVM = new fromObject({
        "onPageLoaded":onPageLoaded,
        "listTask": listDisplay,
        "grName":"None",
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
/******************************Event on View*****************************/
// Treat database
function onPageLoaded(args){
    anim= new myAnim(); 
    resetList();
    showGroup(local.getDefault());
}
 
function onItemTap (args){ // Change Status of Task
    let pos= args.index;
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

/***************************Logic View ********************************/

function showGroup(gr){ //Load data for group default
    if(gr!=null){
        objVM.grName=gr.getName();
        for (const t of gr.getTasks()) {
            if(t.getStatus())
                listDone.push(t);
            else
                listNot.push(t);
        }
        displayList(listNot,false);
    } 
}

// Treat database
function changeStatusTask(listPop,listPush,pos){  // Update Status for task on View
    let task= listDisplay.getItem(pos);
    task.status= !task.status;
    //Update view
    listDisplay.splice(pos,1);
    listPop.splice(pos,1);
    listPush.unshift(task);
    checkEmpty(listPop.length);
    //Update Database
    local.changeStatus(task.getID());
}

// Treat database
function deleteTask(list,pos){ // Delete task on View
    let task= listDisplay.getItem(pos);
    //Update view
    listDisplay.splice(pos,1);
    list.splice(pos,1);
    checkEmpty(list.length);
    //Update database
    local.delTask(task.getID());
}

// Treat database
function createNewTask(text){ // Add task om View
    if(text!=null){
        let obj = new Task();
        obj.setName(text);
        listDisplay.unshift(obj);
        listNot.unshift(obj);
        onShowTaskNot();
        // Update database
        local.addNewTask(obj);
    }
}

function updateProgress(){// Update width of Progress bar
    let not =listNot.length;
    let done=listDone.length;
    let total=not+done;
    objVM.progress =(done/total)*100;
} 

function displayList(ls,flag){// Show list task on View
    isShowDone=flag;
    animDisplayList(flag);
    let lenNew= ls.length;
    let lenDisplay= listDisplay.length;
    //Remove all item in list
    listDisplay.splice(0,lenDisplay); 
    if (lenNew !=0){
        for (let i = 0; i < lenNew;  i++) {
            listDisplay.push(ls[i]);
        }
    }   
    checkEmpty(listDisplay.length);
}

function animDisplayList(flag){ // Manager Animation when show List Tasks
    if(flag){
        anim.animCSS(listView,"rightToLeft");
        anim.animLeftToRight(tab); 
    }
    else{
        anim.animCSS(listView,"leftToRight");
        anim.animRightToLeft(tab);
    }
}

function checkEmpty(len){ // Check list task display weather null.
    objVM.isEmpty = len > 0 ? false:true;
}

function resetList(){
    let lenNot = listNot.length;
    listNot.splice(0,lenNot);
    let lenDone = listDone.length;
    listDone.splice(0,lenDone);
}

/***************************Navigation********************************/

function onShowGroups(args){
    args.object.page.frame.navigate( {
        moduleName: group_page,
        context: false
    });
}

function onCreateTask(args){
    comps.ShowPrompt(args,"Task","",createNewTask);
}

function onEditTask(args,index){
    args.object.page.frame.navigate({
        moduleName:task_page,
        context: local.getTaskEdit(listDisplay.getItem(index))
    })
}





















