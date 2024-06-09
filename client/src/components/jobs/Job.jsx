import {
  Button,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Spin,
  Table,
  message,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({});
  const [edit, setEdit] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [view, setView] = useState(false);
  const [add, setAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const axiosInstance = axios.create({
    baseURL: `http://localhost:8080/job`,
    headers: { Authorization: sessionStorage.getItem("jobifyJwt") },
  });

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Salary", dataIndex: "salary", key: "salary" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              setView(true);
              const data = jobs.filter((job) => job._id === record._id);
              setJob(data[0]);
            }}
          >
            View
          </Button>
          <Button
            type="link"
            onClick={() => {
              setEdit(true);
              const data = jobs.filter((job) => job._id === record._id);
              setJob(data[0]);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            placement="leftTop"
            title="Are you sure to delete this job?"
            description="Delete the job"
            okText="Delete"
            onConfirm={() => handleDeleteJob(record._id)}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const fetchJobs = async () => {
    setIsLoading(true);
    const res = await axiosInstance.get(`getJobs`);
    setJobs(res.data.jobs);
    setIsLoading(false);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleAddJob = () => {
    setIsLoading(true);

    try {
      axiosInstance
        .post(`/add`, job)
        .then((res) => {
          messageApi.open({
            type: "success",
            content: res.data.message,
            duration: 3,
          });
        })
        .then(() => fetchJobs());

      setIsLoading(false);
      setJob({});
      setAdd(false);
    } catch (err) {
      console.log(err);
      messageApi.open({
        type: "error",
        content: "something went wrong",
        duration: 3,
      });
      setIsLoading(false);
    }
  };

  const handleUpdateJob = () => {
    setIsLoading(true);
    try {
      axiosInstance
        .patch(`/update/${job._id}`, job)
        .then((res) => {
          messageApi.open({
            type: "success",
            content: res.data.message,
            duration: 3,
          });
        })
        .then(() => fetchJobs());

      setIsLoading(false);
      setJob({});
      setEdit(false);
    } catch (err) {
      console.log(err);
      messageApi.open({
        type: "error",
        content: "something went wrong",
        duration: 3,
      });
      setIsLoading(false);
    }
  };

  const handleDeleteJob = (id) => {
    setIsLoading(true);
    try {
      axiosInstance.delete(`/delete/${id}`).then(() => {
        messageApi.open({
          type: "success",
          content: "task deleted successfully",
          duration: 3,
        });
        const newData = jobs.filter((task) => task._id !== id);
        setJobs(newData);
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      messageApi.open({
        type: "error",
        content: "something went wrong",
        duration: 3,
      });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  console.log(job);
  return (
    <div>
      {contextHolder}
      <Spin spinning={isLoading} fullscreen></Spin>
      <Button
        type="primary"
        onClick={() => {
          setAdd(true);
        }}
      >
        Add Job
      </Button>
      <Table
        columns={columns}
        dataSource={jobs.length && jobs}
        pagination={{
          pageSize: 4,
        }}
        rowKey="_id"
      />
      <Modal open={edit} onCancel={() => setEdit(false)}>
        <Input
          placeholder="Job title"
          defaultValue={job && job.title}
          name="title"
          onChange={onInputChange}
        />
        <Input
          placeholder="Description"
          defaultValue={job && job.description}
          name="description"
          onChange={onInputChange}
        />
        <Input
          placeholder="Salary"
          defaultValue={job.salary}
          name="salary"
          onChange={onInputChange}
        />
        <Button type="primary" onClick={handleUpdateJob}>
          Update
        </Button>
      </Modal>
      <Modal
        open={view}
        onOk={() => setView(false)}
        onCancel={() => setView(false)}
      >
        <p>Job Title : {job.title}</p>
        <p>Description : {job.description}</p>
        <p>Salary : {job.salary}</p>
      </Modal>
      <Modal
        open={add}
        onCancel={() => setAdd(false)}
        onOk={() => setAdd(false)}
      >
        <Input placeholder="Job title" name="title" onChange={onInputChange} />
        <Input
          placeholder="Description"
          name="description"
          onChange={onInputChange}
        />
        <Input placeholder="Salary" name="salary" onChange={onInputChange} />

        <Button type="primary" onClick={handleAddJob}>
          Add Job
        </Button>
      </Modal>
    </div>
  );
};

export default Jobs;
