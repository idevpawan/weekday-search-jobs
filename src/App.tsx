import { useEffect, useState } from "react";
import JobDetailCard, { TJobDetailCard } from "./components/JobDetailCard";
import SelectInput from "./components/SelectInput";
import LoadingCircle from "./components/LoadingCircle";
import { basePayList, experienceList, rolesList, workMode } from "./dummyData";
import NothingFoundImg from "./assets/nothing-found.png";

export enum FilterType {
  COMPANY_NAME = "companyName",
  MIN_EXP = "minExp",
  MIN_SALARY = "minJdSalary",
  LOCATION = "location",
  JOB_ROLE = "jobRole",
}

export type FilterOptions = {
  [FilterType.COMPANY_NAME]?: string;
  [FilterType.MIN_EXP]?: number;
  [FilterType.MIN_SALARY]?: number;
  [FilterType.LOCATION]?: string[];
  [FilterType.JOB_ROLE]?: string[];
};

export function filterJobCards(
  jobCards: TJobDetailCard[],
  filters: FilterOptions
): TJobDetailCard[] {
  return jobCards.filter((jobCard) => {
    if (
      filters.companyName &&
      !jobCard.companyName
        .toLowerCase()
        .includes(filters.companyName.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.minExp !== undefined &&
      jobCard.minExp !== null &&
      jobCard.minExp < filters.minExp
    ) {
      return false;
    }
    if (
      filters.minJdSalary !== undefined &&
      jobCard.minJdSalary !== null &&
      jobCard.minJdSalary < filters.minJdSalary
    ) {
      return false;
    }
    if (
      filters.location &&
      filters.location.length > 0 &&
      filters.location.every((loc) => loc.toLowerCase() === "remote") &&
      jobCard.location.toLowerCase() !== "remote"
    ) {
      return false;
    }
    if (
      filters.location &&
      filters.location.length > 0 &&
      !filters.location.some((loc) => loc.toLowerCase() === "remote") &&
      jobCard.location.toLowerCase() === "remote"
    ) {
      return false;
    }
    if (
      filters.jobRole &&
      filters.jobRole.length > 0 &&
      !filters.jobRole.some((role) =>
        jobCard.jobRole.toLowerCase().includes(role.toLowerCase())
      )
    ) {
      return false;
    }
    return true;
  });
}

function App() {
  const numberOfCards = 12; // this can be change to get desired number of cards at a time
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardLength, setCardLength] = useState(numberOfCards);
  const [filters, setFilters] = useState({
    jobRole: [],
    minExp: undefined,
    location: [],
    minJdSalary: undefined,
    companyName: "",
  });

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
      offset: cardLength - numberOfCards, // fetching only next 12 items
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
      setCardLength((prevValue) => prevValue + numberOfCards);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!jobs.length && !isLoading) {
      fetchJobs();
    }
  }, [jobs, isLoading]);

  // infinite scrolling
  const handleScroll = () => {
    // checking if user reaches the end of the page and fetching items
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchJobs();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // listening scroll event
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

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
