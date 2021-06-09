import React from "react";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type UseState<T> = [T, SetState<T>];

export type ChangeTextFiled = React.ChangeEvent<HTMLInputElement>;
export type ChangeSelect = React.ChangeEvent<{ value: unknown }>;

export type HandleChange<T> = {
  (event: T): void;
};
