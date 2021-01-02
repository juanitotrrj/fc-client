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
import moment from 'moment';
import { parseQueryStringToJson } from "../../../helpers";
import ForecastCreate from "../Create";

class ForecastList extends Component {
    constructor(props) {
        super(props);
        const queryString = parseQueryStringToJson(props.location.search);
        this.state = {
            page: queryString.page || 1,
            perPage: queryString.per_page || 10,
            forecasts: {
                data: [],
            },
        };
        this.searchForecasts = this.searchForecasts.bind(this);
        this.handlePerPage = this.handlePerPage.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handlePaginatePrev = this.handlePaginatePrev.bind(this);
        this.handlePaginateNext = this.handlePaginateNext.bind(this);
    }

    handlePerPage(value, search = true) {
        this.setState({ perPage: value }, () => {
            if (search) {
                this.searchForecasts();
            }
        });
    }

    handlePage(event) {
        this.setState({ page: parseInt(event.target.value, 10) });
    }

    handlePaginatePrev(event) {
        if (this.state.page > 1) {
            this.setState({ page: parseInt(this.state.page, 10) - 1 }, () => { this.searchForecasts(); });
        }
    }

    handlePaginateNext(event) {
        const nextPage = parseInt(this.state.page, 10) + 1;
        if (nextPage <= this.state.forecasts.last_page) {
            this.setState({ page: nextPage }, () => { this.searchForecasts(); });
        }
    }

    handlePaginate(event) {
        this.searchForecasts();
        event.preventDefault();
    }

    async componentDidMount() {
        await this.searchForecasts();
    }

    async searchForecasts() {
        const paginationQuery = `page=${this.state.page}&per_page=${this.state.perPage}`;
        const url = `http://localhost/api/v1/forecasts?${paginationQuery}`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ forecasts: data });
    }

    render() {
        return (
            <div>
                <ForecastCreate
                    ref={ref => (this.child = ref)}
                    show={false}
                    closeCallback={this.searchForecasts}
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
                                    {
                                        this.state.forecasts.data.map((forecast) => {
                                            return <tr>
                                                <td>{forecast.name}</td>
                                                <td>{new Intl.NumberFormat().format(forecast.studies_per_day)}</td>
                                                <td>{forecast.growth_per_month * 100}%</td>
                                                <td>{forecast.number_of_months}</td>
                                                <td>{moment(forecast.created_at).format('MM/DD/YYYY HH:mm')}</td>
                                                <td><Button variant="primary" as={NavLink} to={`forecasts/${forecast.id}`}>View</Button></td>
                                            </tr>
                                        })
                                    }
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
                                        onChange={(e) => { this.handlePerPage(parseInt(e.target.value, 10), false);}}
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
