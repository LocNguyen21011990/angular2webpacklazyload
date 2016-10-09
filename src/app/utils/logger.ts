export const log = (...args) => {
  const [title, ...rest] = args;

  if (typeof console.group === 'function') {
    console.group(title);
  } else {
    console.log('%ctitle', 'color: blue');
  }
  console.log.apply(console, rest);
  if (typeof console.groupEnd === 'function') {
    console.groupEnd();
  }
};
