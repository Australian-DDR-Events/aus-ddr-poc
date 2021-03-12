import {
  Box,
  Button,
  Center,
  Icon,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import CustomIconRatings from 'components/custom-icon-ratings';
import React from 'react';
import { IoOpenOutline, IoStar } from 'react-icons/io5';
import { DancerGradedDish } from 'types/summer2021';
import { getAssetUrl } from 'utils/assets';
import { convertGradeToNumber } from 'utils/summer2021';

import SongScoreModal from './song-score-modal';

const DishScoreDisplay = ({
  dancerGradedDish,
}: {
  dancerGradedDish: DancerGradedDish;
}) => {
  const { gradedDish, scores } = dancerGradedDish;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box textAlign="center" w="fit-content">
      <Center>
        <Image src={getAssetUrl(gradedDish.image256)} alt={gradedDish.name} />
      </Center>
      <Text fontWeight="bold" fontSize="lg">
        {gradedDish.description} {gradedDish.name}
      </Text>
      <CustomIconRatings
        icon={IoStar}
        id={dancerGradedDish.id}
        rating={convertGradeToNumber(gradedDish.grade)}
        color="gold"
        w={6}
        h={6}
      />
      <Center>
        <Button
          variant="link"
          colorScheme="blue"
          fontSize="3xl"
          fontWeight="bold"
          mt={1}
          onClick={onOpen}
        >
          {scores.reduce((acc, score) => acc + score.value, 0)}
          <Icon as={IoOpenOutline} w={4} h={4} mb={2} ml={2} />
        </Button>
        <SongScoreModal scores={scores} isOpen={isOpen} onClose={onClose} />
      </Center>
    </Box>
  );
};

export default DishScoreDisplay;
