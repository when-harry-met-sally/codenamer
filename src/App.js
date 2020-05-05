import React, { useState } from "react";
import axios from "axios";
import { initial } from "./data/solution";
const App = () => {
  const [solutions, setSolutions] = useState(initial.solution);
  const [wordArea, setWordArea] = useState(initial.words);
  const [avoidArea, setAvoidArea] = useState(initial.avoids);
  const [words, setWords] = useState(initial.words.split(" "));
  const [avoids, setAvoids] = useState(initial.avoids.split(" "));
  const handleTextAreaChange = e => {
    setWordArea(e.target.value);
    const split = e.target.value
      .replace(/\s+/g, " ")
      .trim()
      .split(" ");
    setWords(split);
  };
  const handleAvoidAreaChange = e => {
    setAvoidArea(e.target.value);
    const split = e.target.value
      .replace(/\s+/g, " ")
      .trim()
      .split(" ");
    setAvoids(split);
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
          <h1 className="header center-align materialize-pink">
            <span className="materialize-green">code</span>
            <span className="materialize-pink">namer</span>
          </h1>
          <p className="center">
            Codenames is a board game where a single word is used to tie
            multiple words together.
          </p>
          <p className="center">
            This application uses word association to generate clues.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col s6">
          <div className="center">
            <span className="materialize-green bold">desired</span> words
            <div className="small">required</div>
          </div>
          <textarea
            className="good-textarea"
            value={wordArea}
            onChange={e => handleTextAreaChange(e)}
          />
          <div>
            <a
              className="waves-effect waves-light btn-small right col s12 m4"
              onClick={() => handleSubmit()}
            >
              Submit
            </a>
          </div>
        </div>
        <div className="col s6">
          <div className="center">
            words to <span className="materialize-pink bold">avoid</span>
            <div className="small">optional</div>
          </div>
          <textarea
            className="bad-textarea"
            value={avoidArea}
            onChange={e => handleAvoidAreaChange(e)}
          />
          <div>
            <a
              value="clear"
              className="waves-effect waves-light btn-small left col s12 m4 pink"
              onClick={() => {
                setWordArea("");
                setWords([]);
                setAvoidArea("");
                setAvoids([]);
              }}
            >
              Clear
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s6 row">
          {words.map((w, i) => (
            <div className={"col s12 m4 circle round bold color-" + i}>{w}</div>
          ))}
        </div>
        <div className="col s6 row">
          {avoids.map((w, i) => (
            <div className={"col s12 m4 circle round bold avoid-" + i}>{w}</div>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col s12 solutions">
          {Object.entries(solutions).map(solution => (
            <div className="solution">
              <div
                className={
                  solution[1].length === 0 ? "bold empty-list" : "bold"
                }
              >
                {solution[0]}
              </div>
              {solution[1].length > 0 && (
                <div className="solution-words">
                  {solution[1].map(s => (
                    <span className="list-item">{s.item}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="center footer">
        <a target="_blank" href="https://www.github.com/miles-moran">
          <span className="materialize-green">github.com</span>{" "}
          <span className="materialize-pink">miles-moran</span>
        </a>
      </div>
    </div>
  );
};

export default App;
