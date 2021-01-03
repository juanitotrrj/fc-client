import React, { Component } from "react";
import {
    Form,
    Button,
    Modal,
    InputGroup,
} from 'react-bootstrap';

class ForecastUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            show: props.show,
            closeCallback: props.closeCallback,
            forecastName: "",
            numberOfStudiesPerDay: 0,
            percentGrowthOfStudiesPerMonth: 0.00,
            numberOfMonthsToForecast: 0
        };
        this.updateForecast = this.updateForecast.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    async updateForecast(event) {
        event.preventDefault();
        const url = `http://localhost/api/v1/forecasts/${this.state.id}`;

        await fetch(url, {
            method: 'PUT',
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

    async getForecast(callback = null) {
        console.log(this.state);
        const url = `http://localhost/api/v1/forecasts/${this.state.id}`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            id: data.data.id,
            forecastName: data.data.name,
            numberOfStudiesPerDay: data.data.studies_per_day,
            percentGrowthOfStudiesPerMonth: data.data.growth_per_month,
            numberOfMonthsToForecast: data.data.number_of_months,
        }, () => {
            if (callback) {
                callback();
            }
        });
    }

    handleFormChange(event) {
        this.setState({ [event.target.id]: event.target.value });
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
                    onSubmit={this.updateForecast}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Update Forecast</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group controlId="forecastName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name of this Forecast" onChange={this.handleFormChange} defaultValue={this.state.forecastName} />
                        </Form.Group>

                        <Form.Group controlId="numberOfStudiesPerDay">
                            <Form.Label>Number of Studies per Day</Form.Label>
                            <Form.Control type="text" placeholder="Number of Studies per Day" onChange={this.handleFormChange} defaultValue={this.state.numberOfStudiesPerDay} />
                        </Form.Group>

                        <Form.Group controlId="percentGrowthOfStudiesPerMonth">
                            <Form.Label>Percent Growth of Studies per Month</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control type="text" placeholder="Percent" onChange={this.handleFormChange} defaultValue={this.state.percentGrowthOfStudiesPerMonth * 100} />
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
                            <Form.Control type="text" placeholder="Number of Months to Forecast" onChange={this.handleFormChange} defaultValue={this.state.numberOfMonthsToForecast} />
                            <Form.Text className="text-muted">
                                E.g. 12, 5, 36, etc.
                                </Form.Text>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => this.setState({ show: false })}>Cancel</Button>
                        <Button type="submit" variant="warning">Re-generate</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default ForecastUpdate;
