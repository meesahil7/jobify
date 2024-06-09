import { Button, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addCompany,
  fetchCompany,
  updateCompany,
} from "../../redux/slices/companySlice";

const Form = () => {
  const state = useSelector((state) => state.company);
  const { isLoading, company } = state;
  const { pathname } = useLocation();
  const arr = pathname.split("/");
  const { id } = useParams();
  const [data, setData] = useState(company);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { name, description, location } = data;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleAddCompany = () => {
    dispatch(addCompany({ messageApi, data }));
    setData({});
  };

  const handleUpdateCompany = () => {
    dispatch(updateCompany({ id, messageApi, navigate, data }));
  };

  useEffect(() => {
    dispatch(fetchCompany({ id }));
  }, [dispatch, id]);
  return (
    <div>
      {contextHolder}
      <Spin spinning={isLoading} fullscreen></Spin>
      <div>
        {arr[2] === "edit" ? (
          <>
            <label htmlFor="">Company Name : </label>
            <Input
              defaultValue={data && name}
              name="name"
              onChange={onInputChange}
            />
            <label htmlFor="">Description : </label>
            <Input
              defaultValue={data && description}
              name="description"
              onChange={onInputChange}
            />
            <label htmlFor="">Location : </label>
            <Input
              defaultValue={data && location}
              name="location"
              onChange={onInputChange}
            />
            <Button type="primary" onClick={handleUpdateCompany}>
              Update
            </Button>
          </>
        ) : (
          <>
            <label htmlFor="">Company Name : </label>
            <Input name="name" onChange={onInputChange} />
            <label htmlFor="">Description : </label>
            <Input name="description" onChange={onInputChange} />
            <label htmlFor="">Location : </label>
            <Input name="location" onChange={onInputChange} />
            <Button type="primary" onClick={handleAddCompany}>
              Add
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
