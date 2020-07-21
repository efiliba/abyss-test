import { Command } from "../interfaces";
import { mapCommandToShape } from "../utils";

interface Props {
  width?: number;
  height?: number; 
  commands: Command[];
}

export const Plotter = ({ width = 250, height = 250, commands }: Props) =>
  <>
    <svg width={width} height={height}>
      {commands.map((command, index) => mapCommandToShape(command, index))}
    </svg>
  
    <style jsx>{`
      svg {
        border: solid #333 1px;
        margin-top: 2rem;
      }
    `}</style>
  </>;
