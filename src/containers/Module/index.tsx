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
        <Card>card2</Card>
        <Card>card3</Card>
        <Card>card4</Card>
    </div>
}

export default Module;