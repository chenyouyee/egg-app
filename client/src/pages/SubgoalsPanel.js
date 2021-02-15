import React, { useState } from 'react'
import { Button, Row } from 'react-bootstrap'

export default function SubgoalsPanel({selected, deleteHandler}) {
    const [selectedTab, setSelectedTab] = useState('Tasks')

    function tabLabel(label) {
        return label === selectedTab
            ? (<b>{label}</b>)
            : label
    }

    const Nav = () => {
        const tabList = ["Tasks", "Options"] // Add new tabs here
        const tabMarkup = tabList.map(tab => (
            <Button key={tab} variant="link" className="link-plain" onClick={() => {setSelectedTab(tab)}}>{tabLabel(tab)}</Button>
        ))

        return (
            <Row className="border-bottom mb-2">
                { tabMarkup }
            </Row>
        )
    }

    const TabDisplay = () => {
        switch(selectedTab) {
            case 'Options':
                return (<OptionsTab />)

            case 'Tasks':
                return (<TasksTab />)

            default:
                return (<OptionsTab />)
        }
    }

    const TasksTab = () => {
        return (
            <div>
                <p>This is the task tab</p>
            </div>
        )
    }

    const OptionsTab = () => {
        return (
            <div>
                <Button onClick={deleteHandler}>Delete this subgoal</Button>
            </div>
        )
    }

    return (
        <div>
            <Nav />
            <div className="mb-3">{selected.content}</div>
            <TabDisplay />
        </div>
    )


}