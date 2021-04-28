import { useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * 每次渲染都是独立的闭包
 *  每一次渲染都有它自己的 Props 和 State
 *  每一次渲染都有它自己的事件处理函数
 *  当点击更新状态的时候，函数组件都会重新被调用，那么每次渲染都是独立的，取到的值不会受后面操作的影响
 */

function Counter() {
  const [number, setNumber] = useState(0);

  function alertNumber() {
    setTimeout(() => {
      // alert 只能获取到点击按钮时的那个状态
      console.log(number)
    }, 3000);
  }
  return (
    <>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
      <button onClick={alertNumber}>alertNumber</button>
    </>
  );
}

ReactDOM.render(<Counter />, document.getElementById("root"));