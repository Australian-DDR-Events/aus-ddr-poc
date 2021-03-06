import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useClipboard,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { DancerFieldsFragment } from 'types/graphql.generated';
import { defaultPixel } from 'types/styled';
import { getProfileImageUrl } from 'utils/assets';
import { StateOptions } from 'utils/dropdown-options';

import ProfileTabs from './profile-tabs';

const ProfileReadView = ({
  isEditable,
  dancer,
  onEditButtonClick,
}: {
  isEditable: boolean;
  dancer: DancerFieldsFragment;
  onEditButtonClick: () => void;
}) => {
  const [isLargerThan769] = useMediaQuery('(min-width: 769px)');
  const getStateTextualRepresentation = (inputState: string): string => {
    return StateOptions.find((state) => state.key === inputState)?.value || '';
  };

  const { onCopy } = useClipboard(
    `${process.env.BASE_URL}/profile/${dancer.id}`,
  );

  const toast = useToast();
  const onShareButtonClick = () => {
    onCopy();
    toast({
      description: 'Copied profile link ✨',
      status: 'success',
      duration: 1500,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Stack direction={['column', 'column', 'column', 'row']} spacing={8}>
      <Box w={isLargerThan769 ? `${defaultPixel * 40}px` : '100%'}>
        <Center>
          <Avatar
            size="2xl"
            name={dancer.ddrName}
            src={getProfileImageUrl(dancer.profilePictureUrl)}
            mb={4}
            bgColor="transparent"
          />
        </Center>
        {isEditable && (
          <Center>
            <Button
              w={isLargerThan769 ? '100%' : '50%'}
              onClick={onEditButtonClick}
            >
              Edit profile
            </Button>
          </Center>
        )}

        <Center>
          <Button
            colorScheme="blue"
            w={isLargerThan769 ? '100%' : '50%'}
            onClick={onShareButtonClick}
            mb={4}
            mt={isEditable ? 2 : 0}
          >
            Share profile
          </Button>
        </Center>

        <Box textAlign={isLargerThan769 ? 'left' : 'center'}>
          <Heading>{dancer.ddrName}</Heading>

          {dancer.ddrCode && (
            <>
              <Text fontSize="sm" mb={-1} color="gray">
                Dancer code
              </Text>
              <Text fontSize="lg" mb={defaultPixel / 8}>
                {dancer.ddrCode}
              </Text>
            </>
          )}

          {dancer.state && (
            <>
              <Text fontSize="sm" mb={-1} color="gray">
                State
              </Text>
              <Text fontSize="lg" mb={defaultPixel / 8}>
                {getStateTextualRepresentation(dancer.state)}
              </Text>
            </>
          )}

          {dancer.primaryMachineLocation && (
            <>
              <Text fontSize="sm" mb={-1} color="gray">
                Primary machine
              </Text>
              <Text fontSize="lg">{dancer.primaryMachineLocation}</Text>
            </>
          )}
        </Box>
      </Box>
      <ProfileTabs dancer={dancer} />
    </Stack>
  );
};

export default ProfileReadView;
