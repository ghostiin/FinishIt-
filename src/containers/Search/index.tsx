import React, { useContext, useState } from 'react';
import Nav from '../../components/Nav';
import { ITodo } from '../../constants';
import { TodosContext } from '../../Context/todos';
import SearchBar from '../../UI/search-bar';
import TodoItem from '../../UI/todoItem';
import styles from './search.modules.scss';

export interface SearchProps {
    isFiltered: boolean;
}

const Search: React.FC<SearchProps> = (props) => {
    const { todos } = useContext(TodosContext);
    const { isFiltered } = props;
    const [showCancel, setShowCancel] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const searchQuery = (query: string) => {
        if (query) {
            setSearchResults(todos.filter((t: ITodo) => t.name.includes(query)))
        } else {
            setSearchResults([])
        }
    }

    return <div className={ styles.search }>
        { !showCancel && <Nav isFiltered={ isFiltered } /> }
        { !isFiltered && <SearchBar
            placeholder={ '搜索' }
            type={ 'search' }
            showCancel={ showCancel }
            clickInput={ () => { setShowCancel(true) } }
            clickCancel={ () => { setShowCancel(false) } }
            searchQuery={ searchQuery }
            hasResults={ !!searchResults.length }
        /> }
        {
            !!searchResults.length && <div className={ styles.results }>{
                searchResults.map(st => {
                    return <TodoItem readonly todo={ st } key={ st._id } />
                })
            }</div>
        }
    </div>
}

export default Search;