const fromObject = require("tns-core-modules/data/observable").fromObject;
let closeCallback;
let date = new Date();
let d_day = date.getDate();
let d_month = date.getMonth()+1;
var d_year = date.getFullYear();

exports.onShowingModally = (args) => {
    closeCallback = args.closeCallback;
    let con = args.context;
    if (con.day != null) {
        day = con.day;
        month = con.month;
        year = con.year;
    }
    args.object.bindingContext = fromObject({
        day: d_day,
        month: d_month,
        year: d_year
    });
}

exports.onCloseModal = (args) => {
    args.object.page.closeModal(null,null,null);
}

exports.onDone = (args) =>{
    const binding = args.object.page.bindingContext;
    let y = binding.get("year");
    let m = binding.get("month");
    let d = binding.get("day");
    closeCallback(d, m, y);
}





