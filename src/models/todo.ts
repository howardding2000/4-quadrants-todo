class Todo {
    id: string;
    text: string;
    isHigh: boolean;
    isUrgent: boolean;
    isCompleted: boolean;

    constructor(todoText:string, isHigh: boolean, isUrgent: boolean){
        this.id = Date.now().toString();
        this.text = todoText;
        this.isHigh = isHigh;
        this.isUrgent = isUrgent; 
        this.isCompleted = false;
    }

}

export default Todo;