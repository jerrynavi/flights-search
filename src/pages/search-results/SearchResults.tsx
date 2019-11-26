import React, { Component } from 'react';
import { State } from '../../interfaces/State';
import { connect } from 'react-redux';
import { SearchService } from '../../services/search';
import { SearchResults } from '../../interfaces/SearchResults';
import { FlightData } from '../../interfaces/FlightData';
import { Skeleton, Card, Row, Col, Typography, Icon, Button, message, Empty } from 'antd';
import styles from './SearchResult.module.scss';
import { Link } from 'react-router-dom';
import FlightCard from '../../components/flight-card/FlightCard';

const { Title } = Typography;

class SearchResult extends Component<{currentSearch?: any}> {

    private search = new SearchService();

    state: {
        flights: FlightData[];
        loading: boolean;
    } = {
        flights: [],
        loading: true
    }

    getFlights = async (): Promise<any> => {
        const results: SearchResults = await this.search.searchForFlights(this.props.currentSearch);
        if (typeof results === 'boolean') {
            this.setState({
                loading: false
            });
            return message.error('No flights available');
        }
        this.setState({
            flights: results.body?.data.itineraries,
            loading: false
        });
    }

    componentDidMount = (): void => {
        if (this.props.currentSearch) {
            this.getFlights();
        }
    }

    render = (): JSX.Element => {
        const { loading, flights } = this.state;
        return (
            <div id="search-results">
                <div className={styles.header}>
                    {(flights.length > 0 || !loading)
                        ?
                        <>
                            <Title level={1}>
                                {`${flights.length} flights to your destination`}
                            </Title>
                            <Link to="/">
                                <Button>Search again</Button>
                            </Link>
                        </>
                        :
                        <Icon style={{ color: '#fff', fontSize: '2rem' }} type="loading" />
                    }
                    <Title level={1}>
                    </Title>
                </div>
                <div style={{
                    padding: '1rem'
                }}>
                    <Row>
                        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            {(loading)
                                ?
                                <Card
                                    className="card"
                                >
                                    <Skeleton
                                        title paragraph
                                    />
                                </Card>
                                :
                                (flights.length > 0)
                                    ?
                                    flights.map((flight, i) => (
                                        <FlightCard key={i} flight={flight} />
                                    ))
                                    :
                                    <Card className="card">
                                        <Empty />
                                    </Card>
                            }
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapProps = (state: State): State => {
    return { ...state };
};

export default connect(mapProps)(SearchResult);