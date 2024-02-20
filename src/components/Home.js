import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import "../App.css";

function Home() {
  axios.defaults.withCredentials = true;

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

  const calTax = (e) => {
    //setDescription = e.target.description.value;
    console.log(e.target.role.value);
    e.preventDefault();
    axios
      .post("http://localhost:8000/taxcal", { salary: e.target.salary.value , role: e.target.role.value})
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
      axios
        .post("http://localhost:8000/save-salary", data)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

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


  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:8000/delete/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" bg-transparent">
      {auth ? (
        <div>
          <Header />

          <div className="px-14 py-6 text-slate-200 " id="heroImg">
            {/* <div>
              <h1>Welcome - {name}</h1>
              <h2>{id}</h2>
              <h2>{email}</h2>
            </div> */}

            {/* form */}

            <form
              onSubmit={calTax}
              //className="bg-slate-700 flex flex-col gap-5 py-10 lg:mx-10 rounded-xl "
              className="h-full w-full bg-gray-400 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100"
              method="post"
            >
              <div>
                <h2 className="my-10 text-center text-2xl font-bold  tracking-tight text-slate-300">
                  Calculate Your Real Income
                </h2>
              </div>

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


              <div className=" lg:flex justify-center gap-5">
                <div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-medium leading-6 text-slate-300 text-lg"
                    >
                      Total Income
                    </label>
                    <div className="mt-2">
                      <input
                        name="salary"
                        type="name"
                        required
                        className="block px-3 w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium leading-6 text-slate-300"
                  >
                    Income Note
                  </label>
                  <div className="mt-2">
                    <input
                      name="income"
                      type="text"
                      className="block px-3 w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center w-full gap-5 my-9">
                <button
                  className="text-lg font-bold w-56 bg-slate-900 px-5 py-2 rounded-lg"
                  type="submit"
                >
                  Calculate
                </button>
                <button
                  className="text-lg font-bold w-56 bg-slate-900 px-5 py-2 rounded-lg"
                  onClick={saveSalary}
                >
                  Save
                </button>
              </div>
            </form>

            <div
              //className=" flex flex-col mt-2 gap-5 py-10 items-center lg:mx-10 rounded-xl "
              className="flex flex-col mt-2 gap-5 py-10 items-center h-full w-full bg-gray-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100"
            >
              <label className="block text-lg font-medium leading-6 text-slate-300">
                Tax Amount: <span className="text-xl">{tax}</span>
              </label>

              <label className="block text-lg font-medium leading-6 text-slate-300">
                Home Salary: <span className="text-xl">{homeSalary}</span>
              </label>

              <label className="block text-lg font-medium leading-6 text-slate-300">
                EPF & ETF: <span className="text-xl">{totalEPF_ETF}</span>
              </label>

              
            </div>

            <div
              //className=" flex flex-col mt-2 gap-5 py-10 items-center lg:mx-10 rounded-xl "
              className="flex flex-col mt-2 gap-5 py-10 items-center h-full w-full bg-gray-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100"
            >
              <div>
                <h2 className="my-10 text-center text-2xl font-bold tracking-tight text-slate-300">
                  Calculated Salary Details
                </h2>

                <table className=" table w-full bg-slate-900 opacity-70 rounded-lg shadow-md overflow-hidden">
                  <thead className="table-header-group">
                    <tr className="bg-slate-600 table-row rounded-xl  ">
                      <th className="table-cell text-left px-2">Tno</th>
                      <th className="table-cell text-left px-2">Description</th>
                      <th className="table-cell text-left px-2">Salary</th>
                      <th className="table-cell text-left px-2">Tax</th>
                      <th className="table-cell text-left px-2">Home Salary</th>
                      <th className="table-cell text-left px-2">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="table-row-group">
                    {
                      //salary details
                      report.map((report, index) => (
                        <tr className="table-row" key={index}>
                          <td className="table-cell text-left px-2">{report.id}</td>
                          <td className="table-cell text-left px-2">{report.description}</td>
                          <td className="table-cell text-left px-2">{report.salary}</td>
                          <td className="table-cell text-left px-2">{report.tax}</td>
                          <td className="table-cell text-left px-2">{report.homeSalary}</td>
                          
                          <td className="table-cell text-left px-2">
                            {/* <Link to={`/edit/${id}`} className="bg-gray-700 px-2 mx-2 rounded-sm">
                              Edit
                            </Link> */}
                            <button onClick={() => deleteItem(report.id)} className="bg-gray-700 px-2 mx-2 rounded-sm border-l border-red-600">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

                
              </div>
            </div>

            {/* <div>
              <h1>Salary Details</h1>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>Tno</th>
                    <th>Description</th>
                    <th>Salary</th>
                    <th>Tax</th>
                    <th>Home Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    //salary details
                    report.map((report, index) => (
                      <tr key={index}>
                        <td>{report.id}</td>
                        <td>{report.description}</td>
                        <td>{report.salary}</td>
                        <td>{report.tax}</td>
                        <td>{report.homeSalary}</td>
                        <td>
                          <Link to={`/edit/${id}`} className=''>Edit</Link>
                          <Link to={`/delete/${id}`} className=''>Delete</Link>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div> */}
          </div>
          {/* <button onClick={okkama}>Okkama</button> */}
        </div>
      ) : (
        <div>
          <Header />

          <div
            style={{ height: "calc(100vh - 80px)" }}
            className="h-screen bg-slate-700 flex flex-col justify-center items-center"
          >
            <div className="border border-gray-100 py-10  rounded-xl bg-slate-500 max-w-lg  ">
              <h1 className="text-4xl font-bold text-slate-300 text-center py-4">
                Welcome to the Tax Management
              </h1>
              <div className=" flex justify-center gap-5">
                <Link
                  className="px-4 py-2 w-1/4 bg-slate-900 rounded-md text-center text-slate-300 font-bold"
                  to="/login"
                >
                  Sign In
                </Link>
                <Link
                  className="px-4 py-2 w-1/4 bg-slate-900 rounded-md text-center text-slate-300 font-bold"
                  to="/register"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
