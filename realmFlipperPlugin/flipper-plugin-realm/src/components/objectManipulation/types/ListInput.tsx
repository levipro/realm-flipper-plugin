import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { Layout } from 'flipper-plugin';
import React, { useState } from 'react';
import { getDefault, TypeInput, TypeInputProps } from './TypeInput';

export const ListInput = ({ property, set, defaultValue }: TypeInputProps) => {
  const [array, setArray] = useState(defaultValue as unknown[]);
  const [removalOffset, setRemovalOffset] = useState(0);
  const typePointed = property.objectType;
  if (!typePointed) {
    return <></>;
  }
  const innerProp = {
    type: typePointed,
    name: '',
    indexed: false,
    mapTo: '',
    optional: property.optional,
  };

  return (
    <Layout.Container grow>
      {array.map((value: unknown, index: number) => {
        return (
          <Layout.Container
            grow
            key={index}
            style={{ backgroundColor: 'white' }}
          >
            <Row align="middle">
              <Col flex="auto">
                <TypeInput
                  extraProps={{ style: { width: '100%' } }}
                  property={innerProp}
                  set={(val) => {
                    const arr = array;
                    arr[index] = val;
                    setArray(arr);
                    set(arr);
                  }}
                  defaultValue={value}
                  key={removalOffset + index}
                ></TypeInput>
              </Col>
              <Col>
                <Button
                  key={-index - 1}
                  type="primary"
                  icon={<DeleteOutlined />}
                  // size={"small"}
                  // remove ith element
                  onClick={() => {
                    setRemovalOffset(v => v + array.length)
                    setArray(array.filter((_, i) => i !== index));
                    set(array.filter((_, i) => i !== index));
                  }}
                />
              </Col>
            </Row>
          </Layout.Container>
        );
      })}
      <Button onClick={() => {
        const newArray = [...array, getDefault(innerProp)]
        setArray(newArray)
        set(newArray);
      }}>
        Add {property.objectType}
      </Button>
    </Layout.Container>
  );
};
