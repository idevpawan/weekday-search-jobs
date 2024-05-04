import { useEffect, useRef, useState } from "react";

export type TJobDetailCard = {
  companyName: string;
  jdLink: string;
  jdUid: string;
  jobDetailsFromCompany: string;
  jobRole: string;
  location: string;
  logoUrl: string;
  maxExp: number | null;
  maxJdSalary: number | null;
  minExp: number | null;
  minJdSalary: number | null;
  salaryCurrencyCode: string;
};

function JobDetailCard(props: TJobDetailCard) {
  const [isExpandedContainer, setIsExpandedContainer] = useState(false);
  const heightRef = useRef(null) as any;

  useEffect(() => {
    // checking if the about us container height exceeds 250px
    // if it's exceeding then changing the state of isExpandedContainer to true
    if (heightRef.current?.offsetHeight > 250) {
      setIsExpandedContainer(true);
    }
  }, []);

  return (
    <div className="job-box">
      <div className="container">
        {/* posted date */}
        <div className="posted_text">
          <p>⏳ Posted 3 days ago</p>
        </div>
        {/* company and job title */}
        <div className="company-job-info">
          {/* company logo */}
          <img
            onError={(e) => (e.currentTarget.src = "")}
            src={props.logoUrl}
            alt="logo"
          />
          <div>
            {/* company name */}
            <p className="company-name">{props.companyName}</p>
            {/* job title */}
            <p className="job-title">{props.jobRole}</p>
            {/* location */}
            <p className="location">{props.location}</p>
          </div>
        </div>
        {/* Estimated Salary */}
        {props.maxJdSalary ? (
          <p className="estimated-salary">
            Estimated Salary:{" "}
            {props.minJdSalary ? `₹${props.minJdSalary} -` : "Max"}{" "}
            {props.maxJdSalary} LPA ✅
          </p>
        ) : (
          <p className="estimated-salary">
            Estimated Salary:{" "}
            {props.minJdSalary ? `Max ₹${props.minJdSalary} LPA ✅` : "N/A"}
          </p>
        )}
        {/* About company */}
        <div className="relative">
          <div
            ref={heightRef}
            className={`about-company ${
              isExpandedContainer ? "overflow-mask" : ""
            }`}
          >
            <p className="about-company-text">About Company:</p>
            <p className="about-us-text">About us</p>
            <p className="company-info">{props.jobDetailsFromCompany}</p>
            <p>&nbsp;</p>
            <p className="profile-text">Founder/Recruiter profiles:</p>
            <p className="profile-name">John Doe</p>
            <p className="about-company-text about-company-role">About Role:</p>
            <p className="about-us-text">About us</p>
          </div>
          {isExpandedContainer && <p className="view-more-text">View job</p>}
        </div>
        {/* experience */}
        {props.minExp ? (
          <div className="min-experience">
            <p>Minimum Experience</p>
            <p>{props.minExp} years</p>
          </div>
        ) : (
          <div className="min-experience"></div>
        )}
        {/* apply button */}
        <button
          onClick={() => window.open(props.jdLink, "_blank")}
          className="easy-apply-btn"
        >
          ⚡️ Easy Apply
        </button>
        {/* referral button */}
        <button className="referral-btn">
          <img
            src="https://pasrc.princeton.edu/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture-973460_1280.jpg?itok=QzRqRVu8"
            alt=""
          />
          <p>Ask for referral</p>
        </button>
      </div>
    </div>
  );
}

export default JobDetailCard;
