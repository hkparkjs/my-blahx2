import MemberModel from '@/models/member/member.model';
import { NextApiRequest, NextApiResponse } from "next";

async function add(req: NextApiRequest, res: NextApiResponse) {
  const {
    uid,
    email,
    displayName,
    photoURL
  } = req.body;

  if (uid === undefined || uid === null) {
    res.status(400).json({ result: false, message: 'uid가 누락되었습니다.' });
  }
  if (email === undefined || email === null) {
    res.status(400).json({ result: false, message: 'email이 누락되었습니다.' });
  }

  const addResult = await MemberModel.add({ uid, email, displayName, photoURL });
  if (addResult.result === true) {
    return res.status(200).json(addResult);
  } else {
    return res.status(500).json(addResult);
  }
}

const MemberCtrl = {
  add,
};

export default MemberCtrl;