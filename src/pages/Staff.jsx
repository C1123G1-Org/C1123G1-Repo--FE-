import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { StaffComponent } from "../components/staff/staffcomponent";

function Staff() {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <StaffComponent />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Staff;
