// Styles
import "./Home.css";

// Material Ui
import { Box, Button, Paper } from "@mui/material";

// SVG
import logo from "../assets/logo.svg";
import AddBoxIcon from "@mui/icons-material/AddBox";

// Hooks
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { useState } from "react";
import useHttp from "../hooks/useHttp";

// Reducers
import { deleteUser, editUser } from "../redux/users/usersSlice";

// Components
import ModalWindow from "./ModalWindow";
import DataView from "./DataView";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [dataT, setDataT] = useState();
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const http = useHttp();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState("");

  const handleDialogOpen = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setConfirmDialogOpen(true);
  };

  const handleDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmAction = () => {
    if (actionType === "edit") {
      setDataT(null)
      handleEdit(selectedUser);
    } else if (actionType === "delete") {
      handleDelete(selectedUser)
    }
    handleDialogClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
    dispatch(editUser({ id: dataT.id, data: data }));
    handleClose();
  };

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
          <ModalWindow
            open={open}
            setOpen={setOpen}
            data={dataT}
            handleEdit={handleEdit}
            handleDialogOpen={handleDialogOpen}
            confirmDialogOpen={confirmDialogOpen}
            handleDialogClose={handleDialogClose}
            handleConfirmAction={handleConfirmAction}
            actionType={actionType}
          ></ModalWindow>
        </Paper>
      </Box>
      <DataView
        users={users}
        handleEditOpen={handleEditOpen}
        handleDelete={handleDelete}
        confirmDialogOpen={confirmDialogOpen}
        handleDialogClose={handleDialogClose}
        handleConfirmAction={handleConfirmAction}
        actionType={actionType}
        handleDialogOpen={handleDialogOpen}
      ></DataView>
    </>
  );
};

export default Home;
