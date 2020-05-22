let _idCount=Date.now().toString();

function autoID(){
    let id = "ts"+_idCount;
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

    getStatus() {return this.status ;}

    getID() {return this._id;}

    setName(str) {this.name=str;}

    setData(data){
        this.name =data.name;
        this.note = data.note;
        this.important = data.important;
        this.status = data.status;
    }

    getData(){
        return {
            name: this.name,
            note: this.note,
            important: this.important,
            status: this.status   
        }
    } 
}

exports.Task = Task;