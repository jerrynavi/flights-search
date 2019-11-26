import React, { FC } from 'react';
import { FlightData } from '../../interfaces/FlightData';
import { Card, Col, Row, Typography, Button } from 'antd';
import { formatCurrency } from '../../utils';

const { Title } = Typography;

const FlightCard: FC<{ flight: FlightData}> = (props): JSX.Element => {
    const { flight } = props;
    const _flight = flight.origin_destinations[0];
    return (
        <Card className="card">
            <Row>
                <Col lg={{ span: 9 }}>
                    <Title level={2}>
                        Departure
                    </Title>
                    <Title level={3}>
                        {_flight.segments[0].departure.time}
                    </Title>
                    <p>
                        {_flight.segments[0].departure.airport.city_name}
                    </p>
                    <p>
                        {_flight.segments[0].departure.date}
                    </p>
                </Col>

                <Col lg={{ span: 9 }}>
                    <Title level={2}>
                        Arrival
                    </Title>
                    <Title level={3}>
                        {_flight.segments[0].arrival.time}
                    </Title>
                    <p>
                        {_flight.segments[0].arrival.airport.city_name}
                    </p>
                    <p>
                        {_flight.segments[0].arrival.date}
                    </p>
                </Col>

                <Col lg={{ span: 6 }} className="text-center" style={{
                    alignItems: 'center'
                }}>
                    <Title level={3} className="no-margin">
                        <strong>{formatCurrency(flight.pricing.provider.total_fare)}</strong>
                    </Title>
                    <p className="no-margin">
                        <strong>{_flight.segments[0].operating_airline.name}</strong>
                        <br />
                        <small>{flight.cabin.name}</small>
                    </p>
                    <Button type="primary">
                        Book now
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default FlightCard;