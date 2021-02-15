import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Button, Form, FormControl } from 'react-bootstrap'

import { useTaskState, useTaskDispatch } from '../context/taskContext'

import Task from './Task'

export default function Home() {
    const taskDispatch = useTaskDispatch()
    const taskState = useTaskState()

    const [content, setContent] = useState('')

    useEffect(() => {
        getTasks()
    })

    const getTasks = () => {
        axios.get('/api/goal/all')
            .then(res => {
                taskDispatch({ type: 'GET_TASKS', payload: res.data })
            })
    }

    const addTask = (e) => {
        e.preventDefault()
        axios.post('/api/goal/', {"content": content})
            .then(res => { 
                console.log(res) 
                if(content.trim() !== '') taskDispatch({ type: 'ADD_TASK', payload: res.data })
            })

        setContent('')
    }

    const strikeTask = (task) => {
        if(task.status === 'active') {
            taskDispatch({ type: 'STRIKE_TASK', payload: task.id })
        } else {
            axios.delete(`/api/goal/${task.id}`)
                .then(res => {
                    if(res.status === 200) {
                        taskDispatch({ type: 'DELETE_TASK', payload: task.id })
                    }
                    console.log(res.data.message)
                    
                })
        }
    }

    const tasksMarkup = taskState.tasks.map(t => (
        <Task key={t.uuid} task={t} onClick={ () => strikeTask(t) } />
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