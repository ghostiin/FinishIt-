import React from 'react';
import { useHistory } from 'react-router';
import Card from '../../UI/card';
import styles from './module.module.scss'

const Module = () => {
    const history = useHistory();
    return <div className={ styles.module }>
        <Card>
            <div onClick={ () => history.push('/?filter=all') }>
                All
            </div>
        </Card>
        <Card><div onClick={ () => history.push('/?filter=scheduled') }>
            Scheduled
            </div></Card>
        <Card><div onClick={ () => history.push('/?filter=flag') }>
            Flag
            </div></Card>
        <Card>Review</Card>
    </div>
}

export default Module;