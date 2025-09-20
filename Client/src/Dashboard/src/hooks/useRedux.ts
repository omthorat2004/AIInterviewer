// hooks/redux.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store"; // adjust path

// Typed dispatch (knows about thunks)
export const useAppDispatch: () => AppDispatch = useDispatch;

// Typed selector (knows RootState)
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
