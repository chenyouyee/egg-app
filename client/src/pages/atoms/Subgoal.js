import React from 'react'
import { Row } from 'react-bootstrap'
import eggIcon from '../../assets/fried-egg.png'

export default function Subgoal({ subgoal, onClick }) {
    let classes = "goal-title py-2 px-3 rounded pill"

    return (   
        <Row 
            className={"goal-item align-items-center mb-2"} 
            style={{maxWidth: "fit-content"}}
            onClick={onClick} 
            role="button"
        >
            <img src={eggIcon} style={{maxWidth: "8vw", width:"100%"}} alt={"subgoal icon"} />
            <div className={classes}>
                { subgoal.content }
            </div>
        </Row>
    )
}