import { useMemo } from 'react'
import axios from 'axios'

import { useSubgoalDispatch } from '../context/subgoalContext'

const useSubgoalService = () => {
    const dispatch = useSubgoalDispatch()
  
    const actions = useMemo(() => ({
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
  
export default useSubgoalService