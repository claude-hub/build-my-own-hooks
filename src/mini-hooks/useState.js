import ReactDOM from "react-dom";

function Counter() {
  var [count, setCount] = useState(0);

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

// function useState(initialValue) {
//   let state = initialValue;
//   function setState(newState) {
//     state = newState;
//     render();
//   }
//   return [state, setState];
// }

let _state; // 把 state 存储在外面

function useState(initialValue) {
  _state = _state || initialValue; // 如果没有 _state，说明是第一次执行，把 initialValue 复制给它
  function setState(newState) {
    _state = newState;
    render();
  }
  return [_state, setState];
}

const rootElement = document.getElementById("root");

function render() {
  ReactDOM.render(<Counter />, rootElement);
}
render();
