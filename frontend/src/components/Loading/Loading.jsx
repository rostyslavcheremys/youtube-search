import { CircularProgress } from "@mui/material";

import "./Loading.css";

export const Loading = () => {
    return (
        <div className="loading">
            <CircularProgress className="loading__circular-progress"/>
        </div>
    );
}
