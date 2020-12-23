import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { HelperText, useTheme } from 'react-native-paper';
import * as yup from 'yup';

import { AppButton } from '../../components/shared/AppButton';
import { AppInput } from '../../components/shared/AppInput';
import { Container } from '../../components/shared/Container';
import { HeaderWithAvatar } from '../../components/shared/HeaderWithAvatar';
import MyAvatar from '../../components/shared/MyAvatar';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { useProfileEditMutation } from '../../hooks/useEditProfileMutation';
import { TextStyle, theme } from '../../theme';
import { setResponseErrors } from '../../utils/setResponseErrors';
import { ProfileScreenStackParamList } from './ProfileScreenStack';

type ProfileEditScreenProps = object &
  StackScreenProps<ProfileScreenStackParamList, 'ProfileEdit'>;

type ProfileEditFormData = {
  name: string;
  actualPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

const ProfileEditSchema = yup.object().shape({
  name: yup.string().required('Nick jest wymagany'),
  actualPassword: yup.string().required('Obecne hasło jest wymagane'),
  newPassword: yup
    .string()
    .min(8, 'Hasło musi składać się z min. 8 znaków')
    .required('Nowe hasło jest wymagane'),
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Hasła muszą się zgadzać')
    .required('Powtórz hasło'),
});

export const ProfileEditScreen: React.FC<ProfileEditScreenProps> = ({
  navigation,
}) => {
  const [mutate, mutation] = useProfileEditMutation();
  const [isPending, setPending] = useState(false);

  const {
    register,
    setValue,
    setError,
    errors,
    handleSubmit,
  } = useForm<ProfileEditFormData>({
    resolver: yupResolver(ProfileEditSchema),
  });

  useEffect(() => {
    register('name');
    register('actualPassword');
    register('newPassword');
    register('newPasswordConfirm');
  }, [register]);

  const onEdit = async ({ name, newPassword }: ProfileEditFormData) => {
    Keyboard.dismiss();
    setPending(true);

    try {
      await mutate({ name, newPassword });
      navigation.push('Profile');
    } catch (error) {
      setResponseErrors(error, setError);
    }
    setPending(false);
  };

  return (
    <>
      <HeaderWithAvatar color={theme.colors.primary} center>
        <View style={styles.title}>
          <Text style={styles.title}>Edycja profilu</Text>
        </View>
        <View style={styles.avatar}>
          <MyAvatar
            src="../assets/avatar.png"
            height={150}
            width={150}
            isBorder
          />
        </View>
      </HeaderWithAvatar>
      <ScrollView>
        <View style={styles.note}>
          <Text style={[TextStyle.noteH2]}>Zmiana danych</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.placeholder} />
          <AppInput
            style={{ marginBottom: 7 }}
            label="Nazwa użytkownika"
            error={!!errors.name}
            onChangeText={(text) => setValue('name', text)}
          />
          {!!errors.name && (
            <HelperText type="error" visible={!!errors.name}>
              {errors.name?.message}
            </HelperText>
          )}
          <AppInput
            secureTextEntry
            style={{ marginBottom: 7 }}
            label="Aktualne hasło"
            error={!!errors.actualPassword}
            onChangeText={(text) => setValue('actualPassword', text)}
          />
          {!!errors.actualPassword && (
            <HelperText type="error" visible={!!errors.actualPassword}>
              {errors.actualPassword?.message}
            </HelperText>
          )}
          <AppInput
            secureTextEntry
            style={{ marginBottom: 7 }}
            label="Nowe hasło"
            error={!!errors.newPassword}
            onChangeText={(text) => setValue('newPassword', text)}
          />
          {!!errors.newPassword && (
            <HelperText type="error" visible={!!errors.newPassword}>
              {errors.newPassword?.message}
            </HelperText>
          )}
          <AppInput
            secureTextEntry
            style={{ marginBottom: 7 }}
            label="Powtórz nowe hasło"
            error={!!errors.newPasswordConfirm}
            onChangeText={(text) => setValue('newPasswordConfirm', text)}
          />
          {!!errors.newPasswordConfirm && (
            <HelperText type="error" visible={!!errors.newPasswordConfirm}>
              {errors.newPasswordConfirm?.message}
            </HelperText>
          )}
        </View>
        <SubmitButton
          disabled={isPending}
          labelColor={useTheme().colors.white}
          backgroundColor={useTheme().colors.primary}
          mode="contained"
          onPress={handleSubmit(onEdit)}>
          Zapisz zmiany
        </SubmitButton>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  note: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 70,
  },
  title: {
    position: 'relative',
    top: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 0.95,
  },
  avatar: {
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: -60,
  },
  textInputStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: theme.colors.darkGray,
  },
  container: {
    top: 90,
    height: 390,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
