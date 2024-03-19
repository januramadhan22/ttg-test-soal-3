import {
  addData,
  deleteData,
  retrieveData,
  updateData,
} from "@/lib/firebase/services";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await retrieveData("users");
    const members = users.filter((user: any) => user.role === "member");
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "success",
      data: members,
    });
  } else if (req.method === "PUT") {
    const { user }: any = req.query;
    const { data } = req.body;
    const token: any = req.headers.authorization?.split(" ")[1];
    jwt.verify(
      token,
      process.env.NEXT_AUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          data.updated_at = new Date();

          await updateData("users", user[1], data, (result: boolean) => {
            if (result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Successfully edit user",
                data: data,
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Failed edit user",
              });
            }
          });
        } else {
          res.status(403).json({
            status: false,
            statusCode: 403,
            message: "Access denied",
          });
        }
      }
    );
  } else if (req.method === "DELETE") {
    const { user }: any = req.query;
    const token: any = req.headers.authorization?.split(" ")[1];
    jwt.verify(
      token,
      process.env.NEXT_AUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await deleteData("users", user[1], (result: boolean) => {
            if (result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "failed",
              });
            }
          });
        } else {
          res.status(403).json({
            status: false,
            statusCode: 403,
            message: "Access denied",
          });
        }
      }
    );
  }
}
