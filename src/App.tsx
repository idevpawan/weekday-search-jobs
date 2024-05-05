import { useEffect, useRef, useState } from "react";
import JobDetailCard, { TJobDetailCard } from "./components/JobDetailCard";
import SelectInput from "./components/SelectInput";
import LoadingCircle from "./components/LoadingCircle";
import { basePayList, experienceList, rolesList, workMode } from "./dummyData";
import NothingFoundImg from "./assets/nothing-found.png";
import { filterJobCards } from "./utils";

function App() {
  const numberOfCards = 12; // this can be change to get desired number of cards at a time
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cardLength, setCardLength] = useState<number>(0);
  const [newOffsetValue, setnewOffsetValue] = useState<number>(0);
  const [filters, setFilters] = useState({
    jobRole: [],
    minExp: undefined,
    location: [],
    minJdSalary: undefined,
    companyName: "",
  });
  const observerTarget = useRef(null);

  const handleRoleChange = (selectedRoles: any) => {
    const roles = selectedRoles.map((role: { value: any }) => role.value);
    setFilters((prevFilters) => ({ ...prevFilters, jobRole: roles }));
  };

  const handleExpChange = (selectedExp: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, minExp: selectedExp }));
  };

  const handleCoNameChange = (value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, companyName: value }));
  };

  const handleRemoteChange = (selectedRemote: any) => {
    const remoteOptions = selectedRemote.map((remote: any) => remote.value);
    setFilters((prevFilters) => ({ ...prevFilters, location: remoteOptions }));
  };

  const handleSalaryChange = (selectedSalary: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minJdSalary: selectedSalary,
    }));
  };

  const filteredJobCards = filterJobCards(jobs, filters);

  const fetchJobs = async () => {
    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: numberOfCards,
      offset: cardLength, // fetching only next 12 items
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      const data = await response.json();
      // keeping the previous values with new values
      setJobs((prevItems: any[]) => [...prevItems, ...data.jdList]);
      // const newOffest = cardLength + data.jdList.length;
      setnewOffsetValue((prev) => prev + data.jdList.length);
      setCardLength(cardLength + data.jdList.length);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchJobs();
        }
      },
      { threshold: 1 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, newOffsetValue]);

  return (
    <div>
      <p className="search-jobs-text">Search Jobs</p>
      {/* filters */}
      <div className="filters-container">
        <SelectInput
          onValueChange={handleRoleChange}
          placeholder="Roles"
          minWidth={150}
          options={rolesList}
          isMulti
        />
        <SelectInput
          onValueChange={handleExpChange}
          placeholder="Experience"
          options={experienceList}
        />
        <SelectInput
          onValueChange={handleRemoteChange}
          placeholder="Remote"
          options={workMode}
          isMulti
        />
        <SelectInput
          placeholder="Minimum Base Pay Salary"
          options={basePayList}
          onValueChange={handleSalaryChange}
        />
        <input
          placeholder="Search Company Name"
          onChange={(e) => handleCoNameChange(e.target.value)}
        />
      </div>
      {/* cards */}
      <div className="cards-container">
        {isLoading && !jobs.length ? (
          <LoadingCircle />
        ) : filteredJobCards.length > 0 ? (
          filteredJobCards?.map((job: TJobDetailCard, i) => {
            return <JobDetailCard key={i} {...job} />;
          })
        ) : (
          <div className="nothing-found">
            <img src={NothingFoundImg} alt="" />
            <p>No Jobs available for this category at the moment</p>
          </div>
        )}
      </div>
      {!filters.companyName.length && <div ref={observerTarget}></div>}
      {isLoading && jobs.length ? (
        <div className="infinite-loader-container">
          <LoadingCircle />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
