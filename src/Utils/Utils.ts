export default class Utils {
  static mergeClasses = (
    ...classNames: (string | undefined | Record<string, boolean | undefined>)[]
  ): string => {
    return classNames
      .map((value) => {
        if (typeof value !== 'string' && value !== undefined) {
          const v: Record<string, boolean | undefined> = value;
          const s = Object.entries(v)
            .filter((e) => e[1])
            .map((e) => e[0])
            .join(' ');
          return s.trim() === '' ? undefined : s.trim();
        } else {
          return value;
        }
      })
      .filter((value) => !!value)
      .join(' ');
  };
}
