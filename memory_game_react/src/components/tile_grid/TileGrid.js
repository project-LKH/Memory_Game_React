import { Tile } from "../tile/Tile";

export default function TileGrid(
  matched,
  current,
  setSuccess,
  setToggleRestartButton
) {
  const chars = ["A", "B", "C", "D", "E", "F"];
  return chars
    .map((char, index) => [
      <Tile
        key={char + index}
        char={char}
        index={index}
        testId={0 + char}
        current={current}
        matched={matched}
        setSuccess={setSuccess}
        setToggleRestartButton={setToggleRestartButton}
      />,
      <Tile
        key={char + (index + 1)}
        char={char}
        index={index}
        testId={1 + char}
        current={current}
        setSuccess={setSuccess}
        matched={matched}
        setToggleRestartButton={setToggleRestartButton}
      />,
    ])
    .flat()
    .sort(() => Math.random() - 0.5);
}
