import React, {Fragment, useEffect, useState} from "react";
import EditTodo from "./EditTodos";

const ListTodos = () => {

    const [todos, setTodos] = useState([])
    const getTodos = async() => {
        try {
            const response = await fetch('http://localhost:5000/todos')
            const data = await response.json()

            setTodos(data)
        } catch (error) {
            console.error(error.message)
        }
    }

    const deleteTodo = async(id) => {
        try {
            const deletedTodo = await fetch(`http://localhost:5000/todos/${id}`,{
                method: 'DELETE'
            })
            
            setTodos(todos.filter(todo => todo.todo_id !== id))
            console.log(deletedTodo)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getTodos()
    },[])

    return ( 
        <>
            <table className="table">
                <thead>
                <tr>
                    <th>Desciption</th>
                    <th>Date Created</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key ={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>{new Date(todo.date_created).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-')}</td>
                            <td><EditTodo todo={todo}/></td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
        
    );
}
 
export default ListTodos;