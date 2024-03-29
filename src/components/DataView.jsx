import React from "react";
import useHttp from "../hooks/useHttp";

import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const DataView = () => {
  const http = useHttp();
  const users = useSelector((state) => state.users);

  const rows = [];
  const collumns = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "firstname",
      headerName: "First Name",
      width: 100,
      editable: false,
    },
    {
      field: "lastname",
      headerName: "Last Name",
      width: 100,
      editable: false,
    },
    {
      field: "username",
      headerName: "Username",
      width: 100,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 100,
      editable: false,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 100,
      editable: false,
    },
    {
      field: "password",
      headerName: "Password",
      width: 100,
      editable: false,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
      editable: false,
    },
  ];

  users.users.map((user) =>
    rows.push({
      id: user.id,
      firstname: user.name["firstname"],
      lastname: user.name["lastname"],
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone,
      city: user.address["city"]
    })
  );

  console.log(rows)

  const { isLoading, error } = useQuery("users", () =>
    http.get("https://fakestoreapi.com/users")
  );

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <>
      <Box sx={{ height: "95vh", width: "100%" }}>
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
        ></DataGrid>
      </Box>
    </>
  );
};

export default DataView;
