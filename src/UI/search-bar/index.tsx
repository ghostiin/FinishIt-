import React from 'react';
import styles from './search-bar.module.scss'

export type SearchBarProps = {
    type?: string;
    placeholder?: string;
    style?: any;
}
//TODO 添加search icon props
const SearchBar: React.FC<SearchBarProps> = (props) => {
    const { placeholder = '', type = "text", style = {} } = props;
    return <div className={ styles['search-bar'] } style={ style }>
        <input type={ type } placeholder={ placeholder } />
    </div>
}

export default SearchBar;