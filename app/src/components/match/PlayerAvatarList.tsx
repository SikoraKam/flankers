import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { MembersPayload } from '../../types/squadResponse';
import { Avatar } from '../shared/Avatar';

interface PlayerAvatarListProps {
  players: MembersPayload[];
}

export const PlayerAvatarList: React.FC<PlayerAvatarListProps> = ({
  players,
}) => {
  return (
    <View style={styles.container}>
      {players.map((player, i) => (
        <Avatar
          border={4}
          elevation={4}
          key={player.id}
          containerStyle={[styles.avatar, { zIndex: players.length - i }]}
          size={65}
          src={{ uri: player.versioned_avatar }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    flexDirection: 'row',
    paddingLeft: 24,
  },
  avatar: {
    marginLeft: -20,
  },
});
