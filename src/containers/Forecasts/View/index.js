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

class ForecastView extends Component {
    constructor(props) {
        super(props);
        const queryString = parseQueryStringToJson(props.location.search);
        this.state = {
            id: parseInt(props.match.params.id, 10),
            page: queryString.page || 1,
            perPage: queryString.per_page || 10
        };
        this.handlePerPage = this.handlePerPage.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handlePaginatePrev = this.handlePaginatePrev.bind(this);
        this.handlePaginateNext = this.handlePaginateNext.bind(this);

        console.log('testing ForecastView id: ' + this.state.id);
    }

    handlePerPage(value) {
        this.setState({ perPage: value }, () => { console.log(this.state); });
    }

    handlePage(event) {
        this.setState({ page: parseInt(event.target.value, 10) }, () => { console.log(this.state); });
    }

    handlePaginatePrev(event) {
        if (this.state.page > 1) {
            this.setState({ page: this.state.page - 1 }, () => { console.log(this.state); });
        }
    }

    handlePaginateNext(event) {
        this.setState({ page: this.state.page + 1 }, () => { console.log(this.state); });
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <center>
                                <h1>Estimated costs for: forecast1</h1>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <center>
                                <Button variant="primary" as={NavLink} to="/">Back to Main</Button>
                            </center>
                            <br />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
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
                                    <tr>
                                        <td>December</td>
                                        <td>2020</td>
                                        <td>31,000</td>
                                        <td>94.77</td>
                                        <td>12/13/2020 18:21</td>
                                    </tr>
                                    <tr>
                                        <td>January</td>
                                        <td>2021</td>
                                        <td>31,930</td>
                                        <td>97.62</td>
                                        <td>12/13/2020 18:21</td>
                                    </tr>
                                    <tr>
                                        <td>February</td>
                                        <td>2021</td>
                                        <td>32,887</td>
                                        <td>93.99</td>
                                        <td>12/13/2020 18:21</td>
                                    </tr>
                                    <tr>
                                        <td>March</td>
                                        <td>2021</td>
                                        <td>33,873</td>
                                        <td>103.56</td>
                                        <td>12/13/2020 18:21</td>
                                    </tr>
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
                                        onChange={(e) => { this.handlePerPage(parseInt(e.target.value, 10)); }}
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

export default ForecastView;
