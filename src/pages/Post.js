import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import PostList from "../components/posts/PostManagerment/PostList";

function Post() {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <PostList/>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Post;