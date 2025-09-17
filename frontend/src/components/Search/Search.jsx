import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import "./Search.css";

export const Search = ({ query, setQuery, onSearch }) => {
    return (
        <div className="search">
            <TextField
                id="search-field"
                placeholder="Search"
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={onSearch}>
                                <SearchIcon className="search-icon" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};
