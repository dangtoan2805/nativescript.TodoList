const fromObject = require("tns-core-modules/data/observable").fromObject;
let closeCallback;
let d_hour = 12;
let d_minute = 00;

exports.onShowingModally = (args) => {
    closeCallback = args.closeCallback;
    let con = args.context;
    if (con.minute != "") {
        hour = con.hour;
        minute = con.minute
    }
    args.object.bindingContext = fromObject({
        minute: d_minute,
        hour: d_hour
    });
}

exports.onCloseModal = (args) => {
    args.object.page.closeModal(null,null);
}

exports.onDone = (args) => {
    const binding = args.object.page.bindingContext;
    let m = binding.get("minute");
    let h = binding.get("hour");
    closeCallback(m, h);
}




