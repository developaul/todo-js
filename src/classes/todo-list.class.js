import { Todo } from "./todo.class.js";

export class TodoList {

    constructor() {
        this.cargarLocalStorage();
    }

    // Agrega un nuevo Todo a la lista de Todos
    nuevoTodo( todo ) {
        this.todos = [ ...this.todos, todo ];
        this.guardarLocalStorage();
    }

    // Elimina un Todo mediante su id
    eliminarTodo( id ) {
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();
    }

    // Marca si el Todo esta completado o no mediante su id
    marcarCompletado( id ) {

        for( const todo of this.todos ) {
            if( todo.id == id ) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }

    }

    // Elimina todos los Todos completados
    eliminarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStorage();
    }

    // Guarda en el local storage los todos
    guardarLocalStorage() {
        localStorage.setItem( 'todo', JSON.stringify( this.todos ) );
    }

    // Recupera del local storage los todos
    cargarLocalStorage() {
        this.todos = ( localStorage.getItem( 'todo' ) ) 
                        ? JSON.parse( localStorage.getItem( 'todo' ) ) 
                        : [];

        // todo => Todo.fromJson( todo ) === Todo.fromJon
        this.todos = this.todos.map( Todo.fromJson );
    }

}