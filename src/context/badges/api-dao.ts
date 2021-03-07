import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { DefaultBadge } from 'context/badges/constants';
import { err, ok, Result } from 'types/result';

import { Badge, BadgesDao } from './types';

const badgesApiDao = ({
  axiosClient,
}: {
  axiosClient: AxiosInstance;
}): BadgesDao => {
  const getById = async (id: string): Promise<Result<Error, Badge>> => {
    return axiosClient
      .get(`/badges/${id}`)
      .then(
        (response: AxiosResponse<Badge>): Result<Error, Badge> =>
          ok(response.data),
      )
      .catch(
        (): Result<Error, Badge> => {
          return err(new Error('failed to get badges'), DefaultBadge);
        },
      );
  };

  const getForDancerId = async (
    id: string,
  ): Promise<Result<Error, Array<Badge>>> => {
    const axiosRequest: AxiosRequestConfig = {
      params: {
        dancer_id: id,
      },
    };

    return axiosClient
      .get(`/badges`, axiosRequest)
      .then(
        (response: AxiosResponse<Array<Badge>>): Result<Error, Array<Badge>> =>
          ok(response.data),
      )
      .catch(
        (): Result<Error, Array<Badge>> => {
          return err(new Error('failed to get badges'), new Array<Badge>());
        },
      );
  };

  return { getById, getForDancerId };
};

export default badgesApiDao;
