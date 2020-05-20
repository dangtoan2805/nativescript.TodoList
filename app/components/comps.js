const date_comps = "components/date_comps/date-comps";
const time_comps = "components/time_comps/time-comps";
const prompt_comps ="components/prompt_comps/prompt-comps"

function ShowPrompt(args,title,text,callBack){
    let config = {
        context: {title:title,
                   text:text },
        closeCallback : (text) =>{
            callBack(text);
        },
        fullscreen:false
    }
    args.object.page.showModal(prompt_comps, config);
}

function ShowDate(args,day, month, year,callBack){
    let config = {
        context: { day: day, month: month, year: year },
        closeCallback: (d, m, y) => {
            callBack(d,m,y);
        },
        fullscreen: false
    }
    args.object.page.showModal(date_comps, config);
}

function ShowTime(args,hour, minute,callBack){
    let config = {
        context: { minute: minute, hour: hour },
        closeCallback: (m, h) => {
            callBack(m,h);
        },
        fullscreen: false
    }
    args.object.page.showModal(time_comps, config);
}


exports.ShowPrompt=ShowPrompt;
exports.ShowDate=ShowDate;