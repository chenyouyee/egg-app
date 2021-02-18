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
    let subgoalsCopy
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
            goalId = action.payload
            subgoalsCopy = state.subgoals.filter(t => t.id !== goalId)

            return {
                ...state,
                subgoals:subgoalsCopy
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