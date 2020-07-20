import { useState } from 'react';
import { CommandsAndErrors } from "../interfaces";
import { Errors, Plotter } from "../components";
import { mapInputToCommandsAndErrors } from "../utils";

// p 200,10 250,190 160,210
// c 20 100 x 20
// r 100 50 25 25

const IndexPage = () => {
  const [input, setInput] = useState<string>();
  const [{ commands, errors }, setCommandsAndErrors] = useState<CommandsAndErrors>({
    commands: [],
    errors: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInput(value);
    setCommandsAndErrors(mapInputToCommandsAndErrors(value));
  };

  return (
    <div>
      <h1>Abyss Solutions Plotter</h1>
      <textarea
        rows={5}
        cols={40} 
        value={input}
        onChange={handleInputChange}
        aria-label="Plotter commands"
      />

      <Plotter commands={commands} />
      <Errors errors={errors} />
    </div>
  );
};

export default IndexPage;
