import React from 'react'
import {Modal, Button} from 'react-bootstrap'

class ModalPopup extends React.Component {

    constructor(props) {
        super(props)

        this.state = {showModal: props.showModal}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({showModal: nextProps.showModal})
    }

    close() {
        this.setState({ showModal: false })
    }

    open() {
        this.setState({ showModal: true })
    }

    render() {

        const {openModalButtonText, modalTitle, renderBody} = this.props

        return (
            <div>
                <Button
                    bsStyle="primary"
                    onClick={() => {this.open()}}
                >
                    {openModalButtonText}
                </Button>

                <Modal show={this.state.showModal} onHide={() => {this.close()}}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {renderBody()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {this.close()}}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default ModalPopup