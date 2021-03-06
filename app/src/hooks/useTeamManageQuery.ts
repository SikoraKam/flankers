import { useQuery } from 'react-query';

import { QUERY_TEAM_KEY } from '../const/query.const';
import { TeamProfilePayload } from '../types/teamProfile';
import { UserProfilePayload } from '../types/userProfilePayload';
import { useAxios } from './useAxios';

export type TeamMembersResponse = UserProfilePayload[];

export const useTeamProfileQuery = () => {
  const axios = useAxios();

  return useQuery<TeamProfilePayload>(QUERY_TEAM_KEY, async () => {
    const response = await axios.get<TeamProfilePayload[]>('teams');
    return response.data[0]; //backend zwraca tablice drużyn jednak my zakładamy że użytkownik ma tylko jedną drużynę
  });
};
