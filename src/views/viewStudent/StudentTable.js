import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import EditStudent from "./EditStudent";
import DeleteStudent from "./DeleteStudent";
import { connect } from 'react-redux'
import { studentAction } from "../../action/student.action";
import { useSnackbar } from 'notistack'
import noimage from "../../noimage.png"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id:"photos",
    label: "Image",
  },
  {
    id: "firstName",
    label: "First Name",
  },
  {
    id: "lastName",
    label: "Last Name",
  },
  {
    id: "fatherName",
    label: "Father Name",
  },
  {
    id: "emailId",
    label: "Email ID",
  },
  {
    id: "address",
    label: "Address",
  },
  {
    id: "mobile",
    label: "Mobile no",
  },
  {
    id: "gender",
    label: "Gender",
  },
  {
    id: "dob",
    label: "DOB",
  },

  {
    id: "country ",
    label: "Country ",
  },
  {id:"action",
    label:"Action"
  }
];

function TableHeader(props) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

TableHeader.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function StudentTable({studentData}) {

console.log(studentData)
const { enqueueSnackbar } = useSnackbar()

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editData, setEditData] = React.useState({});
  const [deleteId, setDeleteId] = React.useState("");
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editModal = (event) => {
    var id = event.currentTarget.attributes['data-id'].value;
    const rowData = studentData.find((item) => item.id === id)
    setEditData(rowData)
    setOpenEditModal(true)
  }

  const deleteModal = (event) => {
    var id = event.currentTarget.attributes['data-id'].value;
    setDeleteId(id)
    setOpenDeleteModal(true)
  }

  const handleEdit = (id,values) => {
      const idx = studentData.findIndex( item => item.id === id );
      studentData.splice( idx, 1, values );
      setOpenEditModal(false)
      studentAction(studentData)
      enqueueSnackbar("Record has been updated", {
        variant: 'success',
        autoHideDuration: 2000
    
      })
  }


 const handleDelete = () => {
    const idx = studentData.findIndex( item => item.id === deleteId );
    studentData.splice( idx, 1 );
    setOpenDeleteModal(false)
    studentAction(studentData)
    enqueueSnackbar("Record has been deleted", {
      variant: 'success',
      autoHideDuration: 2000
  
    })
  }
  

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHeader
              
              order={order}
              orderBy={orderBy}
              
              onRequestSort={handleRequestSort}
              rowCount={studentData.length}
            />
            <TableBody>
              
              {stableSort(studentData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  console.log(row)

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell><img style={{"maxWidth":"50px", "maxHeight":"50px"}} src={row.photos?row.photos:noimage} /></TableCell>
                      <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell>{row.fatherName}</TableCell>
                      <TableCell>{row.emailId}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.mobile}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>{row.dob}</TableCell>
                      <TableCell>{row.country}</TableCell>
                      <TableCell>
                      <Button sx={{mr:3}} data-id={row.id} onClick={editModal} variant="contained" type="submit">
                        Edit
                      </Button>
                      <Button data-id={row.id} onClick={deleteModal} variant="contained" type="submit">
                        Delete
                      </Button>
                      </TableCell>
                      
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={studentData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <EditStudent  openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} data={editData} handleEdit={handleEdit}/>
      <DeleteStudent  openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} handleDelete={handleDelete}/>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  studentData : state.students.studentData
})

export default connect(mapStateToProps)(StudentTable)
