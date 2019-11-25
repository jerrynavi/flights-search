import React, { Component } from 'react';
import styles from './Home.module.scss';
import Helmet from 'react-helmet';
import faker from 'faker';
import { Typography, Carousel, Card, Button, Row, Col } from 'antd';
import HomeSearchBar from '../../components/home-search-bar/HomeSearchBar';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

interface City {
    imageUrl: string;
    name: string;
    description: string;
}

const slideOpts = {
    arrows: true,
    nextArrow: <Button shape="circle" size="large" icon="right" />,
    prevArrow: <Button shape="circle" size="large" icon="left" />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ],
};

class Home extends Component {

    state: {
        popularCities?: City[];
    } = { }

    generateFakeCity = (): City => {
        const city: City = {
            name: faker.address.city(),
            imageUrl: '/images/city.jpg',
            description: faker.lorem.words(2)
        };
        return city;
    }

    componentDidMount = (): void => {
        const cities = [];
        for (let i = 0; i < 10; i++) {
            cities.push(this.generateFakeCity());
        }
        this.setState({
            popularCities: cities
        });
    }

    render(): JSX.Element {
        const currentMonth = moment().format('MMMM');
        const { popularCities } = this.state;
        return (
            <>
                <Helmet>
                    <title>Travel Mate</title>
                </Helmet>
                <div className={styles.home}>
                    <div id={styles.banner}>
                        <div className={styles.bannerContent}>
                            <div className={styles.bannerText}>
                                <Title level={1}>Start Your Journey</Title>
                                <p>Compare hundreds of travel websites at once</p>
                            </div>
                            <HomeSearchBar />

                        </div>
                    </div>

                    <section className={styles.section} id={styles.bgPattern}>
                        <header>
                            <Title level={1}>
                                Cities to Travel
                            </Title>
                            <p>Most searched Cities in {currentMonth}</p>
                        </header>

                        <Row>
                            <Col xs={{ span: 24 }} lg={{ span: 18, offset: 3 }}>
                                <Carousel
                                    slidesToShow={4}
                                    {...slideOpts}
                                >
                                    {popularCities?.map((city: City, i: number): JSX.Element => (
                                        <div style={{ padding: '0 0.5rem' }}>
                                            <Card
                                                key={i}
                                                cover={<img src={city.imageUrl} alt="a city" />}
                                                hoverable
                                                style={{
                                                    margin: '0 1rem 0.4rem',
                                                    borderRadius: '0.4rem'
                                                }}
                                            >
                                                <Meta
                                                    title={city.name}
                                                    description={city.description}
                                                />
                                            </Card>
                                        </div>
                                    ))}
                                </Carousel>
                            </Col>
                        </Row>
                    </section>

                    <section className={styles.section} id={styles.cta}>
                        <div className={styles.ctaContent}>
                            <Title level={1}>Download our app</Title>
                            <p>Download our app. Book and manage your trips on the go. Be notified of our hot deals and offers.</p>
                            <a href="#google"><img src="/images/google-play-badge.png" alt="google-play" /></a>
                        </div>
                    </section>
                </div>
            </>
        );
    }
}

export default Home;