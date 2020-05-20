const fromObject = require("tns-core-modules/data/observable").fromObject;
//Model
const main_page = "page/main/main-page"

let task;

exports.createViewModel = (obj) => 
{
    task=obj
    return fromObject({
        "task":task,
        "remind":false,
        "onBack": onBack
    })
}

function onBack(args){
    args.object.page.frame.navigate({
        moduleName: main_page ,
        context:{task:this.task}
    });
}


function onChangeGroup(){

}

function onRemind(){

}

function onDeleteTask(){
    
}




