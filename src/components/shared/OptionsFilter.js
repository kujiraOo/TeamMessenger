import React from 'react'
import {FormControl, Form, ControlLabel, Col} from 'react-bootstrap'


export default function OptionsFilter(props) {

    const {options, label, onChange, value} = props

    const optionsToRender = options.map(option => {
        return (<option key={option.value} value={option.value}>{option.name}</option>)
    })

    return (
        <Form inline>
            <Col sm={6}>
                <ControlLabel>{label}</ControlLabel>
            </Col>
            <Col sm={6}>
                <FormControl
                    bsSize="sm"
                    componentClass="select"
                    onChange={(e) => {onChange(e.target.value)}}
                    value={value}
                >
                    {optionsToRender}
                </FormControl>
            </Col>
        </Form>
    )
}