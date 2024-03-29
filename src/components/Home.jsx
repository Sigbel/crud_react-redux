import React from "react";
import "./DataView.css";
import DataView from "./DataView";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import logo from "../assets/logo.svg";

const Home = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "60px"
  }));

  return (
    <>
      <Grid container spacing={1} marginBottom={"10px"} display="flex" flexDirection="row">
        <Grid item xs={2}>
          <Item>
            <img className="App-logo" src={logo} alt="logo" />
          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item>Xs=8</Item>
        </Grid>
      </Grid>
      <DataView></DataView>
    </>
  );
};

export default Home;
