import React, { useState } from "react";
import { Table, Space, Button, Modal, Tag, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS from "../../store/Actions/UserAction";

import UpdateUser from "../FormUser/UpdateUserModal";
import { StyledLayoutTable } from "./StyledTable/StyledTable";
const { Column } = Table;
function ComponentTable(props) {
  const { allInfo } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [NameUser, setNameUser] = useState("");
  const [EmailUser, setEmailUser] = useState("");
  const [PasswordUser, setPasswordUser] = useState("");
  const dispatch = useDispatch();
  const [idUser, setIdUser] = useState();
  // chuc nang xem
  const handleDetail = (user) => {
    setIsModalOpen(true);
    setNameUser(user.username);
    setEmailUser(user.email);
    setPasswordUser(user.email);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // chuc nang xoa
  const handleDelete = (id) => {
    setIdUser(id);
    dispatch(ACTIONS.deleteUser(id));
  };

  return (
    <StyledLayoutTable>
      <Table dataSource={allInfo}>
        <Column
          color="blue"
          title="UserName"
          dataIndex="username"
          key="username"
        />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Password" dataIndex="password" key="password" />
        <Column title="Phone" dataIndex="phone" key="phone" />
        <Column
          className="tb_action"
          title="Action"
          key="action"
          render={(_, record) => (
            <Space className="space_tb" size="middle">
              <UpdateUser idupdateUser={record}></UpdateUser>

              <Popconfirm
                title="Bạn có muốn xóa người dùng này không ?"
                okText="Có"
                cancelText="Không"
                onConfirm={() => handleDelete(record.id)}
              >
                <Button
                  type="primary"
                  loading={record.id === idUser ? true : false}
                >
                  Xóa
                </Button>
              </Popconfirm>

              <Button onClick={() => handleDetail(record)}>Xem</Button>
            </Space>
          )}
        />
      </Table>

      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Name: {NameUser}</p>
        <p>Email: {EmailUser}</p>
        <p>Password: {PasswordUser}</p>
      </Modal>
    </StyledLayoutTable>
  );
}

export default ComponentTable;
