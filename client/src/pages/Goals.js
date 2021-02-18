import React, { useState, useEffect } from 'react'
import { Container, Button, Form, FormControl, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useGoalState } from '../context/goalContext'
import useGoalService from '../services/useGoalService'

import Goal from './atoms/Goal'

export default function Goals() {
    const goalState = useGoalState()
    const { getGoals, addGoal, deleteGoal } = useGoalService()

    const [content, setContent] = useState('')

    useEffect(() => { getGoals() }, [getGoals])

    const addHandler = (e) => {
        e.preventDefault()
        if(content.trim() !== '') addGoal(content)
        setContent('')
    }

    const goalsMarkup = goalState.goals.map(g => (
        <div key={g.id} className="d-flex flex-column align-items-center" >
            <Link className={"link-plain"} to={{
                pathname:"/subgoals",
                state: {
                    parent: g
                }
            }}>
                <Goal goal={g} />
            </Link>
            <Button className="mt-2" onClick={() => deleteGoal(g)}>Delete goal</Button>
        </div>
    ))

    return (
        <Container className="py-3 justify-content-center align-items-center">
            <h1 className="display-2 mb-4 text-center">GOALS</h1>
            <Row className="mb-3 justify-content-center">
                <Button className="mb-2 mr-2" onClick={addHandler}>Add goal</Button>
                <Form onSubmit={addHandler}>
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