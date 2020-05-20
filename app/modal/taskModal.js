let _idCount=0;

function autoID(){
    let id = "gr"+_idCount;
    _idCount++;
    return id;
}
class Task {
    constructor(id=null){
        if (id==null)
            this._id= autoID();
        else
            this._id=id;
        this.name = "";
        this.note = "";
        this.important = false;
        this.status = false;
    }

    setName(str) {this.name=str;}

    setData(data){
        this.name =data.name;
        this.note = data.note;
        this.important = data.important;
        this.status = data.status;
    }
    
}

exports.Task = Task;