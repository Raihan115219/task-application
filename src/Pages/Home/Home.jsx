import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Form from "../../Components/Form/Form";
import Modal from "../../Components/Modal/Modal";
import Table from "../../Components/Table/Table";
import styles from "./Home.module.css";

function Home() {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    fetch("https://server-side-2-raihan115219.vercel.app/sectors")
      .then((res) => res.json())
      .then((data) => {
        setSectors(data);
      });
  }, []);
  console.log(sectors);

  // ======================

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 md:px-20">
        <Form sectors={sectors} />

        <div className="px-1 py-5 md:px-10">
          <Table sectors={sectors} />
        </div>
      </div>
    </div>
  );
}

export default Home;
