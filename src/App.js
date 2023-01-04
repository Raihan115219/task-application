import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className=" max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-center my-10 text-xl font-semibold">
          Please enter your name and pick the Sectors you are currently involved
          in.
        </h1>
      </div>
      <Home />
      <Toaster />
    </div>
  );
}

export default App;
