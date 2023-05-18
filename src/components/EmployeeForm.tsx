import * as React from 'react';
import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {launchImageLibrary, Asset} from 'react-native-image-picker';

import Input from './ui/Input';
// @ts-ignore
import Button from './ui/Button';
import {getFormattedDate} from '../utils/date';
import {GlobalStyles} from '../constants/styles';
import {Employee} from '../store/employees-context';
import PlaceholderUser from '../../assets/images/user-placeholder.png';

type Props = {
  submitButtonLabel: string;
  onSubmit: (employee: Employee) => void;
  onCancel: () => void;
  editedEmployee: Employee | undefined;
};

export default function EmployeeForm({
  submitButtonLabel,
  onSubmit,
  onCancel,
  editedEmployee,
}: Props) {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: {
      value: editedEmployee ? editedEmployee.firstName : '',
      isValid: true,
    },
    lastName: {
      value: editedEmployee ? editedEmployee.lastName : '',
      isValid: true,
    },
    birthDate: {
      value: editedEmployee ? getFormattedDate(editedEmployee.birthDate) : '',
      isValid: true,
    },
    location: {
      value: editedEmployee ? editedEmployee.location : '',
      isValid: true,
    },
    title: {
      value: editedEmployee ? editedEmployee.title : '',
      isValid: true,
    },
    department: {
      value: editedEmployee ? editedEmployee.department : '',
      isValid: true,
    },
    email: {
      value: editedEmployee ? editedEmployee.email : '',
      isValid: true,
    },
  });
  const [image, setImage] = useState<{
    profileImage: string | undefined;
    assetImage: Asset;
    isChanged: boolean;
  }>({
    profileImage: editedEmployee ? editedEmployee.profileImage : undefined,
    assetImage: {},
    isChanged: false,
  });

  const inputChangedHandler = (
    inputIdentifier: string,
    enteredValue: string | {},
    isValid: boolean = true,
  ) => {
    setInputs(current => {
      return {
        ...current,
        [inputIdentifier]: {value: enteredValue, isValid: isValid},
      };
    });
  };

  const submitHandler = () => {
    const employee: Employee = {
      firstName: inputs.firstName.value,
      lastName: inputs.lastName.value,
      birthDate: new Date(inputs.birthDate.value).toString(),
      location: inputs.location.value,
      title: inputs.title.value,
      department: inputs.department.value,
      email: inputs.email.value,
    };

    if (image.isChanged) {
      employee.updateImage = image.assetImage;
    }

    const firstNameIsValid = employee.firstName.trim().length > 0;
    const lastNameIsValid = employee.lastName.trim().length > 0;
    const dateIsValid = employee.birthDate.toString() !== 'Invalid Date';
    const locationIsValid = employee.location.trim().length > 0;
    const titleIsValid = employee.title.trim().length > 0;
    const departmentIsValid = employee.department.trim().length > 0;

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const emailIsValid = emailRegex.test(employee.email);

    if (
      !firstNameIsValid ||
      !lastNameIsValid ||
      !dateIsValid ||
      !locationIsValid ||
      !titleIsValid ||
      !departmentIsValid ||
      !emailIsValid
    ) {
      setInputs(current => {
        return {
          firstName: {
            value: current.firstName.value,
            isValid: firstNameIsValid,
          },
          lastName: {
            value: current.lastName.value,
            isValid: lastNameIsValid,
          },
          birthDate: {
            value: current.birthDate.value,
            isValid: dateIsValid,
          },
          location: {
            value: current.location.value,
            isValid: locationIsValid,
          },
          title: {
            value: current.title.value,
            isValid: titleIsValid,
          },
          department: {
            value: current.department.value,
            isValid: departmentIsValid,
          },
          email: {
            value: current.email.value,
            isValid: emailIsValid,
          },
        };
      });

      return;
    }

    onSubmit(employee);
  };

  const formIsInvalid =
    !inputs.firstName.isValid ||
    !inputs.lastName.isValid ||
    !inputs.birthDate.isValid ||
    !inputs.location.isValid ||
    !inputs.title.isValid ||
    !inputs.department.isValid ||
    !inputs.email.isValid;

  const imageStyles = ({pressed}: PressableStateCallbackType) => {
    let style: StyleProp<ViewStyle> = [styles.imageRow];

    pressed && style.push(styles.pressed);

    return style;
  };

  const onImagePress = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (result.assets && result.assets.length > 0) {
      setImage(current => {
        return {
          ...current,
          // @ts-ignore
          assetImage: result.assets[0],
          isChanged: true,
        };
      });
    }
  };

  return (
    <View>
      <Pressable style={imageStyles} onPress={onImagePress}>
        <Image
          source={{
            uri: image.isChanged ? image.assetImage.uri : image.profileImage,
          }}
          style={styles.image}
          defaultSource={PlaceholderUser}
        />
      </Pressable>
      <View style={styles.inputsRow}>
        <Input
          label={'First Name'}
          inValid={!inputs.firstName.isValid}
          textInputConfig={{
            keyboardType: 'default',
            placeholder: 'Faysal',
            // @ts-ignore
            onChangeText: inputChangedHandler.bind(this, 'firstName'),
            value: inputs.firstName.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label={'Last Name'}
          inValid={!inputs.lastName.isValid}
          textInputConfig={{
            keyboardType: 'default',
            placeholder: 'Berjawi',
            // @ts-ignore
            onChangeText: inputChangedHandler.bind(this, 'lastName'),
            value: inputs.lastName.value,
          }}
          style={styles.rowInput}
        />
      </View>
      <View style={styles.inputsRow}>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={
            inputs.birthDate.value
              ? new Date(inputs.birthDate.value)
              : new Date()
          }
          maximumDate={new Date()}
          onConfirm={date => {
            setOpen(false);
            inputChangedHandler('birthDate', getFormattedDate(date.toString()));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Input
          label={'Birth Date'}
          inValid={!inputs.birthDate.isValid}
          textInputConfig={{
            keyboardType: 'default',
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: inputs.birthDate.value,
            editable: false,
            onPressIn: () => setOpen(true),
          }}
          style={styles.rowInput}
        />
        <Input
          label={'Location'}
          inValid={!inputs.location.isValid}
          textInputConfig={{
            keyboardType: 'default',
            placeholder: 'Lebanon',
            // @ts-ignore
            onChangeText: inputChangedHandler.bind(this, 'location'),
            value: inputs.location.value,
          }}
          style={styles.rowInput}
        />
      </View>
      <View style={styles.inputsRow}>
        <Input
          label={'Title'}
          inValid={!inputs.title.isValid}
          textInputConfig={{
            keyboardType: 'default',
            placeholder: 'Game Developer',
            // @ts-ignore
            onChangeText: inputChangedHandler.bind(this, 'title'),
            value: inputs.title.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label={'Department'}
          inValid={!inputs.department.isValid}
          textInputConfig={{
            keyboardType: 'default',
            placeholder: 'Development',
            // @ts-ignore
            onChangeText: inputChangedHandler.bind(this, 'department'),
            value: inputs.department.value,
          }}
          style={styles.rowInput}
        />
      </View>
      <View style={styles.inputsRow}>
        <Input
          label={'email'}
          inValid={!inputs.email.isValid}
          textInputConfig={{
            keyboardType: 'email-address',
            placeholder: 'mohammedaminberjawi@gmail.com',
            autoCorrect: false,
            autoCapitalize: 'none',
            // @ts-ignore
            onChangeText: inputChangedHandler.bind(this, 'email'),
            value: inputs.email.value,
          }}
          style={styles.rowInput}
        />
      </View>
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your data!
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.errorLight,
    margin: 8,
  },
});
