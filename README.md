# Abyss Solutions Test to Plot Drawing Commands

e.g.:
```bash
p 200,10 250,190 160,210
c 20 100 20
r 100 50 25 25
```

### Shape Commands:
```bash
r: rectangle
et: equilateral triangle
p: polygon
c: circle
e: ellipse
```

## Bonus (Added Drawing Commands)
- Ellipse (e)
  - Similar to circle with both the x and y radiuses specified

- Equilateral Triangle (et)
  - et \<x apex> \<y apex> \<side length>
  
```bash
e cx cy rx ry
et x y length
```
  
## Built With Next.js and TypeScript


### To run:
```bash
npm install
npm run dev

# or
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

- Tested in Chrome and Firefox