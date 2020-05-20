const fromObject = require("tns-core-modules/data/observable").fromObject;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
//Page
const main_page = "page/main/main-page"
//comps
const comps= require("../../components/comps");
const myAnim= require("../../anim/anim").myAnim;
//Model
const db = require('../../modal/DBFirebase');
const Group = require("../../modal/groupModal").Group;
//View
let listView;
let content;
//Attr
let objVM;
let obj = null;
let anim;
let listGroup = new ObservableArray();

//Database
function updateDefault(grID){

}

function addGroup(text){
    let gr = new Group(text);
    listGroup.unshift(gr);
    //Database
    // db.addGroup(text);
}

function updateGroup(text){
    obj.name=text;
    listGroup.setItem(pos,obj);
    refreshList(false);
    //Database
    // db.updateGroup(obj.id,text);
}

function delGroup(index){
    let gr= listGroup.getItem(index);
    listGroup.splice(index,1);
    //Database
    // db.deleteGroup(gr.id);
}

function loadData(){
    // return db.getListGroup()
}


exports.createViewModel = (lv,ct) => {
    listView=lv;
    content=ct;
    objVM = fromObject({
        "listGroup": listGroup,
        "isEmpty": true,
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
//Event Group Page
function onPageLoaded(){
    anim = new myAnim(); 
    loadData();
    refreshList(true);
}

function disPlayList(ls){  
    let len = ls.length;
    if(len>0){
        listGroup.splice(0,len);
        for (const gr of data) {
            listGroup.push(gr);
        }
    }
    objVM.isEmpty= len > 0 ? false :true
    refreshList(true);
}

function onItemTap (args)  {
    let gr= listGroup.getItem(args.index);
    updateDefault(gr.getID());
    args.object.page.frame.navigate({
        moduleName: main_page
    });
}

function onShowPrompt(args,index){
    if(index==null)
        comps.ShowPrompt(args,"Group","",onPromptResult);
    else{
        obj=listGroup.getItem(index);
        comps.ShowPrompt(args,"Group",obj.name,onPromptResult);
    }
}

function onPromptResult(text){
    if(obj==null)
        addGroup(text);
    else
        updateGroup(text);  
}

//Logic View
function refreshList(start){
    if(!start)
        listView.refresh();
    anim.animCSS(content,"leftToRight");
}




