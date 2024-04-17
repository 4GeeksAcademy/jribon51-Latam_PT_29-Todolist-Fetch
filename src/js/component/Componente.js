import React, { useState,useEffect } from "react";


const Componente = () => {
    //logica
    const getTodosURL = "https://playground.4geeks.com/todo/users/jribon51"
    //fetch(url de la api, metodos,body, informacion es un Json)
    //.then(codigo de estatus y el mesnaje, se convierte json a javascript)
    //.then(informacion que nos llego de la api)
    //.catch(si algo sale mal obteneomos informacion del error)
    //si el metodo no se especifica en el fetch el automaticamente lo interpreta como un GET

    /* fetch(getTodosURL, {
         method: "GET"
     })
         .then((reponse) => {
             console.log(reponse)
             return reponse.json
 
         })
         .then((data) => {
             console.log(data)
         })
         .catch((error) => { error })*/

    const [todos, setTodos] = useState([])
    
    useEffect(()=>{
        fetch(getTodosURL)
        .then(response => response.json())
        .then(data => {
            setTodos(data.todos)
        })
        .catch((error) => { error })
    },[])
    

    return (
        <div className="text-center">
            <h1>Todo's</h1>
            {todos.map((value, index) => {
                return <h3 key={index}>{value.label}</h3>
            })}
        </div>

    );

}

export default Componente;