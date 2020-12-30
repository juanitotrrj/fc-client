import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    InputGroup,
    FormControl,
    Form,
    DropdownButton,
    Dropdown,
} from 'react-bootstrap';
import { parseQueryStringToJson } from "../../../helpers";
import ForecastCreate from "../Create";

class ForecastList extends Component {
    constructor(props) {
        super(props);
        const queryString = parseQueryStringToJson(props.location.search);
        this.state = {
            page: queryString.page || 1,
            perPage: queryString.per_page || 10
        };
        this.handlePerPage = this.handlePerPage.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handlePaginatePrev = this.handlePaginatePrev.bind(this);
        this.handlePaginateNext = this.handlePaginateNext.bind(this);

        console.log('testing ForecastList');
    }

    handlePerPage(value) {
        this.setState({ perPage: value }, () => { console.log(this.state);});
    }

    handlePage(event) {
        this.setState({ page: parseInt(event.target.value, 10) }, () => { console.log(this.state);});
    }

    handlePaginatePrev(event) {
        if (this.state.page > 1) {
            this.setState({ page: this.state.page - 1 }, () => { console.log(this.state); });
        }
    }

    handlePaginateNext(event) {
        this.setState({ page: this.state.page + 1 }, () => { console.log(this.state);});
    }

    handlePaginate(event) {
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <ForecastCreate
                    ref={ref => (this.child = ref)}
                    show={false}
                />
                <Container>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <center>
                                <h1>Forecasts</h1>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <center>
                                <Button variant="primary" onClick={() => this.child.setState({ show: true })}>Create Forecast</Button>
                            </center>
                            <br/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Studies per Day</th>
                                        <th>Growth per Month</th>
                                        <th>Number of Months</th>
                                        <th>Date Generated</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>forecast1</td>
                                        <td>1,000</td>
                                        <td>3.00%</td>
                                        <td>12</td>
                                        <td>12/13/2020 18:21</td>
                                        <td><Button variant="primary" as={NavLink} to="forecasts/1">View</Button></td>
                                    </tr>
                                    <tr>
                                        <td>forecast2</td>
                                        <td>1,000</td>
                                        <td>64.50%</td>
                                        <td>5</td>
                                        <td>12/16/2020 13:50</td>
                                        <td><Button variant="primary" as={NavLink} to="forecasts/2">View</Button></td>
                                    </tr>
                                    <tr>
                                        <td>forecast3</td>
                                        <td>10,000</td>
                                        <td>15.00%</td>
                                        <td>48</td>
                                        <td>12/16/2020 15:58</td>
                                        <td><Button variant="primary" as={NavLink} to="forecasts/3">View</Button></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 3, offset: 1 }}>
                            <Form onSubmit={(e) => {this.handlePaginate(e);}}>
                                <InputGroup className="mb-3">
                                    <DropdownButton
                                        as={InputGroup.Prepend}
                                        variant="outline-primary"
                                        title="Rows"
                                        id="input-group-dropdown-1"
                                    >
                                        <Dropdown.Item onClick={() => { this.handlePerPage(5);}}>5 rows</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.handlePerPage(10);}}>10 rows</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.handlePerPage(50);}}>50 rows</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.handlePerPage(100);}}>100 rows</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.handlePerPage(200);}}>200 rows</Dropdown.Item>
                                    </DropdownButton>
                                    <FormControl
                                        placeholder="Rows per page"
                                        aria-label="Rows per page"
                                        aria-describedby="basic-addon1"
                                        defaultValue={this.state.perPage}
                                        onChange={(e) => { this.handlePerPage(parseInt(e.target.value, 10));}}
                                    />
                                </InputGroup>
                            </Form>
                        </Col>
                        <Col md={{ span: 3, offset: 4 }}>
                            <Form onSubmit={(e) => { this.handlePaginate(e); }}>
                                <InputGroup>
                                    <FormControl
                                        placeholder="Page"
                                        aria-label="Page"
                                        aria-describedby="basic-addon2"
                                        defaultValue={this.state.page}
                                        onChange={this.handlePage}
                                    />
                                    <InputGroup.Append>
                                        <Button onClick={this.handlePaginatePrev} variant="outline-primary">Prev</Button>
                                        <Button onClick={this.handlePaginateNext} variant="outline-primary">Next</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ForecastList;
