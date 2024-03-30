import React from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Typography from "@mui/material/Typography";
import { TextField, Modal, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/users/usersSlice";

const ModalWindow = ({ open, setOpen, data, handleEdit }) => {
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

  const [modalData, setModalData] = useState({
    name: { firstname: "", lastname: "" },
    username: "",
    email: "",
    phone: "",
    address: { city: "" }
  });

  useEffect(() => {
    if (data) {
      setModalData({
        name: { firstname: data.firstname, lastname: data.lastname },
        username: data.username,
        email: data.email,
        phone: data.phone,
        address: { city: data.city },
      });
    }
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    setModalData({
      name: { firstname: "", lastname: "" },
      username: "",
      email: "",
      phone: "",
      address: { city: "" }
    });
  };

  const cleanLabels = () => {
    setModalData({
      name: { firstname: "", lastname: "" },
      username: "",
      email: "",
      phone: "",
      address: { city: "" }
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" gap="10px" alignItems="center" marginBottom="20px">
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
          value={modalData.name["firstname"]}
          onChange={handleInputChange}
        ></TextField>
        <TextField
          className="input-add"
          label="Sobrenome"
          variant="outlined"
          name="lastname"
          value={modalData.name["lastname"]}
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
          value={modalData.address["city"]}
          onChange={handleInputChange}
        ></TextField>
        <Box display="flex" justifyContent="flex-end" gap="10px">
          <Button variant="outlined" onClick={() => cleanLabels()}>
            Limpar
          </Button>
          {modalData.name['firstname'] ? (
            <Button variant="contained" onClick={() => handleEdit(modalData)}>
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
  );
};

export default ModalWindow;
