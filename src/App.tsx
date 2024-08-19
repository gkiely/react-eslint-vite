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

  // .current not being set in render but still shows error
  useCustomEffect(cb);
}

const useMyHook = (ref: React.RefObject<number>) => {
  useEffect(() => {
    console.log(ref.current);
  }, [ref]);
};



function App() {
  const ref = useRef(0);

  // .current not accessed in render but still shows error
  useMyHook(ref);


  useMyOtherHook();


  return (
    <>
      <div />
    </>
  )
}

export default App
