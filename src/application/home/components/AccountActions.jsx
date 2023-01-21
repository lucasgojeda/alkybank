/** Libraries */
import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';

import { Button, Card, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const AccountActions = ({ balance }) => {
  return (
    <Card width="100%">
      <Box
        padding={2}
        display="flex"
        justifyContent="space-between"
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box display="flex" flexDirection="column" textAlign="left">
          <Typography variant="h6" color="#999">
            Balance:
          </Typography>
          <Typography variant="h4" color="primary">
            ${balance}
          </Typography>
        </Box>
        <Box display="flex" alignItems="end" gap={2} paddingTop={2}>
          <Link as={LinkRouter} to="/balance" underline="none">
            <Button variant="contained" sx={{ fontSize: { xs: 12, md: 14 } }}>
              Deposit money
            </Button>
          </Link>
          <Link as={LinkRouter} to="/users" underline="none">
            <Button variant="contained" sx={{ fontSize: { xs: 12, md: 14 } }}>
              Send money
            </Button>
          </Link>
        </Box>
      </Box>
    </Card>
  );
};
