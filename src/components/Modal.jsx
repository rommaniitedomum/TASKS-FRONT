import React from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/slices/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const { modalType, task } = useSelector((state) => state.modal);
  // console.log(modalType, task);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const showModalTitle = (modalType, str1, str2, str3) => {
    switch (modalType) {
      case "update":
        return str1;
      case "details":
        return str2;
      default:
        return str3;
    }
  };

  const modalTitle = showModalTitle(
    modalType,
    "파일수정하기",
    "할일 상세보기",
    "할일추가하기 "
  );

  return (
    <div
      className="modal fixed bg-black bg-opacity-50 w-full h-full left-0 top-0 
    flex items-center justify-center z-50">
      <div className="form-wrapper bg-gray-700 rounded-md w-1/2 relative p-4 h-[40vh] ">
        <h2 className="text-2xl py-2 border-b border-gray-300 w-fit font-semibold">
          {modalTitle}
        </h2>
        <IoMdClose
          className="cursor-pointer absolute right-5 top-5"
          onClick={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Modal;