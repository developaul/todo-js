
export class Todo {

    // Recibe un objeto y lo hace instancia de la clase Todo
    static fromJson( obj ) {
        const { completado, tarea, creado, id } = obj;

        const tempTodo      = new Todo( tarea );
        tempTodo.completado = completado;
        tempTodo.creado     = creado;
        tempTodo.id         = id;

        return tempTodo;
    }

    constructor( tarea ) {
        this.completado = false;
        this.tarea      = tarea;
        this.creado     = new Date();
        this.id         = new Date().getTime();
    }

}