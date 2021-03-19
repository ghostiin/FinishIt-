import React, { useContext, useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import styles from './search-bar.module.scss'
import { TodosContext } from '../../Context';

export type SearchBarProps = {
    type?: string;
    placeholder?: string;
    style?: any;
    searchQuery?: any;
    showCancel: boolean;
    clickInput: () => void;
    clickCancel: () => void;
    hasResults: boolean;
}
//TODO 添加search icon props
const SearchBar: React.FC<SearchBarProps> = (props) => {
    const { todos } = useContext(TodosContext);
    const { placeholder = '', type = "text", style = {} } = props;
    const { showCancel = false, clickInput, clickCancel, hasResults } = props
    const inputRef = useRef();
    const [query, setQuery] = useState('');
    const { searchQuery } = props;
    useEffect(() => {
        searchQuery(query); //TODO debounce
    }, [query, todos.length])
    return (
        <>
            <div className={ styles['search-bar'] } style={ style }>
                <input ref={ inputRef } type={ type } placeholder={ placeholder }
                    value={ query }
                    onClick={ clickInput }
                    onBlur={ () => { if (showCancel && !hasResults) { clickCancel(); setQuery(''); } } } //TODO hasResult
                    onFocus={ () => { clickInput() } }
                    onChange={ (e) => { setQuery(e.target.value) } }
                />
                {
                    showCancel && <span onClick={ () => {
                        console.log('cancel')
                        clickCancel();
                        setQuery('');
                    } }>取消</span>
                }

            </div>
        </>)
}

export default SearchBar;