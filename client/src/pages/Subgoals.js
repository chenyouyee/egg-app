import React, { useState } from 'react'
import { Col, Container, Button, Form, FormControl, Row } from 'react-bootstrap'

import { useGoalState, useGoalDispatch } from '../context/goalContext'

import Subgoal from './Subgoal'
import SubgoalsPanel from './SubgoalsPanel'

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
    }

    const strikeSubgoal = (subgoal) => {
        subgoal.status === 'active' 
            ? goalDispatch({ type: 'STRIKE_SUBGOAL', payload: subgoal.id })
            : goalDispatch({ type: 'DELETE_SUBGOAL', payload: subgoal.id })
    }

    const deleteSubgoal = () => {
        goalDispatch({ type: "DELETE_SUBGOAL", payload: selectedSubgoal.id})
        setSelectedSubgoal('')
    }

    const subgoalsMarkup = goalState.subgoals.map(g => (
        // Clicking the same task will toggle the selection on and off
        <Subgoal key={g.id} subgoal={g} onClick={ () => {selectedSubgoal !== g ? setSelectedSubgoal(g) : setSelectedSubgoal('') }} />
    ))

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
            <Col md={4}>
                { selectedSubgoal && <SubgoalsPanel selected={selectedSubgoal} deleteHandler={deleteSubgoal} /> }
            </Col>
        </Container>
    )
}