import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { WAREHOUSES, calcTotal } from '../lib/constants.js';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [state, setState] = useReducer(bookingReducer, {
    currentScreen: 1,
    selectedSqm: 40,
    selectedPreset: 40,
    selectedWarehouseId: 1,
    selectedDate: null,
    selectedDuration: null,
    showDemoHint: true,
    invoiceNum: '#PI-2026-00847',
  });

  const selectedWarehouse = WAREHOUSES[state.selectedWarehouseId] ?? WAREHOUSES[1];
  const priceBreakdown = useMemo(
    () => (state.selectedDuration && selectedWarehouse
      ? calcTotal(selectedWarehouse.price, state.selectedSqm, state.selectedDuration)
      : null),
    [state.selectedDuration, state.selectedSqm, selectedWarehouse]
  );

  const goTo = useCallback((n) => setState({ type: 'GO_TO', screen: n }), []);
  const setPreset = useCallback((v) => setState({ type: 'SET_PRESET', value: v }), []);
  const setSqm = useCallback((v) => setState({ type: 'SET_SQM', value: v }), []);
  const setWarehouse = useCallback((id) => setState({ type: 'SET_WAREHOUSE', id }), []);
  const setDate = useCallback((d) => setState({ type: 'SET_DATE', date: d }), []);
  const setDuration = useCallback((m) => setState({ type: 'SET_DURATION', months: m }), []);
  const hideHint = useCallback(() => setState({ type: 'HIDE_HINT' }), []);
  const confirmBooking = useCallback(() => setState({ type: 'CONFIRM_BOOKING' }), []);

  const value = useMemo(
    () => ({
      ...state,
      setState,
      selectedWarehouse,
      priceBreakdown,
      goTo,
      setPreset,
      setSqm,
      setWarehouse,
      setDate,
      setDuration,
      hideHint,
      confirmBooking,
    }),
    [state, selectedWarehouse, priceBreakdown, goTo, setPreset, setSqm, setWarehouse, setDate, setDuration, hideHint, confirmBooking]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

function bookingReducer(state, action) {
  switch (action.type) {
    case 'GO_TO':
      return { ...state, currentScreen: action.screen };
    case 'SET_PRESET':
      return { ...state, selectedSqm: action.value, selectedPreset: action.value };
    case 'SET_SQM': {
      const current = Number(state.selectedSqm) || 40;
      const v = typeof action.value === 'function' ? action.value(current) : action.value;
      const num = Math.max(1, Math.min(2000, Number(v) || current));
      return { ...state, selectedSqm: num, selectedPreset: num };
    }
    case 'SET_WAREHOUSE':
      return { ...state, selectedWarehouseId: action.id };
    case 'SET_DATE':
      return { ...state, selectedDate: action.date };
    case 'SET_DURATION':
      return { ...state, selectedDuration: action.months };
    case 'HIDE_HINT':
      return { ...state, showDemoHint: false };
    case 'CONFIRM_BOOKING':
      return {
        ...state,
        invoiceNum: '#PI-2026-0' + Math.floor(Math.random() * 9000 + 1000),
        currentScreen: 6,
      };
    default:
      return state;
  }
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
