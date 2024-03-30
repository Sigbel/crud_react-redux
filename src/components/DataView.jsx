import React from "react";
import "./DataView.css";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteUser, editUser } from "../redux/users/usersSlice";

const DataView = ({ users, handleEditOpen, handleDelete }) => {
  const rows = users.map((user) => ({
    id: user.id,
    firstname: user.name["firstname"],
    lastname: user.name["lastname"],
    username: user.username,
    email: user.email,
    phone: user.phone,
    city: user.address["city"],
  }));

  const collumns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "firstname",
      headerName: "Nome",
      width: 110,
      editable: false,
    },
    {
      field: "lastname",
      headerName: "Sobrenome",
      width: 110,
      editable: false,
    },
    {
      field: "username",
      headerName: "Usuário",
      width: 110,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 130,
      editable: false,
    },
    {
      field: "phone",
      headerName: "Telefone",
      width: 130,
      editable: false,
    },
    {
      field: "city",
      headerName: "Cidade",
      width: 100,
      editable: false,
    },
    {
      field: "action",
      headerName: "Ação",
      width: 150,
      renderCell: (params) => (
        <>
          <Button className="btn_edit" onClick={() => handleEditOpen(params.row)}>
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btn_delete"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon></DeleteIcon>
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={collumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[8]}
          disableColumnSelector
        ></DataGrid>
      </Box>
    </>
  );
};

export default DataView;
