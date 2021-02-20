import React, { createContext, useReducer, useContext } from 'react'

const SubgoalStateContext = createContext()
const SubgoalDispatchContext = createContext()

function subgoalReducer(state, action) {
    let subgoalId
    let subgoalsCopy
    switch (action.type) {
        case 'GET_SUBGOALS':
            return {
                ...state,
                subgoals: action.payload
            }
        case 'ADD_SUBGOAL':
            let newSubgoal = action.payload
            subgoalsCopy = [...state.subgoals, newSubgoal]

            return {
                ...state,
                subgoals: subgoalsCopy
            }
        case 'DELETE_SUBGOAL':
            subgoalId = action.payload
            subgoalsCopy = state.subgoals.filter(t => t.id !== subgoalId)

            return {
                ...state,
                subgoals:subgoalsCopy
            }
        default: {
            return state
        }
    }
}

export const SubgoalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(subgoalReducer, {subgoals: []})

    return (
        <SubgoalDispatchContext.Provider value={dispatch}>
            <SubgoalStateContext.Provider value={state}>
                { children }
            </SubgoalStateContext.Provider>
        </SubgoalDispatchContext.Provider>
    )
}

export const useSubgoalState = () => useContext(SubgoalStateContext)
export const useSubgoalDispatch = () => useContext(SubgoalDispatchContext)