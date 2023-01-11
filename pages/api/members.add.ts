// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import MemberCtrl from '@/controllers/member.ctrl';
import MemberModel from '@/models/member/member.model';
import { NextApiRequest, NextApiResponse } from "next";
import { addRequestMeta } from 'next/dist/server/request-meta';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const supportMethod = ['POST'];   // add.ts내에서는 POST request만 지원할 것임.
  try {
    if (supportMethod.indexOf(method!) === -1) {
      // 에러 반환
      
    }
    await MemberCtrl.add(req, res);
  } catch (err) {
    console.error(err);
    // 에러 처리
  }
} 