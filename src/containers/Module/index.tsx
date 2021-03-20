import React from 'react';
import { useHistory } from 'react-router';
import { filterTypes } from '../../constants';
import Card from '../../UI/card';
import styles from './module.module.scss'

type moduleProps = {
    data: any;
}

const Module: React.FC<moduleProps> = (props) => {
    const history = useHistory();
    const { data } = props;
    const { [filterTypes.all]: all,
        [filterTypes.flag]: flag,
        [filterTypes.scheduled]: sche
    } = data;
    return <div className={ styles.module }>
        <Card>
            <div onClick={ () => history.push('/?filter=all') } className={ styles.card }>
                <div className={ styles.left }>
                    <div>📁</div>
                    <span>所有待办历史</span>
                </div>
                <div>{ Number(all) }</div>
            </div>
        </Card>
        <Card><div onClick={ () => history.push('/?filter=scheduled') } className={ styles.card }>
            <div className={ styles.left }>
                <div>📆</div>
                <span>计划时间</span>
            </div>
            <div>{ Number(sche) }</div>
        </div></Card>
        <Card><div onClick={ () => history.push('/?filter=flag') } className={ styles.card }>
            <div className={ styles.left }>
                <div>📍</div>
                <span>想做但未完成</span>
            </div>
            <div>{ Number(flag) }</div>
        </div></Card>
        <Card><div onClick={ () => history.push('/review') } className={ styles.card }>
            <div className={ styles.left }>
                <div>📈</div>
                <span>回顾与分析</span>
            </div>
            <div></div>
        </div></Card>
    </div>
}

export default Module;