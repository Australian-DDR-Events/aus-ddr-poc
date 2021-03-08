import { Badge, Box, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { Song } from 'types/core';
import { defaultSpacing } from 'types/styled';
import { getAssetUrl } from 'utils/assets';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';

const SongDisplay = ({
  song,
  cookingMethod,
}: {
  song: Song;
  cookingMethod: string;
}) => {
  const songColors = getColorByDifficulty(song.difficulty);
  const [isSmallerThan1024] = useMediaQuery('(max-width: 1024px');
  return (
    <Flex
      maxW="100%"
      mb={defaultSpacing}
      mr={defaultSpacing}
      overflow="hidden"
      borderWidth={2}
      borderRadius="lg"
      borderColor={songColors.border}
      boxShadow={`${defaultSpacing * 1.5}px ${defaultSpacing * 1.5}px 0 ${
        songColors.shadow
      }`}
      transition="box-shadow 300ms ease-in-out"
      _hover={{
        boxShadow: `${defaultSpacing * -1.5}px ${defaultSpacing * 1.5}px 0 ${
          songColors.shadow
        }`,
      }}
      w="100%"
    >
      <Image src={getAssetUrl(song.image128)} h="100%" />
      <Box mt={defaultSpacing / 4} ml={defaultSpacing / 4} textAlign="left">
        <Text
          fontWeight="bold"
          fontSize="md"
          color={songColors.shadow}
          lineHeight={1}
        >
          Play to {cookingMethod} your ingredients
        </Text>
        <Text fontWeight="bold" fontSize={isSmallerThan1024 ? 'md' : 'lg'}>
          {song.name}
        </Text>
        <Text color="gray" mt={-1} mb={1}>
          {song.artist}
        </Text>
        <Badge colorScheme={songColors.badge} mb={defaultSpacing / 4}>
          {song.difficulty}
        </Badge>
      </Box>
    </Flex>
  );
};

export default SongDisplay;
