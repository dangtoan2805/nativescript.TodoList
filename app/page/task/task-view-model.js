const fromObject = require("tns-core-modules/data/observable").fromObject;
//Model
const main_page = "page/main/main-page";
const group_page ="page/group/group-page";
const local = require('../../modal/DBLocal');
//Amin
const myAnim= require("../../anim/anim").myAnim;

let gr;
let task;
let objVM;
let anim;
let content;

exports.createViewModel = (d,ct) => 
{
    content=ct;
    if(d.task!=null){
        task=d.task;
        gr=d.gr;
    }
    else{
        let grIDOld= gr.id;
        gr=d.gr;
        let grIDNew =gr.id;
        local.changeGroupOfTask(grIDOld,grIDNew,task.getID());
    }
    objVM = fromObject({
        "task":task,
        "grName":gr.name,
        "remind":false,
        "onDeleteTask":onDeleteTask,
        "onChangeGroup":onChangeGroup,
        "onBack": onBack,
        "onPageLoaded":onPageLoaded
    });
    return objVM;
}

function onPageLoaded (){
    anim = new myAnim(); 
    anim.animCSS(content,"leftToRight");
}

function onBack(args){
    local.updateTask(task);
    args.object.page.frame.navigate({
        moduleName: main_page
    });
}

function onChangeGroup(args){
    args.object.page.frame.navigate({
        moduleName: group_page,
        context: true
    });
}

function onRemind(){

}

function onDeleteTask(args){
    local.delTask(task.getID());
    onBack(args);
}




