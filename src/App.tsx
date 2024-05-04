import { useEffect, useState } from "react";
import JobDetailCard, { TJobDetailCard } from "./components/JobDetailCard";
import SelectInput from "./components/SelectInput";

function App() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setJobs(result.jdList))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  console.log(jobs);

  return (
    <div>
      <p className="search-jobs-text">Search Jobs</p>
      {/* filters */}
      <div className="filters-container">
        <SelectInput placeholder="Roles" minWidth={150} options={[]} isMulti />
        <SelectInput placeholder="Number Of Employees" options={[]} isMulti />
        <SelectInput placeholder="Experience" options={[]} />
        <SelectInput placeholder="Remote" options={[]} isMulti />
        <SelectInput placeholder="Tech Stack" options={[]} isMulti />
        <SelectInput placeholder="Minimum Base Pay Salary" options={[]} />
        <input placeholder="Search Company Name" />
      </div>
      {/* cards */}
      <div className="cards-container">
        {jobs.map((job: TJobDetailCard) => {
          return <JobDetailCard key={job?.jdUid} {...job} />;
        })}
      </div>
    </div>
  );
}

export default App;
