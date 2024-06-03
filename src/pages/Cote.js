import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import CotesList from "../components/cote/CotesList";

function Cote() {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <CotesList/>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Cote;