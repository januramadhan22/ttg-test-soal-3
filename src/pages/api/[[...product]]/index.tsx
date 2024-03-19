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
    const products = await retrieveData("products");
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "success",
      data: products,
    });
  } else if (req.method === "POST") {
    const { data } = req.body;
    const token: any = req.headers.authorization?.split(" ")[1];
    data.created_at = new Date();

    jwt.verify(
      token,
      process.env.NEXT_AUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await addData("products", data, (result: boolean) => {
            if (result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Successfully add product",
                data: data,
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Failed add product",
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
  } else if (req.method === "PUT") {
    const { product }: any = req.query;
    const { data } = req.body;
    const token: any = req.headers.authorization?.split(" ")[1];
    jwt.verify(
      token,
      process.env.NEXT_AUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await updateData("products", product[1], data, (result: boolean) => {
            if (result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Successfully edit product",
                data: data,
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Failed edit product",
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
    const { product }: any = req.query;
    const token: any = req.headers.authorization?.split(" ")[1];
    jwt.verify(
      token,
      process.env.NEXT_AUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await deleteData("products", product[1], (result: boolean) => {
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
