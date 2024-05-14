import "./style/App.css";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Board from "./components/board/Board";
import { gameTitleStyle } from "./style/style_objects";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container id="container" maxWidth="md" sx={{ paddingTop: "5vh" }}>
        <Box
          sx={{
            height: "90vh",
            overflow: "hidden",
            zIndex: 5,
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(3px)",
          }}
        >
          <h1 style={gameTitleStyle} data-testid="title">
            Memory Game
          </h1>
          <Board />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
