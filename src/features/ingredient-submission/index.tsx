import {
  Box,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { AuthenticationRepositoryContext } from 'context/authentication';
import { DancersRepositoryContext } from 'context/dancer';
import { IngredientsRepositoryContext } from 'context/ingredients';
import React, { useContext, useEffect, useState } from 'react';
import { defaultSpacing } from 'types/styled-components';
import { DancerGradedIngredient, Ingredient } from 'types/summer2021';

import IngredientSong from './ingredient-song';

const IngredientSubmission = () => {
  const authRepo = useContext(AuthenticationRepositoryContext);
  const dancersRepository = useContext(DancersRepositoryContext);
  const ingredientsRepository = useContext(IngredientsRepositoryContext);
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    new Array<Ingredient>(),
  );
  const [
    loggedInDancerGradedIngredients,
    setLoggedInDancerGradedIngredients,
  ] = useState<Map<string, DancerGradedIngredient>>(
    // key: songId -> value: gradedIngredient
    new Map<string, DancerGradedIngredient>(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallerThan1440] = useMediaQuery('(max-width: 1440px)');

  const columnNumber = isSmallerThan1440 ? 4 : 5;

  useEffect(() => {
    const loggedInUser = authRepo.authenticationRepositoryInstance
      .get()
      .okOrDefault();

    dancersRepository.dancersRepositoryInstance
      .get(loggedInUser.id)
      .then((result) => {
        const dancer = result.okOrDefault();

        Promise.all([
          ingredientsRepository.ingredientsRepositoryInstance.getAll(),
          // eslint-disable-next-line max-len
          ingredientsRepository.ingredientsRepositoryInstance.getGradedIngredientsByDancer(
            dancer.id,
            true,
          ),
        ]).then(
          ([ingredientsResult, loggedInDancerGradedIngredientsResult]) => {
            setIngredients(
              ingredientsResult
                .okOrDefault()
                .sort(
                  (i1, i2) => (i1.song?.level || 0) - (i2.song?.level || 0),
                ),
            );
            setLoggedInDancerGradedIngredients(
              new Map(
                loggedInDancerGradedIngredientsResult
                  .okOrDefault()
                  .map((gi) => [gi.score.songId, gi]),
              ),
            );
            setIsLoading(false);
          },
        );
      });
  }, []);

  return (
    <Container
      maxW={(defaultSpacing * 38 + defaultSpacing / 2) * columnNumber}
      p={defaultSpacing}
    >
      <Box mb={defaultSpacing} textAlign="center">
        <Heading>Score submission</Heading>
        <Text>Click or tap on the song jacket to submit your score</Text>
      </Box>
      <SimpleGrid
        minChildWidth={`${defaultSpacing * 32}px`}
        spacing={defaultSpacing / 2}
        maxW={(defaultSpacing * 38 + defaultSpacing / 2) * columnNumber}
      >
        {isLoading && (
          <Center>
            <Spinner // todo: replace this with proper skeleton structure
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        )}
        {!isLoading &&
          ingredients.map((i) => (
            <Center key={i.id}>
              <IngredientSong
                ingredient={i}
                dancerGradedIngredient={loggedInDancerGradedIngredients.get(
                  i.song?.id || '',
                )}
              />
            </Center>
          ))}
      </SimpleGrid>
    </Container>
  );
};

export default IngredientSubmission;
