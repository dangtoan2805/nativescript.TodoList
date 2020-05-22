const fromObject = require("tns-core-modules/data/observable").fromObject;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
//Page
const main_page = "page/main/main-page";
const task_page ="page/task/task-page";
//comps
const comps= require("../../components/comps");
const myAnim= require("../../anim/anim").myAnim;
//Model
const local = require('../../modal/DBLocal');
const Group = require("../../modal/groupModal").Group;
//View
let listView;
let content;
//Attr
let isTask=false;
let objVM;
let obj = null;
let anim;
let listGroup = new ObservableArray();

exports.createViewModel = (lv,ct, isT) => {
    isTask=isT;
    listView=lv;
    content=ct;
    objVM = fromObject({
        "listGroup": listGroup,
        "isEmpty": false,
        "onBack" : (args) => {

            args.object.page.frame.goBack();
        },
        "onItemTap": onItemTap,
        "onCreateGroup": onShowPrompt,
        "onDeleteGroup": delGroup,
        "onPageLoaded":onPageLoaded
    });
    return objVM;
}
// ****************Event on View******************** //
// Treat database
function onPageLoaded(){ // Load list group when loaded
    anim = new myAnim(); 
    disPlayList(local.getListGroups());
}

function onItemTap (args)  { // Return group for Main / Task
    let gr= listGroup.getItem(args.index);
    if(isTask){
        let data = {
            task:null,
            gr: {
                id:gr.getID(),
                name:gr.getName()
            }
        }
        args.object.page.frame.navigate({
            moduleName:task_page,
            context:  data
        });
    }
    else{
        local.changeDefault(gr.getID());
        args.object.page.frame.navigate(main_page);
    }
}

function onShowPrompt(args,index){
    if(index==null)
        comps.ShowPrompt(args,"Group","",onPromptResult);
    else{
        obj=listGroup.getItem(index);
        comps.ShowPrompt(args,"Group",obj.getName(),onPromptResult);
    }
}

function onPromptResult(text){
    if(obj==null)
        addGroup(text);
    else
        updateGroup(text);  
}

// ******************** Logic View************************ //

// Treat database
function addGroup(text){
    if(text!=null){
        let gr = new Group();
        gr.setName(text);
        listGroup.unshift(gr);
        refreshList();
        //Database
        local.addNewGroup(gr);
    }
}

// Treat database
function updateGroup(text){
    obj.setName(text);
    refreshList();
    //Database
    local.renameGroup(obj);
}

// Treat database
function delGroup(index){
    let gr= listGroup.getItem(index);
    listGroup.splice(index,1);
    refreshList();
    //Database
    local.delGroup(gr.getID());
}

function disPlayList(ls){  
    let len = ls.length;
    if(len>0){
        listGroup.splice(0,len);
        for (const gr of ls) {
            listGroup.push(gr);
        }
    }
    refreshList();
}

function refreshList(){
    let len = listGroup.length;
    objVM.isEmpty= len > 0 ? false :true
    listView.refresh();
    anim.animCSS(content,"leftToRight");
}




