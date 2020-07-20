import { PolygonShape, Command, Data } from "../interfaces";

interface EllipseAttributes {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

const rectangleToPolygon = ([x, y, width, height]: Data): string => {
  const x1 = x + width;
  const y1 = y + height;

  return [x, y, x1, y, x1, y1, x, y1].join();
};

const equilateralTriangleToPolygon = ([x, y, length]: Data): string => {
  const delta = Math.sqrt(length ** 2 / 2);
  const dx = (delta / 2) >> 0;
  const dy = (y + delta) >> 0;

  return [x, y, x + dx, dy, x - dx, dy].join();
};

const calcPolygonPoints = (shape: PolygonShape, data: Data): string => {
  switch (shape) {
    case "r": return rectangleToPolygon(data);
    case "et": return equilateralTriangleToPolygon(data);
    case "p": return data.join();
  }
};

const calcEllipseAttributes = (data: Data): EllipseAttributes => ({
  cx: data[0],
  cy: data[1],
  rx: data[2],
  ry: data[3] || data[2]
});

const randomColor = (): string => {
  const randomColorValue = () => Math.random() * 256 >> 0;  // 0..255

  return `rgb(${randomColorValue()}, ${randomColorValue()}, ${randomColorValue()})`;
};

export const mapCommandToShape = (
  { shape, data }: Command,
  key: number | string,
  color = randomColor()
) => {
  switch (shape) {
    case "r":   // rectangle
    case "et":  // equilateral triangle
    case "p":   // polygon
      return <polygon key={key} fill={color} points={calcPolygonPoints(shape, data)} />;
    case "c":   // circle
    case "e":   // ellipse
      return <ellipse key={key} fill={color} {...calcEllipseAttributes(data)} />;
  }
};
