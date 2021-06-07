import React from "react";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type UseState<T> = [T, SetState<T>];
export type ChangeTextFiled = {
  (event: React.ChangeEvent<HTMLInputElement>): void;
};
export type ChangeSelect = {
  (event: React.ChangeEvent<{ value: unknown }>): void;
};
