import { Button, Text, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useClient } from 'urql';

const GraphqlTestbed = () => {
  const client = useClient();
  const [response, setResponse] = useState('');
  const [input, setInput] = useState('');

  const handleInputChange = (e: InputEvent) => {
    e.preventDefault();
    setInput(e.target?.value);
  };

  const graphqlRequest = (data: string) => {
    client
      .query(data)
      .toPromise()
      .then((result) => {
        setResponse(JSON.stringify(result.data, null, 2));
      });
  };

  return (
    <>
      <Textarea value={input} onChange={handleInputChange} size="sm" />
      <Button onClick={() => graphqlRequest(input)} />
      <Text fontSize="sm">{response}</Text>
    </>
  );
};

export default GraphqlTestbed;
