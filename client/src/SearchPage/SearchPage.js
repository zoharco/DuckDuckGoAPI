import './SearchPage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../hooks/useDebounce';
import Pagination from '@mui/material/Pagination';
import { fetchDataAction } from '../store/actions/DataAction';

import SearchField from '../components/SearchField/SearchField';
import LastQueries from '../components/LastQueries/LastQueries';
import SearchResults from '../components/SearchResults/SearchResults';


const SearchPage = () => {
    const LIMIT = 15;    
    const [searchText, setSearchText] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState((currentPage - 1) * LIMIT);
    const [lastSearchQuries, setLastSearchQuries] = useState([]);
    const searchValue = useDebounce(searchText, 500);
    
    const dispatch = useDispatch();
    const resultData = useSelector(state => state.data);

    useEffect(() => {
        const fetchLastQueris = async () => {
            const response = await fetch('http://localhost:5000/last-quries');
            const data = await response.json();
            setLastSearchQuries(JSON.parse(data).queries);
        };    
        fetchLastQueris();
    }, []);

    useEffect(() => {
        if(!searchValue) {
            return;
        }  
        const updateLastSearchQueries = (query) => {
            const searchQueries = [...lastSearchQuries];
            if(searchQueries.includes(query)){
                const index = searchQueries.findIndex(searchQuery => query === searchQuery);
                searchQueries.splice(index, 1);
            }
            if(lastSearchQuries.length === 10){
                searchQueries.shift();    
            }
            searchQueries.push(query);
            setLastSearchQuries(searchQueries);
        };
        dispatch(fetchDataAction({
            searchText: searchValue, 
            limit: LIMIT, 
            offset
        }));

        if(!lastSearchQuries.includes(searchValue)){
            updateLastSearchQueries(searchValue);
        }
    },[searchValue, currentPage, LIMIT, offset, dispatch, lastSearchQuries]);



    const updateSearchField = (query) => {
        setSearchText(query);
        paginate(1);
    }

    // Change page
    const paginate = (pageNumber) => {
        if(pageNumber === currentPage)
            return;
        
        setCurrentPage(pageNumber);
        setOffset((pageNumber - 1) * LIMIT);
    };

    const onSearchFieldChange = (value) => setSearchText(value);

    return (
        <div className="searchPage" >
           
            <header>
                <h1>DuckDuckGo API</h1>
                <SearchField searchText={searchText}  onSearchFieldChange={onSearchFieldChange}  />
            </header>
            <main>
                <div className="mainWrap">
                    {   resultData && searchText !== "" &&
                        <SearchResults data={resultData.result} />
                    }
                    { lastSearchQuries.length > 0 &&

                        <LastQueries lastQueries={lastSearchQuries} updateSearchField={updateSearchField} />
                    }
                </div>
                <footer>
                    {   resultData && searchText !== "" &&
                        <Pagination 
                            count={ Math.ceil(resultData.originalResultSize / LIMIT)||null} 
                            page={currentPage}
                            siblingCount={0}
                            boundaryCount={2}
                            onChange={(event, number) => {event.preventDefault(); paginate(number)}}
                            shape="rounded" 
                            variant="outlined" 
                            color="primary"
                            />
                            
                    }
                  
                </footer>
            </main>
        </div>
    );
}

export default SearchPage;

