import React, { useState } from 'react'
import { Col, Container, Button, Form, FormControl, Row } from 'react-bootstrap'

import { useGoalState, useGoalDispatch } from '../context/goalContext'

import Subgoal from './Subgoal'

export default function Subgoals(props) {
    const parentGoal = props.location.state.parent
    const goalDispatch = useGoalDispatch()
    const goalState = useGoalState()

    const [content, setContent] = useState('')
    const [selectedSubgoal, setSelectedSubgoal] = useState('')

    const addSubgoal = (e) => {
        e.preventDefault()
        if(content.trim() !== '') goalDispatch({ type: 'ADD_SUBGOAL', payload: {content, parentId: parentGoal.id} })

        setContent('')
        console.log(goalState.subgoals)
    }

    const strikeSubgoal = (subgoal) => {
        subgoal.status === 'active' 
            ? goalDispatch({ type: 'STRIKE_SUBGOAL', payload: subgoal.id })
            : goalDispatch({ type: 'DELETE_SUBGOAL', payload: subgoal.id })
    }

    const subgoalsMarkup = goalState.subgoals.map(g => (
        <Subgoal key={g.id} subgoal={g} onClick={ () => setSelectedSubgoal(g) } />
    ))

    const PanelMarkup = () => {
        return (
            <div>
                <p>Subgoal id: {selectedSubgoal.id}</p>
                <p>Subgoal content: {selectedSubgoal.content}</p>
            </div>
        )
    }


    return (
        <Container className="d-flex py-3">
            <Col md={8} className="mr-2 align-items-center">
                <h1 className="display-2 mb-4">{parentGoal.content}</h1>
                <Row className="mb-3">
                    <Button className="mb-2 mr-2" onClick={addSubgoal}>+</Button>
                    <Form onSubmit={addSubgoal}>
                        <FormControl 
                            placeholder="Enter a new subgoal!" 
                            value={content} 
                            onChange={e => setContent(e.target.value)} 
                        />
                    </Form>
                </Row>
                { goalState.subgoals && (
                    <div>
                        { subgoalsMarkup }
                    </div>
                )}

            </Col>
            <Col md={4} className="bg-secondary">
                { selectedSubgoal && <PanelMarkup /> }
            </Col>
        </Container>

    )
}