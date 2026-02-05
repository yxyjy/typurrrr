import paperbg from "../assets/images/paper.jpg";
import StyledButton from "./StyledButton";
import restarticon from "../assets/images/restart.png";

const ResultCard = ({ mistakes, wpm, accuracy, resetGame }) => {
  // let restarticon = (
  //   <FontAwesomeIcon icon={byPrefixAndName.fal["arrow-rotate-right"]} />
  // );

  return (
    <div className="w-2/3 bg-[rgba(227,220,209,0.11)] px-6 py-3 rounded-lg mx-auto my-0 flex flex-row justify-between items-center position-absolute">
      <p className="text-teal-500">Mistakes: {mistakes}</p>
      <p className="text-teal-500">WPM: {wpm}</p>
      <p className="text-teal-500">Accuracy: {accuracy}%</p>
      {/* <button
        className="px-6 py-1.5 bg-teal-200 text-[#242424] rounded hover:bg-teal-600 transition-colors duration-200 cursor-pointer"
        onClick={resetGame}
      >
        Restart Test
      </button> */}

      <StyledButton
        //icon={restarticon}
        icon={restarticon}
        text="Restart Test"
        onClick={resetGame}
      />
    </div>
  );
};

export default ResultCard;
