import { useEffect } from "react";
import styles from "./companies.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCompany,
  deleteCompanyReducer,
  fetchCompanies,
} from "../../redux/slices/companySlice";
import { Button, Popconfirm, Space, Spin, Table, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Companies = () => {
  const companyState = useSelector((state) => state.company);
  const { companies, isLoading } = companyState;
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleDeleteCompany = (id) => {
    dispatch(deleteCompany({ id, messageApi }));
    dispatch(deleteCompanyReducer({ id }));
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/company/${record._id}`}>View</Link>
          <Link to={`/company/edit/${record._id}`}>Edit</Link>
          <Popconfirm
            placement="leftTop"
            title="Are you sure to delete this company?"
            description="Delete the company"
            okText="Delete"
            onConfirm={() => handleDeleteCompany(record._id)}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const token = sessionStorage.getItem("jobifyJwt");
    dispatch(fetchCompanies({ messageApi, token }));
  }, [dispatch, messageApi]);

  return (
    <div className={styles.container}>
      {contextHolder}
      <Spin spinning={isLoading} fullscreen></Spin>
      <Button type="primary" onClick={() => navigate(`/company/add`)}>
        Add Company
      </Button>
      <Table
        className={styles.table}
        columns={columns}
        dataSource={companies}
        pagination={{
          pageSize: 4,
        }}
        rowKey="_id"
      />
    </div>
  );
};

export default Companies;
