import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../db";
import { performance } from "perf_hooks";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(process.env.VERCEL_REGION);
  var t0 = performance.now();
  const sub = await prisma.subreddit.findUnique({
    where: { name: String(req.query.name) },
    include: {
      posts: {
        include: { subreddit: true, user: true, votes: true },
      },
      joinedUsers: true,
    },
  });
  var t1 = performance.now();
  console.log(sub);
  console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
  return res.json({
    timeItTook: t1 - t0,
  });
};

export default handler;
