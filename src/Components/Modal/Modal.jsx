import React from "react";
import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";

function Modal({ modalData, sectors, setModalData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const nameFiled = data.nameFiled;
    const sector = data.sector;
    const userData = {
      nameFiled,
      sector,
    };
    fetch(
      `https://server-side-2-raihan115219.vercel.app/userData/${modalData._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged === true) {
          toast.success("Edited");
          setModalData(null);
          reset();
        }
      });
  };

  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col py-5 gap-y-5"
            action=""
          >
            <h1>Edit Your Information</h1>
            <input
              required
              type="text"
              defaultValue={modalData?.nameFiled}
              className="input input-bordered w-full "
              {...register("nameFiled", { required: true })}
            />
            {errors.nameFiled && (
              <span className="text-red-600">
                You should have make a change over here
              </span>
            )}
            <select
              required
              className="select select-bordered w-full "
              {...register("sector", { required: true })}
            >
              <option defaultValue={modalData?.sector}>
                {modalData?.sector}
              </option>
              {sectors[0]?.selectors?.map((selector, i) => (
                <option key={i}>{selector}</option>
              ))}
            </select>

            <button
              type="submit"
              className="btn  bg-blue-600 hover:bg-blue-700  w-full"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
