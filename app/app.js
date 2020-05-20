const db = require("../app/modal/DBFirebase");
db.initDB();
const application = require("tns-core-modules/application");
application.run({ moduleName: "app-root" });


