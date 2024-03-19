import {
  addData,
  deleteData,
  retrieveData,
  retrieveDataById,
  updateData,
} from "@/lib/firebase/services";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token: any = req.headers.authorization?.split(" ")[1];
    jwt.verify(
      token,
      process.env.NEXT_AUTH_SECRET || "",
      async (err: any, decoded: any) => {
        const user = await retrieveDataById("users", decoded.id);
        if (user) {
          res.status(200).json({
            status: true,
            statusCode: 200,
            message: "success",
            data: user.cart,
          });
        }
      }
    );
  } else if (req.method === "PUT") {
    const { data } = req.body;
    const token: any = req.headers.authorization?.split(" ")[1];
    jwt.verify(
      token,
      process.env.NEXT_AUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "member") {
          await updateData(
            "users",
            decoded.id,
            { ...decoded, cart: data },
            (result: boolean) => {
              if (result) {
                res.status(200).json({
                  status: true,
                  statusCode: 200,
                  message: "Successfully edit user",
                });
              } else {
                res.status(400).json({
                  status: false,
                  statusCode: 400,
                  message: "Failed edit user",
                });
              }
            }
          );
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
