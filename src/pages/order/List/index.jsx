import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import handleDispatch from "../../../utils/handleDispatch";
import EditableCell from "./EditableCell";
import ExpandedRow from "./ExpandedRow";
import styles from "../../../styles/order/item.module.css";
import { Form, Table, Typography, Tag } from "antd";

const OrderList = () => {
  const list = useSelector((state) => state.orders.list).map((item) => ({
    key: item._id,
    ...item,
    formattedTotal: new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(item.total),
    formattedSubmitDate: item.submitAt ? new Intl.DateTimeFormat().format(new Date(item.submitAt)) : "",
  }));

  useEffect(() => {
    handleDispatch.order.list.filter({ page: 1 });
  }, []);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      id: "",
      Name: "",
      Phone: "",
      Address: "",
      Status: "",
      Total: 0,
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const index = list.findIndex((item) => key === item.key);
      if (index >= 0) {
        await handleDispatch.order.list.update({ ...list[index], ...row });
        setEditingKey("");
      }
    } catch (err) {
      console.log("Validate Failed:", err);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: "15%",
      sorter: {
        compare: (a, b) => a._id > b._id,
        multiple: 1,
      },
    },
    {
      title: "Submit Date",
      dataIndex: "formattedSubmitDate",
      key: "formattedSubmitDate",
      width: "10%",
      sorter: {
        compare: (a, b) => a.submitAt > b.submitAt,
        multiple: 2,
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "12%",
      editable: true,
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 3,
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "10%",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "25%",
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      editable: true,
      sorter: {
        compare: (a, b) => a.status.localeCompare(b.status),
        multiple: 4,
      },
      render: (value) => {
        const color =
          value === "Dispatched"
            ? "blue"
            : value === "Cancelled"
            ? "magenta"
            : value === "Delivered"
            ? "gold"
            : "cyan";
        return (
          <Tag color={color} key={value}>
            {value}
          </Tag>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "formattedTotal",
      key: "formattedTotal",
      width: "10%",
      sorter: {
        compare: (a, b) => a.total - b.total,
        multiple: 5,
      },
    },
    {
      title: "Action",
      key: "action",
      width: "8%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link style={{ marginRight: 8 }} onClick={() => save(record.key)}>
              Save
            </Typography.Link>
            <Typography.Link onClick={cancel}>Cancel</Typography.Link>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
    Table.EXPAND_COLUMN,
  ];

  const mergedColumns = columns.map((col) =>
    !col.editable
      ? col
      : {
          ...col,
          onCell: (record) => ({
            record,
            inputType: "text",
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        }
  );

  return (
    <div className={styles.table}>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          pagination={{
            position: ["none"],
          }}
          bordered
          columns={mergedColumns}
          expandable={{
            expandedRowRender: (record) => <ExpandedRow record={record} />,
          }}
          dataSource={list}
        />
      </Form>
    </div>
  );
};

export default OrderList;
