// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import checkSupportMethod from '@/controllers/error/check_support_method';
import handleError from '@/controllers/error/handle_error';
import MessageCtrl from '@/controllers/message.ctrl';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const supportMethod = ['POST'];   // add.ts내에서는 POST request만 지원할 것임.
  try {
    checkSupportMethod(supportMethod, method);
    await MessageCtrl.postReply(req, res);
  } catch (err) {
    console.error(err);
    // 에러 처리
    handleError(err, res);
  }
}