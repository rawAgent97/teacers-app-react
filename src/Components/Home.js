import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import { InputNumber, Table, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteStudent,
  editStudent,
  getStudent,
} from "../redux/actions/dataActions";
import { Modal } from "react-bootstrap";
import { Form, Button, Input } from "antd";
import {
  UserOutlined,
  BookOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import { addStudent } from "../redux/actions/dataActions";

const Home = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [recordId, setRecordId] = useState("");
  const [form] = Form.useForm();
  const [sData, setSData] = useState([]);
  const [openAddModel, setOpenAddModel] = useState(false);
  const {
    studentData,
    addDataSuccess,
    addDataFailed,
    deleteDataSuccess,
    deleteDataFailed,
    editDataSuccess,
    editDataFailed,
  } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudent());
  }, []);
  useEffect(() => {
    setSData(studentData);
  }, [studentData]);
  useEffect(() => {
    if (addDataSuccess) {
      message.success(addDataSuccess);
      dispatch(getStudent());
    }
    if (addDataFailed) {
      message.error(addDataFailed);
      dispatch(getStudent());
    }
    if (editDataSuccess) {
      message.success(editDataSuccess);
      dispatch(getStudent());
    }
    if (editDataFailed) {
      message.error(editDataFailed);
      dispatch(getStudent());
    }
    if (deleteDataSuccess) {
      message.success(deleteDataSuccess);
      dispatch(getStudent());
    }
    if (deleteDataFailed) {
      message.error(deleteDataFailed);
      dispatch(getStudent());
    }
  }, [
    addDataSuccess,
    addDataFailed,
    editDataSuccess,
    editDataFailed,
    deleteDataFailed,
    deleteDataSuccess,
  ]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Marks",
      dataIndex: "marks",
      key: "marks",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              onClickEditRecord(record);
            }}
            style={{marginRight:"20px"}}
          />
          <DeleteOutlined onClick={() => onClickDeleteRecord(record)} />
        </div>
      ),
    },
  ];

  const onClickDeleteRecord = (record) => {
    dispatch(deleteStudent({ id: record._id }));
  };
  const handleClose = () => {
    setOpenAddModel(false);
  };

  const onClickEditRecord = (record) => {
    console.log(record);
    setMarks(record.marks);
    setName(record.name);
    setSubject(record.subject);
    setRecordId(record._id);
    form.setFieldsValue({
      marks: record.marks,
      name: record.name,
      subject: record.subject,
    });
    setOpenAddModel(true);
  };
  const onFormSubmit = (v) => {
    console.log(v);
    setOpenAddModel(false);
    if (recordId) {
      dispatch(editStudent({ ...v, id: recordId }));
    } else {
      dispatch(addStudent(v));
    }

    setMarks("");
    setName("");
    setSubject("");
    setRecordId("");
    form.setFieldsValue({
      marks: "",
      name: "",
      subject: "",
    });
  };
  return (
    <div className="page-content">
      <Modal show={openAddModel} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form layout={"vertical"} form={form} onFinish={onFormSubmit}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="Enter user name"
                prefix={<UserOutlined />}
                value={name}
              />
            </Form.Item>
            <Form.Item
              label="Subject"
              name="subject"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="Enter Subject"
                prefix={<AccountBookOutlined />}
                value={subject}
              />
            </Form.Item>
            <Form.Item
              label="Marks"
              name="marks"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Enter Marks"
                prefix={<BookOutlined />}
                max={100}
                value={marks}
              />
            </Form.Item>

            <Form.Item className="text-center">
              <Button htmlType="submit" className="login-btn" size="large">
                {recordId ? "Edit" : "Add"}
              </Button>
            </Form.Item>
          </Form>
        </Modal.Body>
      </Modal>
      <NavBar />
      <div className="row m-3 mt-5">
        <div className="col-sm-12">
          <Table columns={columns} dataSource={sData} pagination={false} />
        </div>
        <div className="col-sm-12 mt-2">
          <button
            type="button"
            className="btn btn-md btn-dark"
            onClick={() => {
              setOpenAddModel(true);
            }}
          >
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
