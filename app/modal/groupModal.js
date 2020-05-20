let _idCount=0;

function autoID(){
    let id = "gr"+_idCount;
    _idCount++;
    return id;
}

class Group {
    constructor(id=null){
        if (id==null)
            this._id= autoID();
        else
            this._id=id;
        this._name="";
        this._tasks=[]
    }
    //Property
    getID(){ return this._id; }

    setName(str){ this._name=str; }

    getName(){ return this._name; }

    setTasks(ls) {
        ls.forEach(element => {
            this._tasks.push(element);
        });
    }

    getTasks(){
        return this._tasks;
    }

    addTask (task) {
        this._tasks.push(task);
    }
}

exports.Group = Group;