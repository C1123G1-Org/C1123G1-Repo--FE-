import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import DetailCote from "../components/cote/DetailCote";

export default function CoteDetail() {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <DetailCote/>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}