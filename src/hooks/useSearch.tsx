import { useMemo, useState } from "react";

export const useSearch = <T,>(
  arr: Array<T>,
  field: keyof T | Array<keyof T>
) => {
  const [search, setSearch] = useState<any>("");

  const searchResult = useMemo(() => {
    if (!search) return arr;
    const compare = (val: T, field: keyof T) =>
      String(val[field]).toLowerCase().includes(search?.toLowerCase());
    const filteredArray = arr.filter((val) =>
      Array.isArray(field)
        ? field.some((item) => compare(val, item))
        : compare(val, field)
    );
    return filteredArray;
  }, [arr, search]);

  const isNotFound = useMemo(() => {
    return searchResult.length === 0 && Boolean(search);
  }, [searchResult, search]);

  const isEmpty = useMemo(() => {
    return searchResult.length === 0 && !search;
  }, [searchResult, search]);

  return { search, setSearch, searchResult, isNotFound, isEmpty };
};
