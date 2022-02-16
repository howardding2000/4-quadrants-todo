class Todo {
    id: string;
    text: string;
    isHigh: boolean;
    isUrgent: boolean;

    constructor(todoText:string, isHigh: boolean, isUrgent: boolean){
        this.id = Math.random().toString();
        this.text = todoText;
        this.isHigh = isHigh;
        this.isUrgent = isUrgent; 
    }

}

export default Todo;