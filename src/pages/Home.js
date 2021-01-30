import React, { useState } from 'react'
import { Container, Button, Form, FormControl } from 'react-bootstrap'

import { useTaskState, useTaskDispatch } from '../context/taskContext'

import Task from './Task'

export default function Home() {
    const taskDispatch = useTaskDispatch()
    const taskState = useTaskState()

    const [content, setContent] = useState('')

    const addTask = (e) => {
        e.preventDefault()
        if(content.trim() !== '') taskDispatch({ type: 'ADD_TASK', payload: content })

        setContent('')
    }

    const strikeTask = (task) => {
        task.status === 'active' 
            ? taskDispatch({ type: 'STRIKE_TASK', payload: task.id })
            : taskDispatch({ type: 'DELETE_TASK', payload: task.id })
    }

    const tasksMarkup = taskState.tasks.map(t => (
        <Task key={t.id} task={t} onClick={ () => strikeTask(t) } />
    ))

    return (
        <Container className="py-4">
            <Button className="mb-2" onClick={addTask}>Add task</Button>
            <Form onSubmit={addTask}>
                <FormControl 
                    placeholder="Enter a new task!" 
                    value={content} 
                    onChange={e => setContent(e.target.value)} 
                />
            </Form>
            { taskState.tasks && tasksMarkup }
        </Container>
    )
}