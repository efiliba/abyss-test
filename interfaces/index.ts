export type PolygonShape =
  "r" |       // rectangle
  "p" |       // polygon
  "et";       // equilateral triangle

export type EllipseShape =
  "c" |       // circle
  "e";        // ellipse

export type Shape = PolygonShape | EllipseShape;

export type Data = number[];

export interface Command {
  shape: Shape;
  data: Data; 
}

export interface CommandsAndErrors {
  commands: Command[];
  errors: string[];
}
