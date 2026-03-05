import { lazy, Suspense, useEffect, useRef } from 'react';
import { WifiHigh, BatteryHigh } from '@phosphor-icons/react';
import { BookingProvider, useBooking } from './context/BookingContext.jsx';
import './main.css';

import Screen1 from './screens/Screen1.jsx';

const Screen2 = lazy(() => import('./screens/Screen2.jsx'));
const Screen3 = lazy(() => import('./screens/Screen3.jsx'));
const Screen5 = lazy(() => import('./screens/Screen5.jsx'));
const Screen6 = lazy(() => import('./screens/Screen6.jsx'));

const SCREENS = {
  1: Screen1,
  2: Screen2,
  3: Screen3,
  5: Screen5,
  6: Screen6,
};

const STATUS_BAR_STYLE = { color: 'white' };

function AppContent() {
  const { currentScreen, showDemoHint, hideHint } = useBooking();
  const Screen = SCREENS[currentScreen] || Screen1;
  const screenRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(hideHint, 4000);
    return () => clearTimeout(t);
  }, [hideHint]);

  useEffect(() => {
    const el = screenRef.current?.querySelector('.screen.active');
    if (el) el.scrollTop = 0;
  }, [currentScreen]);

  const demoHintStyle = showDemoHint
    ? { opacity: 0.9, pointerEvents: 'auto' }
    : { opacity: 0, pointerEvents: 'none' };

  return (
    <>
      <div className="phone-frame" ref={screenRef}>
        <div className="status-bar">
          <span>9:41</span>
          <span className="flex items-center gap-1" style={STATUS_BAR_STYLE}><WifiHigh size={14} weight="regular" /><BatteryHigh size={14} weight="regular" /></span>
        </div>
        <Suspense fallback={<div className="screen active" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>Loading…</div>}>
          <Screen />
        </Suspense>
      </div>
      <div className="desktop-mobile-only" aria-hidden="true">
        <p>This app is for mobile only</p>
        <span>Please open on your smartphone for the best experience.</span>
      </div>
      <div className="demo-hint" style={demoHintStyle}>
        Select space, tap a warehouse, or use buttons to navigate
      </div>
    </>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
