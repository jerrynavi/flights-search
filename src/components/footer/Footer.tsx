import React, { FC } from 'react';
import { Row, Col, Typography } from 'antd';

interface Link {
    title: string;
    url?: string;
}

const companyLinks: Link[] = [
    {
        title: 'About Travel Mate' 
    },
    {
        title: 'Mobile App'
    },
    {
        title: 'Customer Support'
    },
    {
        title: 'Advertising'
    },
    {
        title: 'Jobs'
    },
    {
        title: 'Privacy Policy'
    },
    {
        title: 'Terms of Use'
    }
];

const exploreLinks: Link[] = [
    {
        title: 'Countries' 
    },
    {
        title: 'Regions'
    },
    {
        title: 'Cities'
    },
    {
        title: 'Districts'
    },
    {
        title: 'Airports'
    },
    {
        title: 'Hotels'
    },
    {
        title: 'Places of Interest'
    }
];

const { Title } = Typography;

const Footer: FC = (): JSX.Element => {
    return (
        <div id="footer">
            <Row>
                <Col xs={{ span: 24 }} lg={{ span: 18, offset: 3 }}>
                    <Row gutter={16}>
                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                            <Title level={2}>Travel Mate</Title>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem cumque voluptates iure, illo veritatis ut dolore corrupti quibusdam explicabo dolores fugit illum debitis sapiente exercitationem nam dolor at culpa praesentium!</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt consectetur in repellat quaerat mollitia similique sapiente officiis veritatis laudantium, qui explicabo, odio pariatur inventore minus quas voluptatum ipsam praesentium dolorum.</p>
                        </Col>
                        
                        <Col xs={{ span: 24 }} md={{ span: 6 }}>
                            <Title level={2}>Company</Title>
                            <ul>
                                {companyLinks.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url}>{link.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </Col>

                        <Col xs={{ span: 24 }} md={{ span: 6 }}>
                            <Title level={2}>Explore</Title>
                            <ul>
                                {exploreLinks.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url}>{link.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Footer;