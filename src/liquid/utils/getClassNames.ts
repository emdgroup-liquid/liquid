/**
 * Generates a class names string from an array.
 *
 * TODO: memoized functions possible?
 */
export const getClassNames = (classNames: (string | false | 0)[]) =>
  classNames.filter((className) => className).join(' ')
