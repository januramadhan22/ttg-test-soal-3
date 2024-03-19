import AdminLayout from "@/components/layouts/admin";
import CustomBreadcupms from "@/components/ui/breadcumps";
import userServices from "@/services/user/service";
import { handleConvertTimestamp } from "@/utils/hooks/helper";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BiSolidEdit, BiSolidTrash } from "react-icons/bi";

const AdminMembersPage = () => {
  const { data }: any = useSession();

  const [users, setUsers] = useState([]);

  const handleGetAllUsers = async () => {
    try {
      const response = await userServices.getAllUsers(data?.accessToken);
      if (response.status === 200) {
        setUsers(response.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="w-full h-auto flex flex-col gap-4">
        <div className="w-full py-4 flex justify-between items-center">
          <CustomBreadcupms />
        </div>
        <div className="w-full">
          <table className="w-full table-auto border-collapse rounded-lg border border-red-100">
            <thead className="text-white font-medium bg-primary-red">
              <tr>
                <th className="w-[40px] px-2 py-2  border border-red-100">
                  No.
                </th>
                <th className="px-2 py-2 border border-red-100">Email</th>
                <th className="px-2 py-2 border border-red-100">Phonenumber</th>
                <th className="px-2 py-2 border border-red-100">Created At</th>
                <th className="px-2 py-2 border border-red-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.length !== 0 &&
                users?.map((user: any, index: number) => (
                  <tr
                    key={index}
                    className="text-center text-primary-red font-medium bg-red-50"
                  >
                    <td className="px-2 py-2 border border-red-100">
                      {index + 1}.
                    </td>
                    <td className="px-2 py-2 border border-red-100">
                      {user?.email}
                    </td>
                    <td className="px-2 py-2 border border-red-100">
                      {user?.phonenumber}
                    </td>
                    <td className="px-2 py-2 border border-red-100">
                      {handleConvertTimestamp(user?.created_at)}
                    </td>
                    <td className="px-2 py-2 flex justify-center gap-4 text-xl">
                      <button
                        title="Edit"
                        className="p-2 rounded bg-yellow-500 text-white"
                      >
                        <BiSolidEdit />
                      </button>
                      <button
                        title="Delete"
                        className="p-2 rounded bg-primary-red text-white"
                      >
                        <BiSolidTrash />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {users?.length === 0 && (
            <div className="w-full h-[200px] flex justify-center items-center text-center">
              <h3 className="text-xl text-red-300">No any member registered</h3>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMembersPage;
