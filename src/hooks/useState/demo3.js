import { useState } from "react";
import ReactDOM from "react-dom";

/**
 * 惰性初始化 state
 * initialState 参数只会在组件的初始化渲染中起作用，后续渲染时会被忽略
 * 如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用
 */

function Counter(props) {
  // 这个函数只在初始渲染时执行一次，后续更新状态重新渲染组件时，该函数就不会再被调用
  function getInitState() {
    console.log("Counter render");
    return { number: props.number };
  }
  const [counter, setCounter] = useState(getInitState);
  return (
    <>
      <p>{counter.number}</p>
      <button onClick={() => setCounter({ number: counter.number + 1 })}>
        +
      </button>
    </>
  );
}

ReactDOM.render(<Counter number={1} />, document.getElementById("root"));
