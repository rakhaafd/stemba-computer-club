interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        bg-[#EFEEEA]
        text-[#161616]
        px-5
        py-2.5
        rounded-lg
        font-medium
        transition-all
        duration-200
        hover:bg-[#e0ded9]
        hover:scale-[1.04]
        active:scale-[0.90]
        cursor-pointer
      "
    >
      {label}
    </button>
  );
};

export default Button;
