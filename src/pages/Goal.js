import React from 'react'
import { Container, Col } from 'react-bootstrap'
import basketIcon from '../assets/basket.png'

export default function Goal({ goal, onClick }) {
    let classes = "goal-title py-2 px-3 mt-2 rounded pill"

    return (   
        <Col className={"goal-item text-center"} style={{maxWidth: "500px"}} onClick={onClick} role="button">
            <div className={classes}>
                { goal.content }
            </div>
            <img src={basketIcon} style={{maxWidth: "250px", width:"100%"}} />
        </Col>
    )
}