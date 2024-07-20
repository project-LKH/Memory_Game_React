export const initialStyle = {
  fontSize: "36px",
  borderRadius: "40%",
  color: "black",
  maxWidth: "60px",
  height: "60px",
  display: "grid",
  placeContent: "center",
  cursor: "pointer",
  userSelect: "none",
  margin: 0,
  padding: 0,
  justifySelf: "center",
};

export const clickedStyle = {
  ...initialStyle,
  borderRadius: "50%",
  backgroundImage: "none",
};

export const matchingStyle = {
  ...clickedStyle,
  background: "rgba(27, 72, 33, 0.75)",
  color: "white",
};

export const boardStyle = {
  display: "grid",
  gridTemplateRows: "5fr 1fr",
};

export const easyGrid = {
  display: "grid",
  gap: ".5em",
  placeContent: "center",
  gridTemplateRows: "repeat(2,1fr)",
  gridTemplateColumns: "repeat(3,1fr)",
};

export const mediumGrid = {
  ...easyGrid,
  gridTemplateRows: "repeat(3,1fr)",
  gridTemplateColumns: "repeat(4,1fr)",
};

export const hardGrid = {
  ...easyGrid,
  gridTemplateRows: "repeat(4,1fr)",
  gridTemplateColumns: "repeat(5,1fr)",
};

export const successModalStyle = (display) => ({
  display: display,
});
