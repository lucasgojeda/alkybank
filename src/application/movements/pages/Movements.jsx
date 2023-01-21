/** Libraries */
import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import * as locales from "@mui/material/locale";
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import {
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

/** Helpers */
import { axiosClientToken } from "../../../helpers";

/** Utils */
import { visuallyHidden } from "@mui/utils";

const headCells = [
  {
    id: "concept",
    numeric: false,
    disablePadding: false,
    label: "Concept",
    responsive: "value",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
    responsive: "value",
  },
  {
    id: "mount",
    numeric: true,
    disablePadding: false,
    label: "Amount",
    responsive: "mout",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
    responsive: "value",
  },
];

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export default function Movements() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  // eslint-disable-next-line
  const [locale, setLocale] = useState("enEN");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("concept");
  const [selected, setSelected] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searched, setSearched] = useState("");

  let results = transactions;
  const themeWithLocale = useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme]
  );

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const {
          data: { data },
        } = await axiosClientToken.get("/transactions");
        setTransactions(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTransactions();
  }, []);

  const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead style={{ backgroundColor: "#1976D2" }}>
        <TableRow>
          {headCells.map((headCell) =>
            headCell.responsive !== "value" && sm ? (
              ""
            ) : (
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
                  style={{ color: "#fff" }}
                >
                  {headCell.label}

                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
          )}
        </TableRow>
      </TableHead>
    );
  };

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = transactions.map((n) => n.concept);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (searched) {
    results = !searched
      ? transactions
      : transactions.filter((transaction) => {
        return (
          transaction.concept.toLowerCase().includes(searched) ||
          transaction.concept.includes(searched) ||
          transaction.type.toLowerCase().includes(searched)
        );
      });
  }

  const handleSearch = ({ target }) => {
    setSearched(target.value);
  };

  return (
    <Box
      data-testid="movements-page"
      sx={{
        width: sm ? "100%" : "90%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        overflowX: "cover",
        marginBottom: "250px",
        marginLeft: !sm && "7.5%",
      }}
    >
      {transactions?.length !== 0 || !transactions ? (
        <ThemeProvider theme={themeWithLocale}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            name="search"
            type="search"
            placeholder="Search"
            onChange={handleSearch}
            style={{ width: sm ? "100%" : "80%", margin: "12px auto" }}
          />

          <Table
            sx={{
              width: sm ? "100%" : "80%",
            }}
            aria-label="customized table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={transactions.length}
              sx={{ backgroundColor: "#1976D2" }}
            />
            <TableBody>
              {stableSort(results, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((t) => (
                  <TableRow
                    key={t.id}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        visibility: "hidden",
                      },
                      ":hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        "& .MuiSvgIcon-root": {
                          visibility: "visible",
                        },
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {t.concept}
                    </TableCell>
                    <TableCell align="right">{t.type}</TableCell>
                    {t.amount !== "mount" && sm ? (
                      ""
                    ) : (
                      <TableCell align="right">{t.amount}</TableCell>
                    )}

                    <TableCell align="right">
                      {new Date(t.date).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              width: sm ? "100%" : "80%",
              overflow: "hidden",
            }}
          />
        </ThemeProvider>
      ) : (
        <Box width={sm ? "90%" : "80%"}>
          <Skeleton height={80} animation="wave" />
          <Skeleton height={80} animation="wave" />
          <Skeleton height={80} animation="wave" />
          <Skeleton height={80} animation="wave" />
          <Skeleton height={80} animation={false} />
          <Skeleton height={80} animation={false} />
          <Skeleton height={80} animation={false} />
          <Skeleton height={80} animation={false} />
          <Skeleton height={80} animation={false} />
          <Skeleton height={80} animation={false} />
        </Box>
      )}
    </Box>
  );
}
