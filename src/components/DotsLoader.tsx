import { type NextPage } from "next";

const DotsLoader: NextPage = () => {
  return (
    <div className="bouncing-loader my-[40px] mx-auto flex justify-center">
      <div className="my-[3px] mx-[6px] h-4 w-4 animate-bounce rounded-full bg-gray-500 opacity-100"></div>
      <div
        style={{ animationDelay: ".2s" }}
        className="my-[3px] mx-[6px] h-4 w-4 animate-bounce rounded-full bg-gray-500 opacity-100 delay-200"
      ></div>
      <div
        style={{ animationDelay: ".4s" }}
        className="my-[3px] mx-[6px] h-4 w-4 animate-bounce rounded-full bg-gray-500 opacity-100 delay-500"
      ></div>
    </div>
  );
};

export default DotsLoader;
