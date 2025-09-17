export const shuffleList = <T>(list: T[]) => {
  let m = list.length, t, i;

  // While there remain elements to shuffle...
  while (m) {

    // Pick a remaining element...
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = list[m];
    list[m] = list[i];
    list[i] = t;
  }

  return list;
}; 
