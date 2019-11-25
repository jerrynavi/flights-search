import React, { Component } from 'react';
import { Typography, Button, Icon, Divider } from 'antd';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss';
import Helmet from 'react-helmet';

const { Title } = Typography;

class ErrorPage extends Component {
    render(): JSX.Element {
        return (
            <>
                <Helmet>
                    <title>Oops! Page not found! - Travel Mate</title>
                </Helmet>
                <div className={styles.error} style={{ textAlign: 'center' }}>
                    <Title>
                        Error                    
                    </Title>
                    <p>
                        Page not found
                    </p>
                    <Link to="/">
                        <Button shape="round" size="large">
                            Go home
                            <Divider type="vertical" />
                            <Icon type="home" />
                        </Button>
                    </Link>
                </div>
            </>
        );
    }
}

export default ErrorPage;