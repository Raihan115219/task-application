import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-hot-toast";
import Modal from "../Modal/Modal";

function Table({ sectors }) {
  const [user, setUser] = useState([]);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    fetch("https://server-side-2-raihan115219.vercel.app/userData")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, [user]);

  // delet user from datbase
  const handleDelete = (id) => {
    console.log("delete", id);
    fetch(`https://server-side-2-raihan115219.vercel.app/userData/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.error("Deleted");
        }
      });
  };

  // fetch single data using id
  const handleEdit = (id) => {
    console.log("delete", id);
    fetch(`https://server-side-2-raihan115219.vercel.app/userData/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("modal data", data);
        setModalData(data);
      });
  };

  return (
    <div className="table shadow-2xl">
      <table className="p-2 w-full md:w-[500px]">
        {/* <!-- head --> */}
        <thead className="p-6">
          <tr className=" py-8">
            <th>Name</th>
            <th>Sectors</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}
          {user?.map((user, i) => {
            return (
              <tr key={i}>
                <td>{user.nameFiled}</td>
                <td>{user.sector}</td>
                <td className="md:flex hidden">
                  <button
                    className="mr-4 w-6 h-6 cursor-pointer text-2xl"
                    onClick={() => handleDelete(user?._id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <label
                    htmlFor="my-modal-3"
                    className="text-2xl cursor-pointer"
                    onClick={() => handleEdit(user?._id)}
                  >
                    <BiEdit />
                  </label>
                </td>
                <td className="md:hidden flex justify-end items-center">
                  <div className="dropdown items-center dropdown-end">
                    <label htmlFor="" className=" ml-1 " tabIndex="0">
                      <BsThreeDotsVertical />
                    </label>
                    <ul
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                      tabIndex="0"
                    >
                      <button
                        className="btn btn-warning"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                      <label
                        htmlFor="my-modal-3"
                        className="btn-accent btn mt-2"
                        onClick={() => handleEdit(user._id)}
                      >
                        Edit
                      </label>
                    </ul>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        modalData={modalData}
        sectors={sectors}
        setModalData={setModalData}
      />
    </div>
  );
}

export default Table;
