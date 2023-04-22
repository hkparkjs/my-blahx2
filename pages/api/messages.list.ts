// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import checkSupportMethod from '@/controllers/error/check_support_method';
import handleError from '@/controllers/error/handle_error';
import MessageCtrl from '@/controllers/message.ctrl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const supportMethod = ['GET']; // add.ts내에서는 POST request만 지원할 것임.
  try {
    checkSupportMethod(supportMethod, method);
    await MessageCtrl.list(req, res);
  } catch (err) {
    console.error(err);
    // 에러 처리
    handleError(err, res);
  }
}
