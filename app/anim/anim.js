const Animation = require("tns-core-modules/ui/animation").Animation;

class myAnim{
    animLeftToRight(view){
        view.animate({
            translate:{x:180,y:0},
            duration: 300,
            backgroundColor:"white",
        });
    }
    
    animRightToLeft(view){
        view.animate({
            translate:{x:0,y:0},
            duration: 300,
            backgroundColor:"white",
        });
    }
    
    animCSS(view,css){
        view.className="";
        view.className=css;
    }
}

exports.myAnim=myAnim;