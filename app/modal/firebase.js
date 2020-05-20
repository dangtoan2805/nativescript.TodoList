const firebase = require("nativescript-plugin-firebase");
var fb;

function init() {
    firebase.init({
    }).then(
        function () {
            console.log(" *** Firebase inti done");
        },
        function (error) {
            console.log(" *** Firebase.init error: " + error);
        }
    );
}

function show() {
    var db = firebase.database();
    console.log(db);
}

exports.show = show;
exports.init = init;