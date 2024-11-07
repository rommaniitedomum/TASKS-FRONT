import React from "react";
import { MdEditDocument, MdDelete } from "react-icons/md";

const Item = () => {
  const desc =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum velit tempore rerum repellendus sapiente vero alias magnam, libero mollitia illum dolorem nam dicta neque doloribus. At dolore commodi laboriosam rerum?";

  const textLengthOverCut = (text, length, lastText) => {
    if (length === "" || length === null) {
      length = 20; // default
    }

    if (lastText === "" || lastText === null) {
      lastText = "...";
    }

    if (text.length > length) {
      text = text.substr(0, length) + lastText;
    }
    return text;
  };

  return (
    <div className="item w-1/3 h-[25vh] p-[0.25rem]">
      <div
        className=" w-full h-full border border-gray-500 rounded-md
         bg-gray-950 py-3 px-4 flex flex-col justify-between">
        <div className="upper">
          <h2
            className="item-title text-xl font-normal mb-3 relative pb-2
          flex justify-between font-customFontKR">
            <span
              className="item-line w-full absolute bottom-0 
            left-0 h-[1px] bg-gray-500"></span>
            코딩하기
            <span
              className=" text-sm py-1 px-3 border border-gray-500
            rounded-md hover:bg-gray-700 cursor-pointer">
              자세히
            </span>
          </h2>
          <p>{textLengthOverCut(desc, 40, "...")}</p>
        </div>
        <div className="lower">
          <p className="date text-sm mb-1">2024-11-07</p>
          <div className="item-footer flex justify-between">
            <div className="item-footer-left flex gap-2">
              <button className="item-btn bg-green-400">completed</button>
              {/* <button className="item-btn hidden bg-cyan-500">
                Incompleted
              </button> */}
              <button className="item-btn bg-red-400">Important</button>
            </div>
            <div className="item-footer-right flex gap-4 items-center">
              <button>
                <MdEditDocument className="w-5 h-5" />
              </button>
              <button>
                <MdDelete className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
