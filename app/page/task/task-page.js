//ViewModal
const TaskVM = require("./task-view-model").createViewModel;

exports.onNavigatingTo = (args) => {
    let data = args.context; 
    let content =args.object.page.getViewById("content");
    args.object.page.bindingContext=TaskVM(data,content);    
}
