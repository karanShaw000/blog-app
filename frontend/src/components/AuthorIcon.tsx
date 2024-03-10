const AuthorIcon = ({ username }: AuthorIconType) => {
  return (
    <div
      className=" rounded-full aspect-square border-2 text-lg w-12  bg-green-500 text-white font-bold flex justify-center items-center 
      "
    >
      {`${username[0].toUpperCase()}`}
    </div>
  );
};

export default AuthorIcon;
interface AuthorIconType {
  username: string;
}
