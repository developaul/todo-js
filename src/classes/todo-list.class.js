import { Todo } from "./todo.class.js";
import { countPendientes } from "../js/componentes.js";

export class TodoList {

    constructor() {
        this.cargarLocalStorage();
    }

    // Agrega un nuevo Todo a la lista de Todos
    nuevoTodo( todo ) {
        this.todos = [ ...this.todos, todo ];
        this.pendientes++;
        countPendientes.textContent = this.pendientes;
        this.guardarLocalStorage();
    }

    // Elimina un Todo mediante su id
    eliminarTodo( id ) {
        this.todos = this.todos.filter( todo => todo.id != id );
        this.cantidadPendientes();
        this.guardarLocalStorage();
    }

    // Marca si el Todo esta completado o no mediante su id
    marcarCompletado( id ) {

        for( const todo of this.todos ) {
            if( todo.id == id ) {
                todo.completado = !todo.completado;
                this.cantidadPendientes();
                this.guardarLocalStorage();
                break;
            }
        }

    }

    // Elimina todos los Todos completados
    eliminarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado );
        this.cantidadPendientes();
        this.guardarLocalStorage();
    }

    // Guarda en el local storage los todos
    guardarLocalStorage() {
        localStorage.setItem( 'todo', JSON.stringify( this.todos ) );
        localStorage.setItem( 'pendiente', JSON.stringify( this.pendientes ) );
    }

    // Recupera del local storage los todos
    cargarLocalStorage() {
        this.todos      = ( localStorage.getItem( 'todo' ) ) 
                             ? JSON.parse( localStorage.getItem( 'todo' ) ) 
                             : [];
        this.pendientes = ( localStorage.getItem( 'pendiente' ) )
                             ? JSON.parse( localStorage.getItem( 'pendiente' ) )
                             : 0;

        // todo => Todo.fromJson( todo ) === Todo.fromJon
        this.todos = this.todos.map( Todo.fromJson );

        // Imprime en pantalla la cantidad de pendientes
        countPendientes.textContent = this.pendientes;
    }

    // Calcula la cantidad de pendientes
    cantidadPendientes() {
        this.pendientes = 0;

        this.todos.forEach( todo => {
            if( !todo.completado ) { this.pendientes++; }
        });

        // Imprime en pantalla la cantidad de pendientes
        countPendientes.textContent = this.pendientes;
    }
}