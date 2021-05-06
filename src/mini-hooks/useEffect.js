/**
 * 有两个参数 callback 和 dependencies 数组
 * 如果 dependencies 不存在，那么 callback 每次 render 都会执行
 * 如果 dependencies 存在，只有当它发生了变化， callback 才会执行
 */

import ReactDOM from "react-dom";

let _state, _deps; // 把 state 存储在外面

function useState(initialValue) {
  _state = _state | initialValue; // 如果没有 _state，说明是第一次执行，把 initialValue 复制给它
  function setState(newState) {
    _state = newState;
    render();
  }
  return [_state, setState];
}

function useEffect(callback, depArray) {
  // 如果 dependencies 不存在
  const hasNoDeps = !depArray;
  const hasChangedDeps = _deps
    ? !depArray.every((el, i) => el === _deps[i]) // 两次的 dependencies 是否完全相等
    : true;
  /* 如果 dependencies 不存在，或者 dependencies 有变化*/
  if (hasNoDeps || hasChangedDeps) {
    callback();
    _deps = depArray;
  }
}

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(count);
  }, [count]);
  return (
    <div>
      <div>{count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        点击
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");

function render() {
  ReactDOM.render(<App />, rootElement);
}
render();


// Q：为什么第二个参数是空数组，相当于 componentDidMount ？
// A：因为依赖一直不变化，callback 不会二次执行。