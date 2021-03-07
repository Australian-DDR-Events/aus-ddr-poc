import { Avatar, Box, Heading, Icon, Stack } from '@chakra-ui/react';
import React from 'react';
import { FaCrown } from 'react-icons/fa';
import { defaultSpacing } from 'types/styled-components';

import { Score } from '../../../../types/core';
import { getAssetUrl } from '../../../../utils/assets';

const TopScore = ({ score }: { score: Score }) => {
  return (
    <Box maxW="md" p={2}>
      <Stack direction="column" alignItems="center">
        <Icon
          as={FaCrown}
          color="gold"
          w={defaultSpacing * 2}
          h={defaultSpacing * 2}
        />
        <Avatar
          size="2xl"
          bgColor="transparent"
          src={getAssetUrl(score.dancer?.profilePictureUrl || '')}
          borderWidth={defaultSpacing / 2}
          borderColor="gold"
        />
      </Stack>

      <Heading size="lg" textAlign="center" mt={1}>
        {score.dancer?.ddrName || ''}
      </Heading>
      <Heading
        color="yellow.400"
        size="2xl"
        textAlign="center"
        mt={-defaultSpacing / 4}
      >
        {score.value}
      </Heading>
    </Box>
  );
};

export default TopScore;
