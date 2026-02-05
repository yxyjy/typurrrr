import { useState, useEffect, useRef, use } from "react";
import "./App.css";
import ResultCard from "./components/ResultCard";
import StyledButton from "./components/StyledButton";
import logo from "./assets/images/logo.png";
import logo2 from "./assets/images/logo2.png";
import logotype from "./assets/images/logotype.png";
import logosleep from "./assets/images/logosleep.png";
import shuffle from "./assets/images/shuffle.png";
import grunt from "./assets/audio/grunt2.mp3";
import purr from "./assets/audio/purr2.mp3";

const target_texts = [
  "There was already a small queue for the tap in the corner of the field. Harry, Ron, and Hermione joined it, right behind a pair of men who were having a heated argument. One of them was a very old wizard who was wearing a long flowery nightgown. The other was clearly a Ministry wizard; he was holding out a pair of pinstriped trousers and almost crying with exasperation",
  "Pimento goes undercover in a Honduran drug gang, but gets deported. Jake and Rosa are on a mission to save him while Holt, Amy and Terry investigate a lead into a related people smuggling ring in the tunnels under NYC. Boyle and Gina go to therapy or something.",
  "Was very early on in the season when Yuki was still in VCARB, he suggested a strategy on the radio, was told we don't want to do that and so corrected himself to I want to. ",
];

const randomTargetText = () => {
  return target_texts[Math.floor(Math.random() * target_texts.length)];
};

const target_text = randomTargetText();

const App = () => {
  const test_duration = 60;

  const [targetText, setTargetText] = useState(target_text);
  const [timeLeft, setTimeLeft] = useState(test_duration);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [correctWrong, setCorrectWrong] = useState([]);

  const inputRef = useRef();
  const allChars = useRef([]);
  const purrRef = useRef(new Audio(purr));
  const gruntRef = useRef(new Audio(grunt));

  // select random text from target_texts

  useEffect(() => {
    inputRef.current.focus();
    setTargetText(randomTargetText());
    setCorrectWrong(Array(targetText.length).fill(""));
  }, []);

  useEffect(() => {
    let interval;
    if (isTyping && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        let correctChars = charIndex - mistakes;
        let totalTime = test_duration - timeLeft;

        let wpm = Math.round((correctChars / 5 / totalTime) * 60);
        setWpm(wpm);

        let accuracy = Math.round((correctChars / charIndex) * 100);
        setAccuracy(accuracy);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsTyping(false);
    }
    return () => clearInterval(interval);
  }, [isTyping, timeLeft]);

  useEffect(() => {
    // set test ended
  }, [timeLeft]);

  const handleChange = (e) => {
    const characters = allChars.current;
    const typedValue = e.target.value;

    if (!isTyping && timeLeft > 0) {
      setIsTyping(true);
      purrRef.current.play();
    }

    // first check backspace
    if (typedValue.length < charIndex) {
      const newIndex = charIndex - 1;
      setCharIndex(newIndex); //(moving the cursor backwards here)

      setLogoSrc(logotype);

      //reset the styling
      setCorrectWrong((prev) => {
        const newState = [...prev];
        newState[newIndex] = "";
        return newState;
      });
    }

    //check typing
    else {
      const typedChar = typedValue.slice(-1);

      const isCharCorrect = typedChar === targetText[charIndex];

      if (!isCharCorrect) {
        setMistakes(mistakes + 1);
        gruntRef.current.play();
        purrRef.current.pause();
        setLogoSrc(logo2);
      } else {
        setLogoSrc(logotype);
        purrRef.current.play();
      }

      setCorrectWrong((prev) => {
        const newState = [...prev];
        newState[charIndex] = isCharCorrect ? "correct-char" : "wrong-char";
        return newState;
      });

      setCharIndex(charIndex + 1);

      if (charIndex === characters.length - 1) {
        setIsTyping(false);
      }
    }
  };

  const resetGame = () => {
    setTimeLeft(test_duration);
    setMistakes(0);
    setWpm(0);
    setAccuracy(100);
    setCharIndex(0);
    setIsTyping(false);
    setTestEnded(false);
    setCorrectWrong(Array(target_text.length).fill(""));
    inputRef.current.value = "";
    inputRef.current.focus();
    // target_text = randomTargetText();
    // setCorrectWrong(Array(target_text.length).fill(""));
  };

  // let shuffleIcon = <FontAwesomeIcon icon={byPrefixAndName.fas["shuffle"]} />;

  const [logoSrc, setLogoSrc] = useState(logo);

  useEffect(() => {
    if (isTyping) {
      setLogoSrc(logotype);
      return;
    }
    setLogoSrc(logotype);
  }, [isTyping]);

  return (
    <div className="container">
      {/* <StyledButton icon={shuffleIcon} text="Typurrrr Logo" /> */}
      <StyledButton
        icon={shuffle}
        text="shuffle"
        onClick={() => {
          setTargetText(randomTargetText());
          resetGame();
        }}
        style={{ position: "absolute", top: "100px", right: "200px" }}
      />
      <img
        src={logoSrc}
        className="w-50 h-auto m-auto -mb-2"
        // onMouseEnter={() => setLogoSrc(logo2)}
        // onMouseLeave={() => setLogoSrc(logo)}
        alt="Typurrrr Logo"
      />
      <h2 className="-mt-6 text-5xl font-bold text-teal-500">
        heeeloooo typurrrsss
      </h2>
      {/* <h3 className="text-teal-500">type type type typeeee don't stop!</h3> */}

      <h3 className="text-teal-100 mt-5">{timeLeft}</h3>

      <div className="py-4 mx-auto my-5 w-2xl">
        <p className="text-lg text-gray-500">
          <input
            type="text"
            className="input-field"
            ref={inputRef}
            onChange={handleChange}
          />
          {targetText.split("").map((char, index) => (
            <span
              className={`char ${index === charIndex ? "active" : ""} ${correctWrong[index]}`}
              ref={(e) => (allChars.current[index] = { char })}
            >
              {char}
            </span>
          ))}
        </p>
      </div>
      <ResultCard
        mistakes={mistakes}
        wpm={wpm}
        accuracy={accuracy}
        resetGame={resetGame}
      />
    </div>
  );
};

export default App;
