//ViewModal
const TaskVM = require("./task-view-model").createViewModel;

exports.onNavigatingTo = (args) => {
    let task = args.context.task;
    console.log(task);
    args.object.page.bindingContext=TaskVM(task);    
}
