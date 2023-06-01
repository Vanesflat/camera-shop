import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { State } from '../../types/store';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
