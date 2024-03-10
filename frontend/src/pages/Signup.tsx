import SignUpForm from "../components/SignUpForm";

const Signup = () => {
  return (
    <section className="grid grid-cols-2">
      <div className="flex justify-center items-center ">
        <SignUpForm />
      </div>

      <div className="bg-slate-300 flex justify-center items-center">
        <div className="flex flex-col justify-center items-start  w-4/5 mx-auto space-y-6">
          <h1 className="text-4xl font-semibold ">
            "The customer service I recived was exceptional.The support team
            went above and beyond to address my concerns."
          </h1>

          <div>
            <p className="text-2xl font-semibold">Karan Shaw</p>
            <p className="text-slate-500">CEO, BlogApp</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
