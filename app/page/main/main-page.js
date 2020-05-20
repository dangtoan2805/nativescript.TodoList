//ViewModal
const createViewModel = require("./main-view-model").createViewModel;
//Attr
let index;
let vm;

exports.onNavigatingTo = (args) => {
    let page = args.object;
    // let context =args.context;
    let listView= page.getViewById('listView');
    let selectTab=page.getViewById("selectTab");
    vm=createViewModel(listView,selectTab);
    page.bindingContext = vm;
}

function getGroup(context){
    if(context!=undefined){
        let gr=context.gr;
        if(gr!=undefined){
            console.log(gr);
            return gr;
        }
        else
            return null;
    }
    return null;
}

//Custom Swipe Item
exports.onSwipeCellStarted = (args) =>{
    index=args.index;
    const swipeLimits = args.data.swipeLimits;
    const swipeView = args.swipeView;
    const rightItem = swipeView.getViewById('swipeItem');
    swipeLimits.left = 0;
    swipeLimits.right = rightItem.getMeasuredWidth()*1.1;  
}

exports.onEditTask = (args) =>{
    vm.onEditTask(args,index)
}

exports.onDeleteTask = () =>{
    vm.onRemoveTask(index);
}

