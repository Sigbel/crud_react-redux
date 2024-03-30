import React from "react";
import "./Home.css";
import DataView from "./DataView";
import { Box, Button, Paper } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

import logo from "../assets/logo.svg";

import { useSelector, useDispatch } from "react-redux";
import useHttp from "../hooks/useHttp";
import { useQuery } from "react-query";
import ModalWindow from "./ModalWindow";
import { useState } from "react";
import { deleteUser, editUser } from "../redux/users/usersSlice";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [dataT, setDataT] = useState();
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const http = useHttp();

  const handleOpen = () => {
    setDataT("")
    setOpen(true)};
  const handleClose = () => setOpen(false)

  const { isLoading, error } = useQuery(
    "users",
    () => http.get("https://fakestoreapi.com/users"),
    { scaleTime: Infinity }
  );

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  const handleEditOpen = (user) => {
    handleOpen();
    setDataT(user);
  };

  const handleEdit = (data) => {
    dispatch(editUser({id: dataT.id, data: data}))
    handleClose()
  }

  const handleDelete = (user) => {
    dispatch(deleteUser({ id: user.id }));
  };

  return (
    <>
      <Box display="flex" marginBottom="10px">
        <Paper elevation={1} className="app-logo-paper">
          <img className="App-logo" src={logo} alt="logo" />
        </Paper>
        <Paper className="main-bar-paper">
          <Button className="main-bar-box" onClick={() => handleOpen()}>
            <AddBoxIcon className="main-bar-add-icon"></AddBoxIcon>
            <p>Incluir</p>
          </Button>
          <ModalWindow open={open} setOpen={setOpen} data={dataT} handleEdit={handleEdit}></ModalWindow>
        </Paper>
      </Box>
      <DataView
        users={users}
        handleEditOpen={handleEditOpen}
        handleDelete={handleDelete}
      ></DataView>
    </>
  );
};

export default Home;
