import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer"


const initialState = []
const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
    // muestra en la pag lo que tenga guardado en el local storage con el nombre todos
}
export const useTodo = () => {
  
    const [todos, dispatch] = useReducer(todoReducer, initialState, init)
    
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify( todos || [] ));
        //guarda en el local storage
      
    }, [todos])
    
    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch( action );
    }

    const handleDeleteTodo = (id) => {
        
         dispatch({
            type: '[TODO] Remove Todo',
            payload: id
         })
    }
    const handleToggleTodo = (id) => {
        
         dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
         })
    }
  
    return {
        ...todos,
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length
    }
}
