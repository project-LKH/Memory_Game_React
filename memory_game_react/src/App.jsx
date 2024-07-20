import React from "react";
import "./style/App.css";
import Board from "./components/board/Board";
import Timer from "./components/timer/Timer";
import DifficultySelector from "./components/difficulty_selector/DifficultySelector";
import { Box, Container, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";

function App() {
  const count = useSelector((state) => state.tileReducer.flipCount);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container id="container" maxWidth="md" sx={{ paddingTop: "5vh" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            placeContent: "center",
          }}
        >
          <h1 id="title" data-testid="title">
            Memory Game
          </h1>
          <div id="main-content">
            <div id="feature-container">
              <DifficultySelector />
              <Timer />
              <p data-testid="flip-count" className="center-content">
                flips: {count}
              </p>
            </div>
            <Board />
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
}
export default App;
