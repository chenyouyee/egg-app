import { useMemo } from 'react'
import axios from 'axios'

import { useGoalDispatch } from '../context/goalContext'

const useGoalService = () => {
    const dispatch = useGoalDispatch()
  
    const actions = useMemo(() => ({
        getGoals() {
            axios.get('/api/goal/all')
            .then(res => {
                if(res.status === 200) dispatch({ type: 'GET_GOALS', payload: res.data })
            })
        },

        addGoal(content) {
            axios.post('/api/goal/', {"content": content})
            .then(res => { 
                if(res.status === 200) dispatch({ type: 'ADD_GOAL', payload: res.data })
            })
        },

        deleteGoal(goal) {
            axios.delete(`/api/goal/${goal.id}`)
            .then(res => {
                if(res.status === 200) dispatch({ type: 'DELETE_GOAL', payload: goal.id })            
            })
        },

        getSubgoals(parentGoal) {
            axios.get(`/api/subgoal/all/${parentGoal.id}`)
            .then(res => {
                if(res.status === 200) dispatch({ type: 'GET_SUBGOALS', payload: res.data })
            })
        },

        addSubgoal(content, goalId) {
            axios.post('/api/subgoal', {"content": content, "goalId": goalId })
            .then(res => {
                console.log(res)
                if(res.status === 200) dispatch({ type: 'ADD_SUBGOAL', payload: res.data })
            })
        },

        deleteSubgoal(subgoal) {
            axios.delete(`/api/subgoal/${subgoal.id}`)
            .then(res => {
                if(res.status === 200) dispatch({ type: 'DELETE_SUBGOAL', payload: subgoal.id })
                console.log(res.data.message)
            })
        }

    }), [dispatch])
  
    return actions
}
  
export default useGoalService