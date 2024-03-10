const AuthorIcon = ({ username }: AuthorIconType) => {
  return (
    <div
      className=" rounded-full aspect-square border-2 text-lg w-10  bg-green-700 text-white font-bold flex justify-center items-center 
      "
    >
      {`${username[0]}`}
    </div>
  );
};

export default AuthorIcon;
interface AuthorIconType {
  username: string;
}
