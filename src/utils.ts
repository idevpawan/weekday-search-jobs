import { TJobDetailCard } from "./components/JobDetailCard";

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