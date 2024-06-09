import { Spin, message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchCompany } from "../../redux/slices/companySlice";

const View = () => {
  const state = useSelector((state) => state.company);
  const { isLoading, company } = state;
  const { pathname } = useLocation();
  const arr = pathname.split("/");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(fetchCompany({ id, messageApi }));
  }, [dispatch, id, messageApi]);
  return (
    <div>
      {contextHolder}
      <Spin spinning={isLoading} fullscreen></Spin>
      {arr[1] === "company" && (
        <>
          <h2>Company Details</h2>
          <p>Company Name : {company.name}</p>
          <p>Description : {company.description}</p>
          <p>Location : {company.location}</p>
        </>
      )}
    </div>
  );
};

export default View;
