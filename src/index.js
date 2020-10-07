import './styles.css';

// Por defecto importa el index.js
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes.js';


export const todoList = new TodoList();

//  todo => crearTodoHtml( todo ) === crearTodoHtml
todoList.todos.forEach( crearTodoHtml );
