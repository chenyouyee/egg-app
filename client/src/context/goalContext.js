import React, { createContext, useReducer, useContext } from 'react'

const GoalStateContext = createContext()
const GoalDispatchContext = createContext()

const findGoalById = (goals, id) => {
    const goal = goals.find(g => g.id === id)
    return goal
}

function goalReducer(state, action) {
    let newGoal
    let goalId
    let goalsCopy
    switch (action.type) {
        case 'GET_GOALS':
            return {
                ...state,
                goals: action.payload
            }
        case 'ADD_GOAL':
            newGoal = action.payload
            goalsCopy = [...state.goals, newGoal]
            return {
                ...state,
                goals: goalsCopy
            }
        case 'STRIKE_GOAL':
            goalId = action.payload
            goalsCopy = [ ...state.goals ]
            findGoalById(goalsCopy, goalId).status = 'inactive'
            console.log(goalsCopy)
            return {
                ...state,
                goals: goalsCopy
            }
        case 'DELETE_GOAL':
            goalId = action.payload
            goalsCopy = state.goals.filter(t => t.id !== goalId)

            return {
                ...state,
                goals:goalsCopy
            }
        default: {
            return state
        }
    }
}

export const GoalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(goalReducer, {goals: [], subgoals: []})

    return (
        <GoalDispatchContext.Provider value={dispatch}>
            <GoalStateContext.Provider value={state}>
                { children }
            </GoalStateContext.Provider>
        </GoalDispatchContext.Provider>
    )
}

export const useGoalState = () => useContext(GoalStateContext)
export const useGoalDispatch = () => useContext(GoalDispatchContext)