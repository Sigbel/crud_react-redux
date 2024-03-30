// Material Ui
import { TextField, Modal, Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

// Material Ui Icons
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

// Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Reducers
import { addUser } from "../redux/users/usersSlice";

// Components
import AlertDialog from "./AlertDialog";

const ModalWindow = ({
  open,
  setOpen,
  data,
  handleDialogOpen,
  confirmDialogOpen,
  handleDialogClose,
  handleConfirmAction,
  actionType,
}) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [modalEdit, setModalEdit] = useState({});
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    if (data) {
      setModalData({
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        phone: data.phone,
        city: data.city,
      });
    } 
  }, [data]);

  useEffect(() => {
    setModalEdit({
      name: { firstname: modalData.firstname, lastname: modalData.lastname },
      username: modalData.username,
      email: modalData.email,
      phone: modalData.phone,
      address: { city: modalData.city },
    });
  }, [modalData]);

  const handleClose = () => {
    setOpen(false);
    setModalData({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      phone: "",
      city: "",
    });
  };

  const cleanLabels = () => {
    setModalData({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      phone: "",
      city: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddData = () => {
    const newEntry = {
      id: users.length + 1,
      name: { firstname: modalData.firstname, lastname: modalData.lastname },
      username: modalData.username,
      email: modalData.email,
      phone: modalData.phone,
      address: { city: modalData.city },
    };

    dispatch(addUser(newEntry));
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            display="flex"
            gap="10px"
            alignItems="center"
            marginBottom="20px"
          >
            <PersonAddAltIcon></PersonAddAltIcon>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              fontFamily="consolas"
            >
              Novo Cadastro
            </Typography>
          </Box>
          <TextField
            className="input-add"
            label="Nome"
            variant="outlined"
            name="firstname"
            value={modalData.firstname}
            onChange={handleInputChange}
          ></TextField>
          <TextField
            className="input-add"
            label="Sobrenome"
            variant="outlined"
            name="lastname"
            value={modalData.lastname}
            onChange={handleInputChange}
          ></TextField>
          <TextField
            className="input-add"
            label="Usuário"
            variant="outlined"
            name="username"
            value={modalData.username}
            onChange={handleInputChange}
          ></TextField>
          <TextField
            className="input-add"
            label="Email"
            variant="outlined"
            name="email"
            value={modalData.email}
            onChange={handleInputChange}
          ></TextField>
          <TextField
            className="input-add"
            label="Telefone"
            variant="outlined"
            name="phone"
            value={modalData.phone}
            onChange={handleInputChange}
          ></TextField>
          <TextField
            className="input-add"
            label="Cidade"
            variant="outlined"
            name="city"
            value={modalData.city}
            onChange={handleInputChange}
          ></TextField>
          <Box display="flex" justifyContent="flex-end" gap="10px">
            <Button variant="outlined" onClick={() => cleanLabels()}>
              Limpar
            </Button>
            {data ? (
              <Button
                variant="contained"
                onClick={() => {
                  handleDialogOpen(modalEdit, "edit");
                }}
              >
                Editar
              </Button>
            ) : (
              <Button variant="contained" onClick={() => handleAddData()}>
                Incluir
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
      <AlertDialog
        open={confirmDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmAction}
        title={actionType === "edit" ? "Editar usuário" : "Excluir usuário"}
        message={
          actionType === "edit"
            ? "Deseja realmente editar este usuário?"
            : "Deseja realmente excluir este usuário?"
        }
      ></AlertDialog>
    </>
  );
};

export default ModalWindow;
