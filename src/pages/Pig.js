import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import PigList from "../components/pigs/PigList";

function Pig() {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <PigList/>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Pig;