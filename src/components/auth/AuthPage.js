import { Grid, Paper } from "@mui/material";

function AuthPage() {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <p>Test</p>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default AuthPage;