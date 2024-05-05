import { useEffect, useState } from "react";
import JobDetailCard, { TJobDetailCard } from "./components/JobDetailCard";
import SelectInput from "./components/SelectInput";
import LoadingCircle from "./components/LoadingCircle";

function App() {
  const numberOfCards = 12; // this can be change to get desired number of cards at a time
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardLength, setCardLength] = useState(numberOfCards);

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
        <SelectInput placeholder="Roles" minWidth={150} options={[]} isMulti />
        <SelectInput placeholder="Experience" options={[]} />
        <SelectInput placeholder="Remote" options={[]} isMulti />
        <SelectInput placeholder="Minimum Base Pay Salary" options={[]} />
        <input placeholder="Search Company Name or Location" />
      </div>
      {/* cards */}
      <div className="cards-container">
        {isLoading && !jobs.length ? (
          <LoadingCircle />
        ) : (
          jobs?.map((job: TJobDetailCard) => {
            return <JobDetailCard key={job?.jdUid} {...job} />;
          })
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
