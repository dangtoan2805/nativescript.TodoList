const main_page ="page/main/main-page";
const local = require("../../modal/DBLocal");


exports.onPageLoaded = (args) => {
    console.log("! In preloaded page");
    local.loadData(()=>{
        console.log("Load data success !!")
            args.object.page.frame.navigate(main_page); 
    })
}









