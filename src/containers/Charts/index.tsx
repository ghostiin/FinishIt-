import React, { Suspense } from 'react';
import { ITodo } from '../../constants';
import styles from './charts.module.scss';

const ChartComponent = React.lazy(() => import('./chart'));

type chartsProps = {
    todos: ITodo[];
}

const Charts: React.FC<chartsProps> = (props) => {
    return (
        <div className={ styles.charts }>
            <Suspense fallback={ <div className={ styles.loading }>Surprise is coming...</div> }>
                <ChartComponent todos={ props.todos } />
            </Suspense>
        </div>
    )
}

export default Charts;