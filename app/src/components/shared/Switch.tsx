import React, { useState } from 'react';
import SwitchSelector from 'react-native-switch-selector';

import { theme } from '../../theme';

interface SwitchProps {
  leftLabel: string;
  rightLabel: string;
  leftSideToggled: (arg: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = (props) => {
  const [leftBtnIsActive, setLeftBtnIsActive] = useState<boolean>(true);

  return (
    <SwitchSelector
      initial={0}
      onPress={(value) => {
        value === 'left' ? setLeftBtnIsActive(true) : setLeftBtnIsActive(false);
        props.leftSideToggled(leftBtnIsActive);
      }}
      textColor="#7f8581"
      selectedColor={theme.colors.primary}
      buttonColor={theme.colors.background.white}
      borderColor={theme.colors.background.darkGray}
      backgroundColor={theme.colors.background.darkGray}
      hasPadding
      height={50}
      fontSize={20}
      bold
      options={[
        { label: props.leftLabel, value: 'left' },
        { label: props.rightLabel, value: 'right' },
      ]}
    />
  );
};
