
export function getPosition(index) {
   const width = 100 / 13;
   const height = 100 / 4;
   const row = Math.floor(index / 13);
   const column = index - (row * 13);
   const top = row * height;
   const left = column * width;
   return { top: top + '%', left: left + '%' };
}