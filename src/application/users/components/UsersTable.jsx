/** Libraries */
import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import Tooltip from "@mui/material/Tooltip";

import IconButton from "@mui/material/IconButton";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Skeleton from "@mui/material/Skeleton";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

/** Components */
import { SendMoneyModal } from "./SendMoneyModal";

/** Custom hooks */
import { useOperationsStore } from "../../../hooks";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const UsersTable = () => {
  const { users, StartGetUsers } = useOperationsStore();

  const [page, setPage] = useState(1);

  const [modalStatus, setModalStatus] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    StartGetUsers(page);
    // eslint-disable-next-line
  }, [page]);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const handleNextPage = (e) => {
    e.preventDefault();

    setPage(page + 1);
  };

  const handlePreviusPage = (e) => {
    e.preventDefault();

    setPage(page - 1);
  };

  const handleSendMoney = (user) => {
    setActiveUser(user);
    setModalStatus(true);
  };

  return (
    <>
      <SendMoneyModal
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        activeUser={activeUser}
      />
      <Box
        data-testid="users-table"
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
        {users?.data.length !== 0 && users !== null ? (
          <Table
            sx={{
              width: sm ? "100%" : "80%",
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Lastname</StyledTableCell>
                {!sm && !md && (
                  <StyledTableCell align="right">Email</StyledTableCell>
                )}
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.data.map((user) => (
                <TableRow
                  key={user.id}
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
                  onDoubleClick={() => handleSendMoney(user)}
                >
                  <TableCell component="th" scope="row">
                    {user.first_name}
                  </TableCell>
                  <TableCell align="right">{user.last_name}</TableCell>
                  {!sm && !md && (
                    <TableCell align="right">{user.email}</TableCell>
                  )}
                  <TableCell align="right">
                    <Tooltip title="Send money" arrow>
                      <IconButton
                        color="default"
                        component="span"
                        onClick={() => handleSendMoney(user)}
                      >
                        <AccountBalanceIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
        <Box
          width="80%"
          maxWidth="100vw"
          height="10vh"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ "& .MuiSvgIcon-root": { fontSize: "45px" } }}
        >
          <Tooltip title="Previus page" arrow>
            <IconButton
              color="primary"
              component="span"
              disabled={users?.previousPage === null ? true : false}
              onClick={handlePreviusPage}
            >
              <ArrowLeftIcon />
            </IconButton>
          </Tooltip>
          <Typography color="GrayText" fontSize="16px" variant="body2">
            Page {page}
          </Typography>
          <Tooltip title="Next page" arrow>
            <IconButton
              color="primary"
              component="span"
              disabled={users?.nextPage === null ? true : false}
              onClick={handleNextPage}
            >
              <ArrowRightIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};
