/** Libraries */
import React from "react";

import { Box, Link, Paper } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

/** Components */
import Title from "./Title";

/** Utils */
import { colors } from "../../utils/colors";

/** Styles */
import "./utils.css";

const Footer = () => {

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <footer data-testid="footer">
      <Paper elevation={5} className="footer">
        <Box
          textAlign="center"
          style={{
            fontFamily: "monospace",
            fontSize: 25,
            letterSpacing: 2,
            fontWeight: 500,
            padding: "50px",
            marginBottom: (sm) && '30px',
          }}
        >
          <Link
            href="https://github.com/SkillUp-Grupo5/SKU-5"
            color="inherit"
            underline="none"
            target="_blank"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Title
                text="AlkemyBank"
                font="h5"
                color={colors.blue}
                weight={700}
              />
              &reg;
              <Title text={`${new Date().getFullYear()}`} font="h6" />
            </div>
          </Link>
        </Box>
      </Paper>
    </footer>
  );
};

export default Footer;
