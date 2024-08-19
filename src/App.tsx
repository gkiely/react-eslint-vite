import { useCallback, useEffect, useImperativeHandle, useRef } from 'react';
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

  const inputRef = useRef(null);


  return (
    <>
      <MyInput ref={inputRef} />
    </>
  )
}

// Docs example: https://19.react.dev/reference/react/useImperativeHandle
const MyInput = function MyInput({ ref, ...props }: { props: unknown, ref: React.RefObject<HTMLInputElement> }) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
};

export default App
