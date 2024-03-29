import type { NextApiRequest, NextApiResponse } from 'next';
import {
  addMember,
  deleteMember,
  getAllMembers,
  getMembers,
  updateMember,
} from '../../firebase/member';
import { Member } from '../../fixtures/Members';
import { MemberApiResult } from './types/members';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return await apiGetMembers(req, res);
    case 'POST':
      return await apiCreateMember(req, res);
    case 'PUT':
      return await apiUpdateMember(req, res);
    case 'DELETE':
      return await apiDeleteMember(req, res);
    default:
      return res.status(501).send({});
  }
};

const apiGetMembers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { classOf } = req.query;
  let members: Member[] = [];
  if (typeof classOf === 'string') {
    members = await getMembers(classOf);
  } else {
    members = await getAllMembers();
  }
  return res.status(200).json(members);
};

const apiCreateMember = async (
  req: NextApiRequest,
  res: NextApiResponse<MemberApiResult>
) => {
  const values = await req.body;
  const result: MemberApiResult = await addMember(values);
  const status = result.success ? 200 : 500;

  return res.status(status).send(result);
};

const apiUpdateMember = async (
  req: NextApiRequest,
  res: NextApiResponse<MemberApiResult>
) => {
  const member: Member = await req.body;
  const result = await updateMember(member.id, member);
  const status = result.success ? 200 : 500;

  return res.status(status).send(result);
};

const apiDeleteMember = async (
  req: NextApiRequest,
  res: NextApiResponse<MemberApiResult>
) => {
  // Delete a single member
  const memberId: string = await req.body.id;

  const result: MemberApiResult = await deleteMember(memberId);
  const status = result.success ? 200 : 500;

  // Send response
  return res.status(status).send(result);
};
