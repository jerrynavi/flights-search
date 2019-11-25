import React, { FC } from 'react';
import { Row, Col, Input, Icon, Button, DatePicker } from 'antd';

const HomeSearchBar: FC = (): JSX.Element => {
    return (
        <Row gutter={4}>
            <Col xs={{ span: 24 }} md={{ span: 5 }}>
                <Input
                    size="large"
                    type="text"
                    placeholder="From"
                    prefix={<Icon type="pushpin" />}
                    style={{
                        marginTop: '0.6rem'
                    }}
                />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 5 }}>
                <Input
                    size="large"
                    type="text"
                    placeholder="To"
                    prefix={<Icon type="pushpin" />}
                    style={{
                        marginTop: '0.6rem'
                    }}
                />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 3 }}>
                <DatePicker
                    size="large"
                    placeholder="Departing"
                    style={{
                        width: '100%',
                        marginTop: '0.6rem'
                    }}
                />
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
                <Input
                    size="large"
                    placeholder="Passengers"
                    style={{
                        marginTop: '0.6rem'
                    }}
                />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 4 }}>
                <Button size="large" block type="primary" style={{ marginTop: '0.6rem' }}>
                    Search
                    <Icon type="search" />
                </Button>
            </Col>
        </Row>
    );
};

export default HomeSearchBar;