let _idCount=Date.now().toString();

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
        ls.forEach( e => {
            this._tasks.push(e);
        });    
    }

    getTasks(){ return this._tasks; }

    addTask (task) { this._tasks.push(task);}

    findIndex(taskID){
        return this._tasks.findIndex(e => e.getID()==taskID);
    }

    deleteTask(taskID) {
        let pos = this.findIndex(taskID);
        this._tasks.splice(pos,1);
    }   

    editTask(task){
        let pos = this.findIndex(task.getID());
        this._tasks[pos].setData(task.getData());
        
    }

    changeStatus(taskID){
        let pos = this.findIndex(taskID);
        let st =this._tasks[pos].status;
        this._tasks[pos].status = !st;
    }
}

exports.Group = Group;