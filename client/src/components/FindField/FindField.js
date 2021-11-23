import './FindField.css';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

const FindField = ({onFindFieldChange, appearancesCount}) => {
    
    return (
        <div className="findFieldWrap">
            <Paper
            component="form"
            sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 200, height:20}}>
            
                    <InputBase
                        sx={{ ml: 2, flex: 1 }}
                        placeholder="Find"
                        onChange={(e) => onFindFieldChange(e.target.value)}
                        inputProps={{ "aria-label": "search google maps" }}/>
            </Paper>
            { appearancesCount &&
                <span className="appearencesCount">{appearancesCount} appearences</span> 
            }
        </div>
    );
};

export default FindField;
