const fromObject = require("tns-core-modules/data/observable").fromObject;
let closeCallback;
let title = "";
let text = "";

exports.onShowingModally = (args) => {
    closeCallback = args.closeCallback;
    let tv=args.object.page.getViewById("textV");
    tv.focus();
    
    let con = args.context;
    if (con.title != "") {
        title = con.title;
        text=con.text
    }
    args.object.bindingContext = fromObject({
        title: title,
        text: text
    });
}

exports.onCloseModal = (args) => {
    args.object.page.closeModal();
}

exports.onDone = (args) => {
    const binding = args.object.page.bindingContext;
    let text = binding.get("text");
    closeCallback(text);
}




