import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import "../App.css";

function Home() {
  // Set the default value of withCredentials to true for axios requests
  axios.defaults.withCredentials = true;

  // State variables to store user authentication, name, email, id, tax, description, salary, report, homeSalary, and totalEPF_ETF
  const [auth, setAuth] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [tax, setTax] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [report, setReport] = useState([]);
  const [homeSalary, setHomeSalary] = useState("");
  const [totalEPF_ETF, setTotalEPF_ETF] = useState("");

  // useEffect hook to fetch user data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8000")
      .then((res) => {
        if (res.data.auth) {
          setAuth(true);
          setName(res.data.name);
          setEmail(res.data.email);
          setId(res.data.id);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to calculate tax and other related values based on the provided salary and role
  const calTax = (e) => {
    // Prevent form submission
    e.preventDefault();

    // Post request to the server to calculate tax and other related values
    axios
      .post("http://localhost:8000/taxcal", { salary: e.target.salary.value, role: e.target.role.value })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setTotalEPF_ETF(res.data.totalEPF_ETF)
          setTax(res.data.tax);
          setHomeSalary(res.data.homeSalary);
        }
      })
      .catch((err) => console.log(err));
  };

  // Function to save the calculated salary to the server
  const saveSalary = () => {
    if (description === "" || salary === "") {
      alert("Please fill out Income");
    } else {
      let data = {
        id: id,
        description: description,
        tax: tax,
        salary: salary,
        homeSalary: homeSalary,
      };

      // Post request to the server to save the salary
      axios
        .post("http://localhost:8000/save-salary", data)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  // useEffect hook to fetch the report data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8000/report", { params: { id: id } })
      .then((res) => {
        if (res.status === 200) {
          setReport(res.data);
        } else {
          console.log("Error");
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Function to delete a report item
  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:8000/delete/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // JSX code to render the component
  return (
    <div className=" bg-transparent">
      {auth ? (
        // Authenticated user UI
        <div>
          <Header />

          <div className="px-14 py-6 text-slate-200 " id="heroImg">
            {/* User welcome message */}
            {/* <div>
              <h1>Welcome - {name}</h1>
              <h2>{id}</h2>
              <h2>{email}</h2>
            </div> */}

            {/* Form to calculate tax and other related values */}
            <form
              onSubmit={calTax}
              className="h-full w-full bg-gray-400 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100"
              method="post"
            >
              <div>
                <h2 className="my-10 text-center text-2xl font-bold tracking-tight text-slate-300">
                  Calculate Your Real Income
                </h2>
              </div>

              {/* Radio buttons to select the role */}
              <div className="flex flex-col justify-center items-center">
                <div className="flex gap-5 items-baseline">
                  <label>Employer</label>
                  <input type="radio" name="role" value="employer" />
                </div>
                <div className="flex gap-5 items-baseline">
                  <label>Employee</label>
                  <input type="radio" name="role" value="employee" />
                </div>
              </div>

              {/* Input fields to enter the salary and description */}
              <div className=" lg:flex justify-center gap-5">
                <div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-medium leading-6 text-slate-300
