import { Button, Form, Input, Select, Upload, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import { StateOptions } from 'features/profile/constants';
import { DancersRepositoryContext } from 'context/dancer';
import { ProfileFormData } from './types';
import { FormWrapper, StyledButton } from './styled';

const ProfileForm = ({
  formData,
  onSuccessfulSubmit,
  onCancelSubmit,
}: {
  formData: ProfileFormData;
  onSuccessfulSubmit: Function;
  onCancelSubmit: Function;
}) => {
  const dancersRepository = useContext(DancersRepositoryContext);

  const onFinish = (values: ProfileFormData) => {
    dancersRepository.dancersRepositoryInstance
      .update({
        ...formData,
        ...values,
      })
      .then((response) => {
        console.log(response);
        onSuccessfulSubmit()
      });
  };

  const uploadProps = {
    beforeUpload: () => {
      return false;
    },
  };

  const normaliseFile = (e: any) => {
    if (Array.isArray(e)) {
      return e[0].file;
    }
    return e.file;
  };

  return (
    <FormWrapper>
      <Typography.Title>Edit Profile</Typography.Title>
      <Form
        layout="vertical"
        initialValues={formData}
        onFinish={onFinish}
        style={{ textAlign: 'left' }}
      >
        <Form.Item label="Profile Picture">
          <Form.Item
            name="newProfilePicture"
            valuePropName="file"
            getValueFromEvent={normaliseFile}
          >
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />}>Upload picture</Button>
            </Upload>
          </Form.Item>
        </Form.Item>
        <Form.Item label="Dancer name">
          <Form.Item name="dancerName" noStyle>
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Dancer ID">
          <Form.Item name="dancerId" noStyle>
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          extra="Which state do you live in?"
        >
          <Select>
            {StateOptions.map((option) => (
              <Select.Option key={option.key} value={option.key}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Primary machine"
          name="primaryMachine"
          extra="Where do you mainly play DDR at?"
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <StyledButton type="primary" htmlType="submit">
            Save
          </StyledButton>
          <Button
            type="default"
            htmlType="button"
            onClick={() => onCancelSubmit()}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
};

export default ProfileForm;
