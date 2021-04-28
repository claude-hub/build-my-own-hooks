import React, { useState, useMemo, useCallback } from "react";
import ReactDOM from "react-dom";

/**
 * 减少渲染次数
 *  默认情况，只要父组件状态变了（不管子组件依不依赖该状态），子组件也会重新渲染
 *  一般的优化：
 *    类组件：可以使用 pureComponent；
 *    函数组件：使用 React.memo，将函数组件传递给 memo 之后，就会返回一个新的组件，
 *            新组件的功能：如果接受到的属性不变，则不重新渲染函数；
 */

function SubCounterFun({ onClick, data }) {
  console.log("SubCounter render");
  return <button onClick={onClick}>{data.number}</button>;
}

const SubCounter = React.memo(SubCounterFun);

function Counter() {
  console.log("Counter render");
  const [name, setName] = useState("计数器");
  const [number, setNumber] = useState(0);
  const data = { number };
  const addClick = () => {
    setNumber(number + 1);
  };
  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <SubCounter data={data} onClick={addClick} />
    </>
  );
}

let oldData, oldAddClick;
function Counter2() {
  console.log("Counter2 render");
  const [name, setName] = useState("计数器");
  const [number, setNumber] = useState(0);
  // 父组件更新时，这里的变量和函数每次都会重新创建，那么子组件接受到的属性每次都会认为是新的
  // 所以子组件也会随之更新，这时候可以用到 useMemo
  // 有没有后面的依赖项数组很重要，否则还是会重新渲染
  // 如果后面的依赖项数组没有值的话，即使父组件的 number 值改变了，子组件也不会去更新
  //const data = useMemo(()=>({number}),[]);
  const data = useMemo(() => ({ number }), [number]);
  console.log("data===oldData ", data === oldData);
  oldData = data;

  // 有没有后面的依赖项数组很重要，否则还是会重新渲染
  const addClick = useCallback(() => {
    setNumber(number + 1);
  }, [number]);
  console.log("addClick===oldAddClick ", addClick === oldAddClick);
  oldAddClick = addClick;
  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <SubCounter data={data} onClick={addClick} />
    </>
  );
}

ReactDOM.render(
  <>
    <Counter />
    <Counter2 />
  </>,
  document.getElementById("root")
);
