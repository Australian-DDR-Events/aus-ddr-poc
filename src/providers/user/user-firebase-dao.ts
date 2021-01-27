import firebase from 'firebase';
import { ok, Result } from '../../common/Result';
import { User, UserDao } from './types';

const userFirebaseDao = (firebaseApp: firebase.app.App): UserDao => {
  const storage = firebaseApp.storage();
  const get = async (id: string): Promise<Result<Error, User>> => {
    const currentAuthUser = firebaseApp.auth().currentUser;
    const user: User = {
      dancerId: '',
      dancerName: '',
      displayName: '',
      primaryMachine: '',
      profilePicture: '',
      state: '',
      userName: '',
    };
    if (!currentAuthUser) return ok(user);

    return firebaseApp
      .database()
      .ref(`users/${id}`)
      .get()
      .then(async (snap: firebase.database.DataSnapshot) => {
        user.dancerName = snap.child('dancerName').val();
        user.dancerId = snap.child('dancerId').val();
        user.state = snap.child('state').val();
        user.primaryMachine = snap.child('pmachine').val();

        user.userName = id;
        user.displayName = currentAuthUser.displayName ?? '';

        try {
          const profilePictureSnap = await storage
            .ref(
              `${currentAuthUser.displayName} - ${id} - images/ProfilePicture`,
            )
            .getDownloadURL();
          user.profilePicture = profilePictureSnap;
        } catch {
          user.profilePicture = '';
        }

        return ok(user);
      });
  };

  const update = async (user: User): Promise<Result<Error, boolean>> => {
    const currentAuthUser = firebaseApp.auth().currentUser;
    if (!currentAuthUser) return ok(false);

    await firebaseApp.database().ref(`users/${currentAuthUser.uid}`).update({
      dancerName: user.dancerName,
      dancerId: user.dancerId,
      state: user.state,
      pmachine: user.primaryMachine,
    });

    await currentAuthUser.updateProfile({
      displayName: user.displayName,
    });

    await storage
      .ref(`${currentAuthUser.uid} - images/ProfilePicture`)
      .putString(user.profilePicture);

    return ok(true);
  };

  return {
    get,
    update,
  };
};

export default userFirebaseDao;