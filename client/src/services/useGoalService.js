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
        }
    }), [dispatch])
  
    return actions
}
  
export default useGoalService