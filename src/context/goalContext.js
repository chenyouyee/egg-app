import React, { createContext, useReducer, useContext } from 'react'

const GoalStateContext = createContext()
const GoalDispatchContext = createContext()

const findGoalById = (goals, id) => {
    const goal = goals.find(g => g.id === id)
    console.log(goal)
    return goal
}

function goalReducer(state, action) {
    let newId
    let newGoal
    let goalId
    let goalsCopy
    let subgoalsCopy
    switch (action.type) {
        case 'ADD_GOAL':
            newId = Math.random()
            newGoal = { 'id': newId, 'content': action.payload, 'status': "active" }
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
        case 'ADD_SUBGOAL':
            newId = Math.random()
            let newSubgoal = {'id': newId, 'content': action.payload.content, parentId: action.payload.goalId}
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