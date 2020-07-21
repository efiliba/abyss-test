import { Shape, Data, Command, CommandsAndErrors } from "../interfaces";

const validShapes = ["r", "p", "et", "c", "e"];
const numericRegex = new RegExp(/^\d+$/);

const isShapeValidate = (shape: string): boolean =>
  validShapes.includes(shape);    

const isDataNumeric = (data: string[]): boolean => {
  let isNumeric = true;
  let index = 0;

  while (isNumeric && index < data.length) {
    isNumeric = numericRegex.test(data[index++]);
  }

  return isNumeric;
};

const validateNumericData = (shape: Shape, data: Data, line: number): boolean | string => {
  switch (shape) {
    case "r": return data.length !== 4 && `Expected 4 co-ordinates in line ${line} e.g. 'r 0 0 100 100'`;
    case "et": return data.length !== 3 && `Expected 3 co-ordinates in line ${line} e.g. 'et 100 100 200'`;
    case "p": return (data.length < 6 || data.length % 2 === 1) &&
      `Expected at least 3 co-ordinate pairs in line ${line} e.g. 'p 200,10 250,190 160,210'`;
    case "c": return data.length !== 3 && `Expected 3 co-ordinates in line ${line} e.g. 'c 100 100 20'`;
    case "e": return data.length !== 4 && `Expected 4 co-ordinates in line ${line} e.g. 'e 100 100 50 80'`;
  }
};

const extractCommandOrError = (row: string, line: number): string | Command => {
  const [shape, ...data] = row.split(/[ ,]/).filter(Boolean);

  const normaliseShape = shape.toLocaleLowerCase();
  let numericData: Data = [];
  let error: string | boolean = false;

  if (!isShapeValidate(normaliseShape)) {
    error = `Invalid command '${shape}' in line ${line} should be one of: ${validShapes.join(", ")}`;
  } else if (!isDataNumeric(data)) {
    error = `Error in line ${line}. Co-ordinates must be numeric.`;
  } else {
    numericData = data.map(number => parseInt(number, 10));
    error = validateNumericData(normaliseShape as Shape, numericData, line);
  }
  
  if (error) {
    return error as string;
  } else {
    return { shape: normaliseShape as Shape, data: numericData };
  }
};

export const mapInputToCommandsAndErrors = (input: string): CommandsAndErrors =>
  input
    .split("\n")
    .reduce<CommandsAndErrors>(({ errors, commands }, row, index) => {
      if (row.length > 0) {
        const commandOrError = extractCommandOrError(row, index + 1);
        if (typeof commandOrError === "string") {
          errors.push(commandOrError);
        } else {
          commands.push(commandOrError);
        }
      }
      
      return { errors, commands };
    }, { errors: [], commands: [] });
