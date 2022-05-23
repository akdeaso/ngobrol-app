import {firebase} from '@react-native-firebase/database';

export const DB = firebase
  .app()
  .database(
    'https://ngobrol-app-60e66-default-rtdb.asia-southeast1.firebasedatabase.app',
  );
