import './SearchField.css';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";


const SearchField = ({searchText = "", onSearchFieldChange}) => {
   
    return(
        <Paper
            component="form"
            sx={{ p: "2px 4px", marginTop:"20px", display: "flex", alignItems: "center", width: 400, height:35}}>
            
            <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="Search"
                value={searchText} 
                onChange={(e) => onSearchFieldChange(e.target.value)}
                inputProps={{ "aria-label": "search google maps" }}/>
      </Paper>
    );
}

export default SearchField;