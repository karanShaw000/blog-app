interface ButtonType {
  children: React.ReactNode;
  type: "button" | "submit";
}
const Button = ({ children, type }: ButtonType) => {
  return (
    <button
      type={type}
      className={`w-full text-white px-1 py-3 text-xl rounded-md ${
        type === "submit" ? "bg-black" : "bg-green-500"
      }
`}
    >
      {children}
    </button>
  );
};

export default Button;
