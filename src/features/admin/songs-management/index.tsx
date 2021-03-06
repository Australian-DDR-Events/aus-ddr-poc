import {
  Button,
  Center,
  Container,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import { IoAddCircleOutline } from '@react-icons/all-files/io5/IoAddCircleOutline';
import React from 'react';
import { Song } from 'types/core';
import { useQuery } from 'urql';

import SongReadView from './read';

const GetAllSongs = `
query {
  songs(first: 50) {
    nodes {
      id
      name
      artist
      difficulty
      level
      image256
    }
  }
}`;

const SongsManagement = () => {
  const [{ data, fetching, error }] = useQuery({
    query: GetAllSongs,
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const gridColumns = 4;
  const totalCourseCoverWidth = 256 + 8;
  const padding = 32 * 2;

  return (
    <>
      <Heading textAlign="center">Songs management</Heading>
      <Center mt={4}>
        <Button
          variant="solid"
          colorScheme="pink"
          leftIcon={<IoAddCircleOutline />}
        >
          Add a new song
        </Button>
      </Center>
      <Container maxW={gridColumns * totalCourseCoverWidth + padding} p={4}>
        <SimpleGrid spacing={4} columns={4}>
          {data.songs.nodes.map((song: Song) => (
            <SongReadView song={song} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};
export default SongsManagement;
