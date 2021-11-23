import './SearchResults.css';
import parser from 'html-react-parser';
import { useCallback, useEffect, useState } from 'react';
import FindField from '../FindField/FindField';

const SearchResults = ({data}) => {
    //todo: change names data->topics
    const [topicsList, setTopicsList] = useState(data);
    const [findText, setFindText] = useState();
    const [appearancesCount, setAppearancesCount] = useState(null);

    const removeMark = useCallback((data) => {
        setAppearancesCount(null);
        data = data.map(topic => { 
            return {
                ...topic,
                title: topic.title.toString()
                    .replace(new RegExp("<mark>", "gi"), "")
                    .replace(new RegExp("</mark>", "gi"), "")
            }
        });
        return data;
    }, []);

    // const addMark = useCallback(() => {
    //     let count = 0;
    //     const special = /[\\[{().+*?|^$]/g;
    //     let data = [...topicsList];

    //     data = removeMark(data);
    //     let value = findText;
    //     if(value && value !== ""){
    //         if(special.test(value)) {
    //             value = value.replace(special, "\\$&");
    //         }
    //         let regExp = new RegExp(value, "gi");
    //         data = data.map(topic => { 
    //             count += ((topic || '').title.match(regExp) || []).length;
    //             return {
    //                 ...topic,
    //                 title: topic.title.toString().replace(regExp, "<mark>$&</mark>")
    //             }
    //         });
    //         console.log(count);
    //         setTopicsList(data);
    //         setAppearancesCount(count);
    //     }
    // }, [findText, topicsList, removeMark]);

    
    

    useEffect(() => {
        const addMark = () => {
            if(findText === ""){
                setTopicsList(removeMark(topicsList));
                return;
            }
            let count = 0;
            const special = /[\\[{().+*?|^$]/g;
            let data = [...topicsList];
            data = removeMark(data);
            let value = findText;
            if(value && value !== ""){
                if(special.test(value)) {
                    value = value.replace(special, "\\$&");
                }
                let regExp = new RegExp(value, "gi");
                data = data.map(topic => { 
                    count += ((topic || '').title.match(regExp) || []).length;
                    return {
                        ...topic,
                        title: topic.title.toString().replace(regExp, "<mark>$&</mark>")
                    }
                });
                setTopicsList(data);
                setAppearancesCount(count);
            }
        };
        addMark()
    }, [findText, removeMark, ]);    
    
    useEffect(() => {
        setTopicsList(data);
    }, [data]);    

    const onFindFieldChange = (value) => setFindText(value);

    return(
        <div className="searchResults">
            <FindField onFindFieldChange={onFindFieldChange} appearancesCount={appearancesCount} />
            <ul className="topics">
                { topicsList &&
                    topicsList.map((item, index) => (
                        <li key={index}><a href={item.link}  target="_blank" rel="noreferrer" >{parser(item.title)}</a></li>
                    ))
                }
            </ul>        
        </div>
    );
};

export default SearchResults;