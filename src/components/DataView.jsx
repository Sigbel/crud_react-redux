// Styles
import "./DataView.css";

// Material Ui
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// Material Ui Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AlertDialog from "./AlertDialog";

const DataView = ({
  users,
  handleEditOpen,
  handleDelete,
  handleDialogOpen,
  confirmDialogOpen,
  handleDialogClose,
  handleConfirmAction,
  actionType,
}) => {
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
          <Button
            className="btn_edit"
            onClick={() => handleEditOpen(params.row)}
          >
            <EditIcon></EditIcon>
          </Button>
          <Button
            className="btn_delete"
            onClick={() => handleDialogOpen(params.row, "delete")}
          >
            <DeleteIcon></DeleteIcon>
          </Button>
        </>
      ),
    },
  ];

  const viewportHeight = window.innerHeight;
  const gridHeight = viewportHeight * 0.65;

  return (
    <>
      <Box sx={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={collumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: Math.floor(gridHeight / 52),
              },
            },
          }}
          pageSizeOptions={[Math.floor(gridHeight / 52)]}
          disableColumnSelector
        ></DataGrid>
      </Box>
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

export default DataView;
