import React, { useState } from "react";
import ReactDOM from "react-dom";

/**
 * Object.is （浅比较）
 *  Hook 内部使用 Object.is 来比较新/旧 state 是否相等
 *  与 class 组件中的 setState 方法不同，如果你修改状态的时候，传的状态值没有变化，则不重新渲染
 *  与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。
 *  你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果
 */

function Counter() {
  const [counter, setCounter] = useState({ name: "计数器", number: 0 });
  console.log("render Counter");
  // 如果你修改状态的时候，传的状态值没有变化，则不重新渲染
  const onClick = () => {
    setCounter({ ...counter, number: counter.number + 1 });
  }
  return (
    <>
      <p>{counter.name}:{counter.number}</p>
      <p>function render</p>
      <button
        onClick={onClick}
      >
        +
      </button> &nbsp;&nbsp;
      <button onClick={() => setCounter(counter)}>++</button>
    </>
  );
}

class ClassCounter extends React.Component {
  state = {
    number: 0,
    name: "计数器",
  };

  onClick = () => {
    let { number } = this.state;
    this.setState({
      number: number,
    });
  };

  render() {
    console.log("class render");
    return (
      <div>
        <p>class render</p>
        <button onClick={this.onClick}>+</button>
      </div>
    );
  }
}

ReactDOM.render(
  <>
    <Counter />
    <ClassCounter />
  </>,
  document.getElementById("root")
);
