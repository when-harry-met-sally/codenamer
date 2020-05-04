import React, { useState } from "react";
import axios from "axios";
import { initial } from "./data/solution";
const App = () => {
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
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h1 className="header center-align materialize-pink">codenamer</h1>
          <p>
            Codenames is a board game where a single clue/word is used to tie
            multiple words together.
          </p>
          <p>This application uses word association to generate codenames.</p>
        </div>
      </div>
      <div className="row">
        <div className="col s6">
          <textarea value={textArea} onChange={e => handleTextAreaChange(e)} />
          <div>
            <a
              value="clear"
              className="waves-effect waves-light btn-small left"
              onClick={() => {
                setTextArea("");
                setWords([]);
              }}
            >
              Clear
            </a>
            <a
              className="waves-effect waves-light btn-small right"
              onClick={() => handleSubmit()}
            >
              Submit
            </a>
          </div>
        </div>

        <div className="col s6">
          {words.map((w, i) => (
            <div>
              <span className={"bold color-" + i}>{i + 1}) </span>
              {w}
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col s12 solutions">
          {Object.entries(solutions).map(solution => (
            <div className='solution'>
              <div
                className={
                  solution[1].length === 0 ? "bold empty-list" : "bold"
                }
              >
                {solution[0]}
              </div>
              {solution[1].length > 0 && <div className="solution-words">
              {solution[1].map(s => (
                <span className='list-item'>{s.item}</span>
              ))}
              </div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
