import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

function Form({ sectors, setUser }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // form data get and post
  const onSubmit = (data) => {
    console.log(data);

    const userData = {
      nameFiled: data.nameFiled,
      sector: data.sector,
      checkbox: data.checkbox,
    };

    fetch("https://server-side-2-raihan115219.vercel.app/userData", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged === true) {
          toast.success("Saved");
          reset();
        }
      });
  };

  // ===========================

  return (
    <div>
      <form
        className="flex shadow-2xl py-10 flex-col px-5 md:px-10 gap-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-full"
            {...register("nameFiled", { required: true })}
          />
          {errors.nameFiled && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Sectors</span>
          </label>
          <select
            name=""
            id=""
            className="select select-bordered w-full"
            {...register("sector")}
          >
            <option defaultValue={"Select Sector"} disabled>
              Select Sector
            </option>
            {sectors[0]?.selectors?.map((selector, i) => (
              <option key={i} value={selector}>
                {selector}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            {...register("checkbox")}
            required
          />
          <span className="label-text">Agree with terms & conditions</span>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">submit</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
