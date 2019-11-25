import React, { Component } from 'react';
import styles from './Home.module.scss';
import Helmet from 'react-helmet';

class Home extends Component {

    componentDidMount = (): void => {
    }

    render(): JSX.Element {
        return (
            <>
                <Helmet>
                    <title>Travel Mate</title>
                </Helmet>
                <div className={styles.home}>
                    {/* to do */}
                </div>
            </>
        );
    }
}

export default Home;