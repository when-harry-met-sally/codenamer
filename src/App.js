import React, { useState } from "react";
import axios from "axios";
import { initial } from './data/solution'
function App() {
  const [solutions, setSolutions] = useState(initial.solution);
  const [textArea, setTextArea] = useState(initial.words);
  const [words, setWords] = useState(initial.words.split(" "));
  const handleTextAreaChange = e => {
    setTextArea(e.target.value);
    const split = e.target.value
      .replace(/\s+/g, " ")
      .trim()
      .split(" ");
    setWords(split);
  };
  const handleSubmit = () => {
    axios
      .post("https://codenamer.herokuapp.com/api", {
        words: words
      })
      .then(res => setSolutions(res.data));
  };
  return (
    <div className="flex">
      <div>
        <div className="flex">
          <h1>codenamer</h1>
        </div>
        <div>
          Selected words go into the text area below. Words are distuingished by spacing. 
          <div className="flex">
          <div className='item downward-arrow center'>&#8595;</div> 
          <div className='item'>A list of associated words shared by </div>
          </div>
        </div>
        <div className="flex">
          <div className="item margin-1rem">
            <textarea
              value={textArea}
              onChange={e => handleTextAreaChange(e)}
            />
            <div className="buttons">
              <input
                className="item"
                type="button"
                value="clear"
                onClick={() => setTextArea("")}
              />
              <input
                className="item float-right"
                type="button"
                value="submit"
                onClick={() => handleSubmit()}
              />
            </div>
          </div>
          <div className="item margin-1rem">
            {textArea === "" ? (
              <div className="loading"></div>
            ) : (
              words.map((w, i) => (
                <div className="word-list">
                  <span className="bold">{i + 1})</span> {w}
                </div>
              ))
            )}
          </div>
        </div>
        <div>
          {Object.entries(solutions).map(solution => (
            <div>
              <div
                className={
                  solution[1].length === 0 ? "grouping empty-list" : "grouping"
                }
              >
                {solution[0]}
              </div>
              {solution[1].map(s => (
                <div>
                  {s.item}
                </div>
              ))}
            </div>
          ))}
        </div>{" "}
      </div>
    </div>
  );
}

export default App;
