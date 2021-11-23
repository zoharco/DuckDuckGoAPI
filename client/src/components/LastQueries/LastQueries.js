import { useState } from 'react';
import './LastQueries.css';

const LastQueries = ({lastQueries, updateSearchField}) => {
    const [fetchSucceed, setFetchSucceed] = useState(false);
    const saveClickHandler = async () => {
        console.log(JSON.stringify({ queries: lastQueries }));
        try{
            const response = await fetch('http://localhost:5000/last-quries', { 
                    method: 'POST', 
                    body: JSON.stringify({ queries: lastQueries }), 
                    headers: {'Content-Type': 'application/json'}
                }
            );
            if(response.ok){
                setFetchSucceed(true);
                setTimeout(() => {
                    setFetchSucceed(false);
                }, 3000);
            }
        } catch (error){
            console.log(error);
        }
    };
 
    return (
        <div className="lastQueries">
            <h2>Searched Queries:</h2>
            <ul>
                { lastQueries &&
                    lastQueries.map((query, i) => (
                        <li key={i}><button onClick={() => updateSearchField(query)}>{query}</button></li>
                    ))
                }    
            </ul>
            <div className="saveBtnWrap">
                { fetchSucceed &&
                    <span className="fetchSucceedMsg">Queries Saved Successfully.</span>
                }
                <button className="saveBtn" onClick={saveClickHandler}>Save Queris</button>
            </div>
            
            
            
        </div>
    );
};
export default LastQueries;