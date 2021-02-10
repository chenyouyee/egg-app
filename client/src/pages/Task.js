import React from 'react'

export default function Task({ task, onClick }) {
    let classes = "task-item py-2 px-3 mt-2 rounded pill text-white"
    if (task.status === 'inactive') classes += ' task-item-inactive'

    return (        
        <div className={classes} onClick={onClick} role="button">
            { task.content }
        </div>
    )
}