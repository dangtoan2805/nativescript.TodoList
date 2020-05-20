const groupVM= require("./group-view-model").createViewModel;

let vm;
let index;
exports.onNavigatingTo = (args) => {
    let lv=args.object.page.getViewById("listView");
    let content =args.object.page.getViewById("content");
    vm=groupVM(lv,content);
    args.object.bindingContext = vm;
}

exports.onSwipeCellStarted = (args) =>{
    index=args.index;
    const swipeLimits = args.data.swipeLimits;
    const swipeView = args.swipeView;
    const rightItem = swipeView.getViewById('swipeItem');
    swipeLimits.left = 0;
    swipeLimits.right = rightItem.getMeasuredWidth()*1.1;  
}

exports.onEditGroup = (args) =>{
   vm.onCreateGroup(args,index);
}

exports.onDeleteGroup = () =>{
    vm.onDeleteGroup(index);
}







