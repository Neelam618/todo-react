import React, { useState, useEffect } from "react";
import "./style.css";


const Todo = () => {
    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState([])
    const [isEditItem, setIsEditItem] = useState("")
    const [toggleIcon, setToggleIcon] = useState(false)

    const addItem = () => {
        if (!inputData) {
            alert("Please add an Item")
        }
        else if (inputData && toggleIcon) {
            setItems(items.map((item) => {
                if (item.id === isEditItem) {
                    return { ...item, name: inputData }
                }
                return item
            })
            )
            setInputData("")
            setToggleIcon(false)
            setIsEditItem(null)
        }
        else {
            const newInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, newInputData])
            setInputData("")
            return items
        }
    }

    const deleteItem = (index) => {
        const updatedItems = items.filter((item) => {
            return index !== item.id
        })
        setItems(updatedItems)
    }

    const editItem = (index) => {
        let editItem = items.find((item) => {
            return item.id === index
        })
        setIsEditItem(editItem.id)     //setIsEditItem(index)
        setInputData(editItem.name)
        setToggleIcon(true)
    }

    const clearItems = () => {
        setItems([])
    }

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input
                            type="text"
                            placeholder="✍ Add Item"
                            className="form-control"
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        {toggleIcon ?
                            <i onClick={addItem} className="far fa-edit add-btn"></i>
                            :
                            <i onClick={addItem} className="fa fa-plus add-btn"></i>
                        }
                    </div>
                    {/* show our items  */}
                    <div className="showItems">
                        {items.map((item) => {
                            return (
                                <div className="eachItem" key={item.id} >
                                    <h3>{item.name}</h3>
                                    <div className="todo-btn">
                                        <i onClick={() => editItem(item.id)}
                                            className="far fa-edit add-btn"
                                        ></i>
                                        <i onClick={() => deleteItem(item.id)}
                                            className="far fa-trash-alt add-btn"
                                        ></i>
                                    </div>
                                </div>
                            )
                        })
                        }

                        {/* rmeove all button  */}
                        <div className="showItems">
                            <button
                                className="btn effect04"
                                data-sm-link-text="Remove All"
                                onClick={clearItems}
                            >
                                <span> CHECK LIST</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;