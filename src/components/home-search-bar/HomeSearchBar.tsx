import React, { Component, FormEvent } from 'react';
import { Row, Col, Input, Icon, Button, DatePicker, Form, message, AutoComplete, Select, Collapse } from 'antd';
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form';
import moment from 'moment';
import { TypeaheadService } from '../../services/typeahead';
import { DataSourceItemType } from 'antd/lib/auto-complete';
import { MessageType } from 'antd/lib/message';
import { actions } from '../../utils';
import { State } from '../../interfaces/State';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { SearchData } from '../../interfaces/SearchData';

const { Item } = Form;
const { Option } = Select;
const { Panel } = Collapse;
const typeahead = new TypeaheadService();

const handleFormValueChanged = (props: FormComponentProps<any>): void => {
    const departureDateError = props.form.getFieldError('departure_date');
    if (departureDateError && departureDateError.length > 0) {
        for (const error of departureDateError) {
            message.error(error);
        }
    }
};

const cabinOpts: string[] = [
    'First', 'Economy', 'Business', 'Premium', 'All'
];

class HomeSearchBar extends Component<{form: WrappedFormUtils; history?: any; dispatch(action: AnyAction): void }> {
    state: {
        fromCity: string;
        toCity: string;
        departureDate: string;
        matches: DataSourceItemType[];
        loading?: boolean;
        timeout?: NodeJS.Timeout;
    } = {
        fromCity: '',
        toCity: '',
        departureDate: '',
        matches: [],
    }
 
    handleTypeAhead = (value: string): void => {
        clearTimeout(this.state.timeout as NodeJS.Timeout);
        this.setState({ matches: [] }); // clear existing results

        const timeout = setTimeout(async () => {
            this.setState({ loading: true });
            const cities = await typeahead.getCities(value);
            if (cities.data && cities.data.length > 0) {
                const temp = cities.data.splice(0,10); // only process first ten records, for performance
                const modified = temp.map((item: any) => {
                    const _x: DataSourceItemType = {
                        key: item.id,
                        text: `${item.name} (${item.country_name})`,
                        value: item.code
                    };
                    return _x;
                });
                this.setState({
                    matches: modified,
                    loading: false
                });
            }
            this.setState({ loading: false });
        }, 400);
        this.setState({
            timeout
        });
    };

    updateDeparture = (value: string): void => {
        this.setState({
            fromCity: value
        });
    }
    updateDestination = (value: string): void => {
        this.setState({
            toCity: value
        });
    }

    submitForm = (e: FormEvent<HTMLFormElement>): void | MessageType => {
        e.preventDefault();
        const { validateFields } = this.props.form;
        validateFields((errors, values) => {
            if (errors) {
                return message.error('Please fill the search form correctly');
            }
            const searchData: SearchData = {
                origin_destinations: [
                    {
                        return_date: '',
                        ...values
                    }
                ],
                search_param: {
                    no_of_adult: (values.no_of_adult) ? Number(values.no_of_adult) : 1,
                    no_of_child: (values.no_of_child) ? Number(values.no_of_child) : 0,
                    no_of_infant: (values.no_of_infant) ? Number(values.no_of_infant) : 0,
                    cabin: values.cabin,
                    preferred_airline_code: '',
                    calendar: false
                }
            };
            this.props.dispatch({
                type: actions.UPDATE_SEARCH_DATA,
                payload: searchData
            });
            return this.props.history.push('/search');
        });
    }

    render = (): JSX.Element => {
        const { getFieldDecorator } = this.props.form;
        const { fromCity, toCity, departureDate, matches, loading } = this.state;

        return (
            <Form onSubmit={this.submitForm}>
    
                <Row gutter={4}>
                    <Col xs={{ span: 24 }} md={{ span: 5 }}>
                        <Item>
                            {getFieldDecorator('departure_city', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select your departure city'
                                    }
                                ],
                                initialValue: fromCity
                            })(
                                <AutoComplete
                                    size="large"
                                    style={{
                                        marginTop: '0.6rem'
                                    }}
                                    dataSource={matches}
                                    onSearch={(value): void => this.handleTypeAhead(value)}
                                    onSelect={(value): void => this.updateDeparture(value as string)}
                                >
                                    <Input placeholder="From" prefix={<Icon type="pushpin" />} suffix={(loading) ? <Icon type="loading" /> : null} />
                                </AutoComplete>
    
                            )}
                        </Item>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 5 }}>
                        {getFieldDecorator('destination_city', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please enter your destination'
                                }
                            ],
                            initialValue: toCity
                        })(
                            <AutoComplete
                                dataSource={matches}
                                onSearch={(value): void => this.handleTypeAhead(value)}
                                onSelect={(value): void => this.updateDestination(value as string)}
                                size="large"
                                style={{
                                    marginTop: '0.6rem'
                                }}
                            >
                                <Input
                                    placeholder="To"
                                    prefix={<Icon type="pushpin" />}
                                    suffix={(loading) ? <Icon type="loading" /> : null}
                                />
                            </AutoComplete>
                        )}
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 3 }}>
                        {getFieldDecorator('departure_date', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please choose your preferred departure date'
                                },
                                {
                                    validator: (rule, value: moment.Moment): boolean => {
                                        const today = moment();
                                        if (value.isBefore(today)) {
                                            return false;
                                        } else if (value.isAfter(today.add(6, 'months'))) {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    },
                                    message: 'Departure date must be greater than today and less than six months'
                                } 
                            ],
                            initialValue: departureDate
                        })(
                            <DatePicker
                                size="large"
                                placeholder="Departing"
                                style={{
                                    width: '100%',
                                    marginTop: '0.6rem'
                                }}
                                onChange={(d, datestring): void => { this.setState({ departureDate: datestring }); }}
                            />
                        )}
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 3 }}>
                        <DatePicker
                            size="large"
                            placeholder="Arrival"
                            style={{
                                width: '100%',
                                marginTop: '0.6rem'
                            }}
                        />
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 4 }}>
                        {getFieldDecorator('no_of_adult', {
                            rules: []
                        })(
                            <Input
                                size="large"
                                placeholder="Adults (12 years and over)"
                                type="number"
                                style={{
                                    marginTop: '0.6rem'
                                }}
                            />
                        )}
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 4 }}>
                        <Button size="large" block type="primary" htmlType="submit" style={{ marginTop: '0.6rem' }}>
                            Search
                            <Icon type="search" />
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Collapse
                            bordered={false}
                            style={{
                                background: 'transparent'
                            }}
                        >
                            <Panel header={<span style={{ color: '#fff' }}>More options</span>} key="1">

                                <Row gutter={4}>
                                    <Col lg={{ span: 8 }}>
                                        {getFieldDecorator('no_of_child', {
                                            rules: []
                                        })(
                                            <Input
                                                size="large"
                                                placeholder="Children (2-12 y/o)"
                                                type="number"
                                                style={{
                                                    marginTop: '0.6rem'
                                                }}
                                            />
                                        )}
                                    </Col>
                                    <Col lg={{ span: 8 }}>
                                        {getFieldDecorator('no_of_infant', {
                                            rules: []
                                        })(
                                            <Input
                                                size="large"
                                                placeholder="Infants (2 years and under)"
                                                type="number"
                                                style={{
                                                    marginTop: '0.6rem'
                                                }}
                                            />
                                        )}
                                    </Col>
                                    <Col lg={{ span: 8 }}>
                                        {getFieldDecorator('cabin', {
                                            rules: [
                                                {
                                                    required: true
                                                }
                                            ]
                                        })(
                                            <Select
                                                placeholder="Select Cabin"
                                                size="large"
                                                style={{
                                                    marginTop: '0.6rem'
                                                }}>
                                                {cabinOpts.map((opt, i) => (
                                                    <Option key={i} value={opt}>{opt}</Option>
                                                ))}
                                            </Select>
                                        )}
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>

    
            </Form>
        );
    }
}

const wrappedForm = Form.create({
    name: 'flight-search',
    onValuesChange: handleFormValueChanged
})(HomeSearchBar);

const mapProps = (state: State): State => {
    return { ...state };
};

export default connect(mapProps)(wrappedForm) as any;