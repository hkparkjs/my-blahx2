import FirebaseAdmin from '../firebase_admin';
import { InAuthUser } from '../in_auth_user';

const MEMBER_COL = 'members';
const SCR_NAME_COL = 'screen_names';

type AddResult = {result: true; id: string} | {result: false; message: string};

async function add({uid, displayName, photoURL, email}:InAuthUser): Promise<AddResult> {
  try {
    // const addResult = await FirebaseAdmin.getInstance()
    //   .Firebase.collection('members')
    //   .doc(uid)
    //   .set({
    //     uid,
    //     email: email,
    //     displayName: displayName ?? '',
    //     photoURL: photoURL ?? ''
    //   });
      const screenName = (email as string).replace('@gmail.com', ''); 
    // await FirebaseAdmin.getInstance()
    //   .Firebase.collection('screen_names')
    //   .doc(screenName)
    //   .set({
    //     uid,
    //     email: email,
    //     displayName: displayName ?? '',
    //     photoURL: photoURL ?? ''
    //   });
      const addResult = await FirebaseAdmin.getInstance().Firebase.runTransaction(async (transaction) => {
        const memberRef = FirebaseAdmin.getInstance().Firebase.collection(MEMBER_COL).doc(uid);
        const screenNamesRef = FirebaseAdmin.getInstance().Firebase.collection(SCR_NAME_COL).doc(screenName);
        const memberDoc = await transaction.get(memberRef);

        if (memberDoc.exists) {
          // 이미 추가된 상태
          return false;
        }
        const addData = {
          uid,
          email: email,
          displayName: displayName ?? '',
          photoURL: photoURL ?? ''
        };
        await transaction.set(memberRef, addData);
        await transaction.set(screenNamesRef, addData);
        return true;
      });
      if (addResult === false) {
        return { result: true, id: uid };
      }
      return { result: true, id: uid };
  } catch (err) {
    console.error(err);
    return { result: false, message: '서버 에러' }; 
  }
} 

const MemberModel = {
  add,
}

export default MemberModel;