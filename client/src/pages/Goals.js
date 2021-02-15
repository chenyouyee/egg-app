import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Button, Form, FormControl, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useGoalState, useGoalDispatch } from '../context/goalContext'

import Goal from './Goal'

export default function Goals() {
    const goalDispatch = useGoalDispatch()
    const goalState = useGoalState()

    const [content, setContent] = useState('')

    useEffect(() => {
        getGoals()
    })

    const getGoals = () => {
        axios.get('/api/goal/all')
            .then(res => {
                goalDispatch({ type: 'GET_GOALS', payload: res.data })
            })
    }

    const addGoal = (e) => {
        e.preventDefault()

        axios.post('/api/goal/', {"content": content})
            .then(res => { 
                console.log(res) 
                if(content.trim() !== '') goalDispatch({ type: 'ADD_GOAL', payload: res.data })
            })

        setContent('')
    }

    const strikeGoal = (goal) => {
        if(goal.status === 'active') {
            goalDispatch({ type: 'STRIKE_TASK', payload: goal.id })
        } else {
            axios.delete(`/api/goal/${goal.id}`)
                .then(res => {
                    if(res.status === 200) {
                        goalDispatch({ type: 'DELETE_GOAL', payload: goal.id })
                    }
                    console.log(res.data.message)
                    
                })
        }
    }

    const goalsMarkup = goalState.goals.map(g => (
        <div key={g.id} >
            <Link className={"link-plain"} to={{
                pathname:"/subgoals",
                state: {
                    parent: g
                }
            }}>
                <Goal goal={g} />
            </Link>
            <Button onClick={() => strikeGoal(g)}>Delete goal</Button>
        </div>
    ))

    return (
        <Container className="py-4 justify-content-center align-items-center">
            <h1 className="display-2 mb-4 text-center">GOALS</h1>
            <Row className="mb-3 justify-content-center">
                <Button className="mb-2 mr-2" onClick={addGoal}>Add goal</Button>
                <Form onSubmit={addGoal}>
                    <FormControl 
                        placeholder="Enter a new goal!" 
                        value={content} 
                        onChange={e => setContent(e.target.value)} 
                    />
                </Form>
            </Row>
            { goalState.goals && (
                <div className="d-flex justify-content-center">
                    { goalsMarkup }
                </div>
            )}
        </Container>
    )
}