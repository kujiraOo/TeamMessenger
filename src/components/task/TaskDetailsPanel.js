import React from 'react'
import {Well} from 'react-bootstrap'

export default class DetailPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillUpdate() {
        this.props.requestTaskDetail()
    }

    render() {
        const {entity, senderName} = this.props
        return (
            <Well>
                {entity ? (
                        <div>
                            <h3>Detailed Task Information</h3>
                            <h2>{entity.title}</h2>
                            <p>From: {senderName}</p>
                            <p>Due at: {entity.deadline}</p>
                            <p>{entity.content}</p>
                        </div>
                    ) : (
                        <h3>Nothing to display</h3>
                    )}
            </Well>
        )
    }
}
