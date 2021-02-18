import React, { useState, useEffect } from 'react'
import { Col, Container, Button, Form, FormControl, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useGoalState } from '../context/goalContext'
import useGoalService from '../services/useGoalService'

import Subgoal from './atoms/Subgoal'
import SubgoalsPanel from './SubgoalsPanel'

export default function Subgoals(props) {
    const parentGoal = props.location.state.parent
    const goalState = useGoalState()
    const { getSubgoals, addSubgoal, deleteSubgoal } = useGoalService()

    const [content, setContent] = useState('')
    const [selectedSubgoal, setSelectedSubgoal] = useState('')

    useEffect(() => { getSubgoals(parentGoal) }, [getSubgoals, parentGoal])

    const addHandler = (e) => {
        e.preventDefault()
        if(content.trim() !== '') addSubgoal(content, parentGoal.id)

        setContent('')
    }

    // const strikeSubgoal = (subgoal) => {
    //     subgoal.status === 'active' 
    //         ? goalDispatch({ type: 'STRIKE_SUBGOAL', payload: subgoal.id })
    //         : goalDispatch({ type: 'DELETE_SUBGOAL', payload: subgoal.id })
    // }

    const deleteHandler = () => {
        deleteSubgoal(selectedSubgoal)
        setSelectedSubgoal('')
    }

    const subgoalsMarkup = goalState.subgoals.map(g => (
        // Clicking the same task will toggle the selection on and off
        <Subgoal key={g.id} subgoal={g} onClick={ () => {selectedSubgoal !== g ? setSelectedSubgoal(g) : setSelectedSubgoal('') }} />
    ))

    return (
        <div className="d-flex py-3">
            <Col md={1} className={"mr-1"}>
                <Link className={"link-plain"} to={"/"}>
                    <h3 className={"link-plain"} style={{"textAlign": "center"}}>{"«"}</h3>
                </Link>
            </Col>
            <Col md={8} className="mr-2 align-items-center">
                <h1 className="display-2 mb-4">{parentGoal.content}</h1>
                <Row className="mb-3">
                    <Button className="mb-2 mr-2" onClick={addHandler}>+</Button>
                    <Form onSubmit={addHandler}>
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
                { selectedSubgoal && <SubgoalsPanel selected={selectedSubgoal} deleteHandler={deleteHandler} /> }
            </Col>
        </div>
    )
}