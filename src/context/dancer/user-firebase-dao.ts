import firebase from 'firebase';
import { ok, Result } from 'types/result';

import { DefaultDancer } from './constants';
import { Dancer, DancersDao } from './types';

const userFirebaseDao = (firebaseApp: firebase.app.App): DancersDao => {
  const storage = firebaseApp.storage();
  const get = async (id: string): Promise<Result<Error, Dancer>> => {
    const currentAuthUser = firebaseApp.auth().currentUser;
    const user: Dancer = { ...DefaultDancer };
    if (!currentAuthUser) return ok(user);

    return firebaseApp
      .database()
      .ref(`users/${id}`)
      .get()
      .then(async (snap: firebase.database.DataSnapshot) => {
        user.ddrName = snap.child('dancerName').val();
        user.ddrCode = snap.child('dancerId').val();
        user.state = snap.child('state').val();
        user.primaryMachine = snap.child('pmachine').val();
        user.userName = snap.child('userName').val();

        try {
          const profilePictureSnap = await storage
            .ref(`${id} - images/ProfilePicture`)
            .getDownloadURL();
          user.profilePictureUrl = profilePictureSnap;
        } catch {
          user.profilePictureUrl = '';
        }

        return ok(user);
      });
  };

  const update = async (user: Dancer): Promise<Result<Error, boolean>> => {
    const currentAuthUser = firebaseApp.auth().currentUser;
    if (!currentAuthUser) return ok(false);

    await firebaseApp.database().ref(`users/${currentAuthUser.uid}`).update({
      ddrName: user.ddrName,
      ddrId: user.ddrCode,
      state: user.state,
      pmachine: user.primaryMachine,
      userName: user.userName,
    });

    if (user.newProfilePicture.size !== 0) {
      await storage
        .ref(`${currentAuthUser.uid} - images/ProfilePicture`)
        .put(user.newProfilePicture);
    }

    return ok(true);
  };

  return {
    get,
    update,
  };
};

export default userFirebaseDao;
