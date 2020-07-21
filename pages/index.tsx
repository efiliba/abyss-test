import { useState } from 'react';
import Head from 'next/head';

import { CommandsAndErrors } from "../interfaces";
import { Errors, Plotter } from "../components";
import { mapInputToCommandsAndErrors } from "../utils";

const App = () => {
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
      <Head>
        <title>Abyss Solutions Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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

      <style jsx>{`
        :global(html) { 
          font-size: 62.5%;
        }

        :global(body) {
          margin: 2rem;
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 1.6rem;
        }

        textarea {
          display: block;
          width: 100%;
          max-width: 50rem;
          background-color: #333;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default App;
