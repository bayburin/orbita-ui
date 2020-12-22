const concat = (a, b) => a.concat(b);

export const oFlatMap = (f: (a: any) => any[], arr: any[]) => {
  return arr.map(f).reduce(concat, []);
};
