import { Todo } from '../classes';
import { todoList } from '../index.js';


// Referencias en el HTML
const divTodoList   = document.querySelector( '.todo-list' ),
      txtInput      = document.querySelector( '.new-todo' ),
      btnBorrar     = document.querySelector( '.clear-completed' ),
      ulFiltros     = document.querySelector( '.filters' ),
      anchorfiltros = document.querySelectorAll( '.filtro' );


// Esta función crea y retorna el todo en html
export const crearTodoHtml = todo => {
    const { completado, tarea, id } = todo;
    
    const htmlTodo = `
    <li class="${ completado ? 'completed' : '' }" data-id="${ id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ completado ? 'checked' : '' }>
			<label>${ tarea }</label>
			<button class="destroy"></button>
		</div>
	    <input class="edit" value="Create a TodoMVC template">
    </li>`;
    
    const div = document.createElement( 'div' );
    div.innerHTML = htmlTodo;
    
    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}


// Obtiene la tarea, crea el todo y lo agrega a los todos
txtInput.addEventListener( 'keyup', event => {

    if( event.keyCode === 13 && txtInput.value.length > 0 ) {
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }

});


// Eventos sobre los todos marcar como listo, eliminar
divTodoList.addEventListener( 'click', event => {

    const nombreElemento    = event.target.localName;
    const todoElemento      = event.target.parentElement.parentElement;
    const todoId            = todoElemento.getAttribute( 'data-id' );

    if( nombreElemento.includes( 'input' ) ){ // Coloca como completado o no completado el todo
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle( 'completed' );
    } else if( nombreElemento.includes( 'button' ) ) { // Elimina un todo mediante su id
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }

});


// Elimina todos los todos completados
btnBorrar.addEventListener( 'click', () => {
    todoList.eliminarCompletados();
    
    for( let i = divTodoList.children.length - 1; i >= 0; i-- ) {        
        const elemento = divTodoList.children[ i ];

        if( elemento.classList.contains( 'completed' ) ) {
            divTodoList.removeChild( elemento );
        }
    }
});


// Eventos de filtro
ulFiltros.addEventListener( 'click', event => {
    const filtro = event.target.text;
    if( !filtro ) { return; }

    anchorfiltros.forEach( element => element.classList.remove( 'selected' ) );
    event.target.classList.add( 'selected' );

    for( const elemento of divTodoList.children ) {

        elemento.classList.remove( 'hidden' );
        const completado = elemento.classList.contains( 'completed' );

        switch( filtro ) {
            case 'Pendientes': 
                if( completado ) {
                    elemento.classList.add( 'hidden' );
                }
            break;

            case 'Completados': 
                if( !completado ) {
                    elemento.classList.add( 'hidden' );
                }
            break;
        }

    }

});