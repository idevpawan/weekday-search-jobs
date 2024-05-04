import { useEffect, useRef, useState } from "react";

function JobDetailCard() {
  const [isExpandedContainer, setIsExpandedContainer] = useState(false);
  const heightRef = useRef(null) as any;

  useEffect(() => {
    if (heightRef.current?.offsetHeight > 250) {
      setIsExpandedContainer(true);
    }
    console.log(heightRef.current?.offsetHeight);
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
            src="https://storage.googleapis.com/weekday-assets/airtableAttachment_1713598325603_7ico7.jpg"
            alt="logo"
          />
          <div>
            {/* company name */}
            <p className="company-name">FlexWash Techonologies</p>
            {/* job title */}
            <p className="job-title">Senior Engineer</p>
            {/* location */}
            <p className="location">Bangalore</p>
          </div>
        </div>
        {/* Estimated Salary */}
        <p className="estimated-salary">Estimated Salary: ₹30 - 60 LPA ✅</p>
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
            <p className="company-info">
              Flex Wash is an operating system for the car wash industry. Our
              solutions help owners manage their operations and grow revenue.
              Our POS has a built-in CRM, allowing car washes to take advantage
              of their customer transaction history in order to funnel customers
              into subscriptions and higher margin wash packages..
            </p>
            <p>&nbsp;</p>
            <p className="profile-text">Founder/Recruiter profiles:</p>
            <p className="profile-name">Chirag Singh Toor</p>
            <p className="about-company-text about-company-role">About Role:</p>
            <p className="about-us-text">About us</p>
          </div>
          {isExpandedContainer && <p className="view-more-text">View job</p>}
        </div>
        {/* experience */}
        <div className="min-experience">
          <p>Minimum Experience</p>
          <p>5 years</p>
        </div>
        {/* apply button */}
        <button className="easy-apply-btn">⚡️ Easy Apply</button>
      </div>
    </div>
  );
}

export default JobDetailCard;
