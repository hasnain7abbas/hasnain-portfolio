# Third-party notices

## Paperwren

The roaming behaviour of the cat on this site is adapted from the wren in
[Paperwren](https://github.com/Razee4315/Paperwren), an open-source document
viewer:

- `lib/cat.ts` from `website/src/scripts/wren.ts`: the layer that scrolls
  with the page, perch finding (rules, frames, buttons and letter tops), the
  weighted choice of where to land, following the reader, and reacting to the
  pointer. The leaping, tunnelling, superposition and box behaviour are new.
- `components/Cat.tsx` from `website/src/components/FlyingWren.astro`: the
  structure of the scrolling layer. The cat and box artwork are original.
- the `.cat-sky` and `.flyer` layout rules in `app/globals.css`

Used under the MIT License:

```
MIT License

Copyright (c) 2026 Paperwren contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
