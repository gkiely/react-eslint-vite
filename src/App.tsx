import { useCallback, useEffect, useRef } from 'react';
import './App.css';


const useCustomEffect = (cb: () => void) => {
  useEffect(() => {
    cb();
  }, [cb]);
};

const useMyOtherHook = () => {
  const ref = useRef(1);
  const cb = useCallback(() => {
    ref.current = 2;
  }, []);

  // .current is being set in a callback but still shows error
  useCustomEffect(cb);
}

const useMyHook = (ref: React.RefObject<number>) => {
  useEffect(() => {
    console.log(ref.current);
  }, [ref]);
};



function App() {
  const ref = useRef(0);

  // .current is being accessed in an effect, but still shows error
  useMyHook(ref);

  useMyOtherHook();


  return (
    <>
      <div />
    </>
  )
}

export default App
