import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "./PageTitle";
import Item from "./Item";
import AddItem from "./Additem";
import { fetchGetItemsData } from "../redux/slices/apiSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingSkeleton from "./LoadingSkeleton";
import Modal from "./Modal";

const Itempanel = ({ pageTitle }) => {
  const authData = useSelector((state) => state.auth.authData);
  const userKey = authData?.sub;
  const dispatch = useDispatch();

  const getTasksData = useSelector((state) => state.apis.getItemsData);
  const isOpen = useSelector((state) => state.modal.isOpen);
  // console.log(getTasksData);
  // console.log(isOpen);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userKey) return;

    const fetchGetItems = async () => {
      try {
        await dispatch(fetchGetItemsData(userKey)).unwrap(); // useEffect 내부에서 dispatch 함수를 호출하여 thunk 함수 실행
      } catch (error) {
        console.error("Failed to Fetch Items: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGetItems();
  }, [dispatch, userKey]);

  return (
    <div className="panel bg-[#212121] w-4/5 h-full rounded-md border border-gray-500 py-5 px-4 overflow-y-auto">
      {userKey ? (
        <div className="panel-wraper w-full h-full">
          {isOpen && <Modal />}
          <PageTitle title={pageTitle} />
          <div className="items flex flex-wrap">
            {loading ? (
              <SkeletonTheme
                baseColor="#202020"
                highlightColor="#444"
                width="100%"
                height="25vh">
                <LoadingSkeleton />
              </SkeletonTheme>
            ) : (
              getTasksData?.map((item, idx) => <Item key={idx} task={item} />)
            )}
            <AddItem />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <button className="flex justify-center items-center bg-gray-300 text-gray-900 py-2 px-4 rounded-md cursor-default">
            <span className="text-sm font-semibold">
              로그인이 필요한 서비스 입니다.
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Itempanel;
