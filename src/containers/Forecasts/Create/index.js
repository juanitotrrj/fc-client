import React, { Component } from "react";
import {
    Form,
    Button,
    Modal,
    InputGroup,
} from 'react-bootstrap';

class ForecastCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show
        };
    }

    render() {
        return (
            <Modal
                show={this.state.show}
                onHide={() => this.setState({ show: false })}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Forecast</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNumberOfStudiesPerDay">
                            <Form.Label>Number of Studies per Day</Form.Label>
                            <Form.Control type="text" placeholder="Number of Studies per Day" />
                        </Form.Group>

                        <Form.Group controlId="formNumberOfStudyGrowthPerMonth">
                            <Form.Label>Percent Growth of Studies per Month</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control type="text" placeholder="Percent" />
                                <InputGroup.Append>
                                    <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                            <Form.Text className="text-muted">
                                Expressed in percent (e.g. 50.00%, 0.05%, etc.)
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formNumberOfMonthsToForecast">
                            <Form.Label>Number of Months to Forecast</Form.Label>
                            <Form.Control type="text" placeholder="Number of Months to Forecast" />
                            <Form.Text className="text-muted">
                                E.g. 12, 5, 36, etc.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => this.setState({ show: false })}>Cancel</Button>
                    <Button variant="success" onClick={() => this.setState({ show: false })}>Generate</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ForecastCreate;
