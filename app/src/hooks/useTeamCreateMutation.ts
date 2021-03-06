import { useMutation, useQueryClient } from 'react-query';

import { QUERY_PROFILE_KEY, QUERY_TEAM_KEY } from '../const/query.const';
import { useAxios } from './useAxios';

interface TeamCreatePayload {
  name: string;
  description: string;
}

export const useTeamCreateMutation = () => {
  const axios = useAxios();

  const queryCache = useQueryClient();
  return useMutation(
    (newTeam: TeamCreatePayload) => axios.post('teams', newTeam),
    {
      onSuccess: async () => {
        await queryCache.invalidateQueries(QUERY_TEAM_KEY);
        await queryCache.refetchQueries(QUERY_TEAM_KEY);
        await queryCache.refetchQueries(QUERY_PROFILE_KEY);
      },
      onError: (error) => {
        alert('Podczas tworzenia zespołu wystąpił błąd');
        console.error(error);
      },
    }
  );
};
