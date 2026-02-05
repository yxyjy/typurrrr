const StatBox = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl font-bold text-teal-900">{value}</span>
    <span className="text-sm text-teal-700">{label}</span>
  </div>
);

const ResultPage = ({ mistakes, wpm, accuracy, resetGame }) => {
  return (
    <div className="w-2/3 h-40 bg-amber-50 p-10 rounded-lg mx-auto my-auto flex">
      <h1> What a Typurrrr.... (meow)</h1>
      <h2>Your Stats</h2>
      <p className="text-teal-900">Mistakes: {mistakes}</p>
    </div>
  );
};

export default ResultPage;
