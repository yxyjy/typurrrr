const StyledButton = ({
  icon = null,
  text = "",
  onClick = () => {},
  style = {},
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-6 py-1.5 bg-[rgba(227,220,209,0.11)] text-[#e7e7e7] rounded hover:bg-[rgba(74,224,224,0.5)] transition duration-200 cursor-pointer"
      style={style}
    >
      {icon &&
        (typeof icon === "string" ? (
          <img src={icon} alt="icon" className="w-5 h-5" />
        ) : (
          icon // Just render the <i> tag directly
        ))}

      {text}
    </button>
  );
};

export default StyledButton;
