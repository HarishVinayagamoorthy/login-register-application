import { Button, message, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Details = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success('logged out Successfully')
    navigate("/");
  };

  const data = [
    {
      key: "1",
      name: "John Doe",
      email: "john@example.com",
      dob: "1990-01-01",
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      dob: "1992-02-02",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
    },
   {
    title: "Actions",
    key: "actions",
    render: () => (
      <div style={{ display: "flex", justifyContent: "center", gap:'10px' }}>
        <FaEdit
          style={{ cursor: "pointer", color: "blue", marginRight: 1 }}
        />
        <MdDelete
          style={{ cursor: "pointer", color: "red" }}

        />
      </div>
    ),
  },
]


  return (
    <>
      <div className="details-container">
        <Button onClick={handleLogout} className="logout-btn">
          Logout
        </Button>
        <div className="table-container">
          <Table
            dataSource={data}
            columns={columns}
            style={{ width: "100%" }}
            bordered
            scroll={{ x: true }}
          />
        </div>
      </div>
    </>
  );
};

export default Details;
