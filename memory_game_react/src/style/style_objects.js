export const initialStyle = {
  placeSelf: "center",
  minHeight: "1em",
  minWidth: "1em",
  maxHeight: "2em",
  maxWidth: "2em",
  height: "1.8em",
  width: "1.8em",
  fontSize: "45px",
  color: "white",
  // margin: "5px",
  display: "grid",
  placeContent: "center",
  borderRadius: "50%",
  WebkitTapHighlightColor: "transparent",
  background: "rgba(31, 78, 107, 0.2)",
  backdropFilter: "blur(3px)",
  border: "1px solid rgba(31, 78, 107, 1)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  userSelect: "none",
};

export const clickedStyle = {
  ...initialStyle,
  boxShadow: "inset 21px 21px 51px #183e55,inset -21px -21px 51px #265e81",
  cursor: "auto",
};

export const matchingStyle = {
  ...clickedStyle,
  background: "rgba(27, 72, 33, 0.75)",
  boxShadow: "inset 20px 20px 60px #2bd98e,inset -20px -20px 60px #3bffc0",
};

export const boardStyle = {
  // placeSelf: "center",
  height: "70vh",
  // width: "80%",
  margin:"0em 3em 0em 3em",
  display: "grid",
  gridTemplateRows: "1fr 1fr 1fr 1fr 1fr",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  placeContent: "center",
  // gridGap: "8px 5px",
  // backgroundColor:"green"
};

export const successModalStyle = (display) => ({
  display: display,
  position: "absolute",
  top: "55%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "1.4em",
  backgroundColor: "teal",
  color: "white",
  gridRow: 4,
  gridColumn: "1/-1",
  textAlign: "center",
});

export const restartButtonStyle = {
  fontFamily: "'Jersey 10', sans-serif",
  fontSize: "30px",
  padding: "5px 0px 5px 0px",
  color: "white",
  gridRow: 4,
  height: "55%",
  gridColumn: "1/-1",
  alignSelf: "center",
  justifySelf: "center",
  width: "50%",
};

export const gameTitleStyle = {
  width: "100%",
  textAlign: "center",
  color: "teal",
  userSelect: "none",
};
