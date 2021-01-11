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
            show: props.show,
            closeCallback: props.closeCallback,
            forecastName: "",
            numberOfStudiesPerDay: 0,
            percentGrowthOfStudiesPerMonth: 0.00,
            numberOfMonthsToForecast: 0
        };
        this.createForecast = this.createForecast.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    async createForecast(event) {
        event.preventDefault();
        const url = `${process.env.REACT_APP_FC_API_URI}/api/v1/forecasts`;

        await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: this.state.forecastName,
                studies_per_day: parseInt(this.state.numberOfStudiesPerDay, 10),
                growth_per_month: parseFloat(this.state.percentGrowthOfStudiesPerMonth) / 100,
                number_of_months: parseInt(this.state.numberOfMonthsToForecast),
            })
        })
        .then(response => response.json())
        .then(() => {
            this.state.closeCallback();
            this.setState({ show: false });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    handleFormChange(event) {
        this.setState({ [event.target.id]: event.target.value});
    }

    render() {
        return (
            <Modal
                show={this.state.show}
                onHide={() => this.setState({ show: false })}
                backdrop="static"
                keyboard={false}
            >
                <Form
                    onSubmit={this.createForecast}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Create Forecast</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group controlId="forecastName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Name of this Forecast" onChange={this.handleFormChange} />
                            </Form.Group>

                            <Form.Group controlId="numberOfStudiesPerDay">
                                <Form.Label>Number of Studies per Day</Form.Label>
                                <Form.Control type="text" placeholder="Number of Studies per Day" onChange={this.handleFormChange} />
                            </Form.Group>

                            <Form.Group controlId="percentGrowthOfStudiesPerMonth">
                                <Form.Label>Percent Growth of Studies per Month</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control type="text" placeholder="Percent" onChange={this.handleFormChange} />
                                    <InputGroup.Append>
                                        <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    Expressed in percent (e.g. 50.00%, 0.05%, etc.)
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="numberOfMonthsToForecast">
                                <Form.Label>Number of Months to Forecast</Form.Label>
                                <Form.Control type="text" placeholder="Number of Months to Forecast" onChange={this.handleFormChange} />
                                <Form.Text className="text-muted">
                                    E.g. 12, 5, 36, etc.
                                </Form.Text>
                            </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => this.setState({ show: false })}>Cancel</Button>
                        <Button type="submit" variant="success">Generate</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default ForecastCreate;
