import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/slices/modalSlice";

const Additem = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: "create", task: null }));
  };
  return (
    <div className="add-card w-1/3 h-[25vh] p-[0.25rem]">
      <div
        className="w-full h-full border border-gray-500 rounded-md
         bg-gray-900 py-3 px-4 flex items-center justify-center">
        <button
          className=" flex items-center gap-2 group"
          onClick={handleOpenModal}>
          <IoIosAddCircleOutline
            className="w-8 h-8 text-gray-400 font-light
          group-hover:text-gray-200 cursor-pointer"
          />
          <span className="font-light text-gray-400 group-hover:text-gray-200 cursor-pointer">
            할일 추가하기
          </span>
        </button>
      </div>
    </div>
  );
};

export default Additem;
