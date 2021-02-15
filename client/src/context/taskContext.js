import React, { createContext, useReducer, useContext } from 'react'

const TaskStateContext = createContext()
const TaskDispatchContext = createContext()

const findTaskById = (tasks, id) => {
    const task = tasks.find(t => t.id === id)
    console.log(task)
    return task
}

function taskReducer(state, action) {
    let newTask
    let taskId
    let tasksCopy
    switch (action.type) {
        case 'GET_TASKS':
            return {
                ...state,
                tasks: action.payload
            }
        case 'ADD_TASK':
            //const newId = Math.random()
            //newTask = { 'id': newId, 'content': action.payload, 'status': "active" }
            newTask = action.payload
            tasksCopy = [...state.tasks, newTask]
            return {
                ...state,
                tasks: tasksCopy
            }
        case 'STRIKE_TASK':
            taskId = action.payload
            tasksCopy = [ ...state.tasks ]
            findTaskById(tasksCopy, taskId).status = 'inactive'
            console.log(tasksCopy)
            return {
                ...state,
                tasks: tasksCopy
            }
        case 'DELETE_TASK':
            taskId = action.payload
            tasksCopy = state.tasks.filter(t => t.id !== taskId)

            return {
                ...state,
                tasks:tasksCopy
            }
        default: {
            return state
        }
    }
}

export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, {tasks: []})

    return (
        <TaskDispatchContext.Provider value={dispatch}>
            <TaskStateContext.Provider value={state}>
                { children }
            </TaskStateContext.Provider>
        </TaskDispatchContext.Provider>
    )
}

export const useTaskState = () => useContext(TaskStateContext)
export const useTaskDispatch = () => useContext(TaskDispatchContext)