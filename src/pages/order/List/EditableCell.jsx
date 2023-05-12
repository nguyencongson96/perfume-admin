import React from "react";
import { Form, Input, Select } from "antd";

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          {dataIndex === "address" ? (
            <Input.TextArea rows={2} />
          ) : dataIndex === "status" ? (
            <Select
              initialvalues={record.status}
              style={{
                width: 120,
              }}
              options={[
                {
                  value: "Pending",
                  label: "Pending",
                },
                {
                  value: "Dispatched",
                  label: "Dispatched",
                },
                {
                  value: "Delivered",
                  label: "Delivered",
                },
                {
                  value: "Cancelled",
                  label: "Cancelled",
                },
              ]}
            />
          ) : (
            <Input />
          )}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
