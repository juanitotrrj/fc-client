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

class ForecastView extends Component {
    constructor(props) {
        super(props);
        const queryString = parseQueryStringToJson(props.location.search);
        this.state = {
            id: parseInt(props.match.params.id, 10),
            page: queryString.page || 1,
            perPage: queryString.per_page || 10,
            costs: {
                data: [],
            },
            forecast: {}
        };
        this.handlePerPage = this.handlePerPage.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handlePaginatePrev = this.handlePaginatePrev.bind(this);
        this.handlePaginateNext = this.handlePaginateNext.bind(this);
    }

    handlePerPage(value, search = true) {
        this.setState({ perPage: value }, () => {
            if (search) {
                this.getCosts();
            }
        });
    }

    handlePage(event) {
        this.setState({ page: parseInt(event.target.value, 10) });
    }

    handlePaginatePrev(event) {
        if (this.state.page > 1) {
            this.setState({ page: parseInt(this.state.page, 10) - 1 }, () => { this.getCosts(); });
        }
    }

    handlePaginateNext(event) {
        const nextPage = parseInt(this.state.page, 10) + 1;
        if (nextPage <= this.state.costs.last_page) {
            this.setState({ page: nextPage }, () => { this.getCosts(); });
        }
    }

    handlePaginate(event) {
        this.getCosts();
        event.preventDefault();
    }

    async componentDidMount() {
        await this.getForecast();
        await this.getCosts();
    }

    async getCosts() {
        const paginationQuery = `page=${this.state.page}&per_page=${this.state.perPage}`;
        const url = `http://localhost/api/v1/forecasts/${this.state.id}/costs?${paginationQuery}`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ costs: data });
    }

    async getForecast() {
        const url = `http://localhost/api/v1/forecasts/${this.state.id}`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ forecast: data.data });
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <center>
                                <h1>{this.state.forecast.name} estimated costs per Month</h1>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <center>
                                <Button variant="primary" as={NavLink} to="/">&larr; Back to Main</Button>
                            </center>
                            <br />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 12 }}>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>Year</th>
                                        <th>Total Studies</th>
                                        <th>Total Cost</th>
                                        <th>Date Generated</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.costs.data.map((cost) => {
                                            return <tr>
                                                <td>{moment(`2021-${cost.month}-01`).format('MMMM')}</td>
                                                <td>{cost.year}</td>
                                                <td>{new Intl.NumberFormat().format(cost.total_studies)}</td>
                                                <td>{`$ ${new Intl.NumberFormat().format(cost.total_cost)}`}</td>
                                                <td>{moment(cost.created_at).format('MM/DD/YYYY HH:mm')}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 3, offset: 1 }}>
                            <Form onSubmit={(e) => { this.handlePaginate(e); }}>
                                <InputGroup className="mb-3">
                                    <DropdownButton
                                        as={InputGroup.Prepend}
                                        variant="outline-primary"
                                        title="Rows"
                                        id="input-group-dropdown-1"
                                    >
                                        <Dropdown.Item onClick={() => { this.handlePerPage(5); }}>5 rows</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.handlePerPage(10); }}>10 rows</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.handlePerPage(50); }}>50 rows</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.handlePerPage(100); }}>100 rows</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.handlePerPage(200); }}>200 rows</Dropdown.Item>
                                    </DropdownButton>
                                    <FormControl
                                        placeholder="Rows per page"
                                        aria-label="Rows per page"
                                        aria-describedby="basic-addon1"
                                        defaultValue={this.state.perPage}
                                        onChange={(e) => { this.handlePerPage(parseInt(e.target.value, 10), false); }}
                                        value={this.state.perPage}
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
                                        value={this.state.page}
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

export default ForecastView;
