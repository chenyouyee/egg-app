import React, { useState } from 'react'
import { Container, Button, Form, FormControl, Row } from 'react-bootstrap'

import { useGoalState, useGoalDispatch } from '../context/goalContext'

import Goal from './Goal'

export default function Goals() {
    const goalDispatch = useGoalDispatch()
    const goalState = useGoalState()

    const [content, setContent] = useState('')

    const addGoal = (e) => {
        e.preventDefault()
        if(content.trim() !== '') goalDispatch({ type: 'ADD_GOAL', payload: content })

        setContent('')
    }

    const strikeGoal = (goal) => {
        goal.status === 'active' 
            ? goalDispatch({ type: 'STRIKE_GOAL', payload: goal.id })
            : goalDispatch({ type: 'DELETE_GOAL', payload: goal.id })
    }

    const goalsMarkup = goalState.goals.map(g => (
        <Goal key={g.id} goal={g} onClick={ () => strikeGoal(g) } />
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