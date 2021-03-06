import { useMutation, useQueryClient } from 'react-query';

import { QUERY_GAME_INVITATION } from '../const/query.const';
import { useAxios } from './useAxios';

export const useDeleteGameInviteMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();

  return useMutation(
    (invite_code: number) => axios.delete(`games/invites/${invite_code}`),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(QUERY_GAME_INVITATION);
      },
    }
  );
};
