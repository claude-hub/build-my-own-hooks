import ReactDOM from "react-dom";

let memoizedState = []; // hooks 存放在这个数组
let cursor = 0; // 当前 memoizedState 下标

function useState(initialValue) {
  memoizedState[cursor] = memoizedState[cursor] || initialValue;
  const currentCursor = cursor;
  function setState(newState) {
    memoizedState[currentCursor] = newState;
    render();
  }
  return [memoizedState[cursor++], setState]; // 返回当前 state，并把 cursor 加 1
}

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray;
  const deps = memoizedState[cursor];
  const hasChangedDeps = deps
    ? !depArray.every((el, i) => el === deps[i])
    : true;
  if (hasNoDeps || hasChangedDeps) {
    callback();
    memoizedState[cursor] = depArray;
  }
  cursor++;
}

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("hello");
  useEffect(() => {
    console.log(count);
  }, [count]);
  useEffect(() => {
    console.log(username);
  }, [username]);
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
      <div>{username}</div>
      <button
        onClick={() => {
          setUsername(username + " world");
        }}
      >
        点击
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");

function render() {
  cursor = 0;
  ReactDOM.render(<App />, rootElement);
}
render();


// Q：为什么只能在函数最外层调用 Hook？为什么不要在循环、条件判断或者子函数中调用。
// A：memoizedState 数组是按 hook定义的顺序来放置数据的，如果 hook 顺序变化，memoizedState 并不会感知到。

// Q：自定义的 Hook 是如何影响使用它的函数组件的？
// A：共享同一个 memoizedState，共享同一个顺序。

// Q：“Capture Value” 特性是如何产生的？
// A：每一次 ReRender 的时候，都是重新去执行函数组件了，对于之前已经执行过的函数组件，并不会做任何操作。