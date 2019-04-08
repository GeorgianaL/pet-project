import * as moment from 'moment';

export const scheduleData = [
  {
    "jobTitle": "Consultant",
    "company": "Company X",
    "startDate": moment("04/04/2019", "MM/DD/YYYY"),
    "endDate": moment("10/06/2019", "MM/DD/YYYY"),
    "status": "active"
  },
  {
    "jobTitle": "IT Analyst",
    "company": "Company Y",
    "startDate": moment("07/02/2019", "MM/DD/YYYY"),
    "endDate": moment("12/02/2019", "MM/DD/YYYY"),
    "status": "active"
  },
  {
    "jobTitle": "Consultant",
    "company": "Company Y",
    "startDate": moment("06/04/2020", "MM/DD/YYYY"),
    "endDate": moment("12/06/2020", "MM/DD/YYYY"),
    "status": "pending"
  },
  {
    "jobTitle": "Engineer",
    "company": "Company Z",
    "startDate": moment("01/02/2020", "MM/DD/YYYY"),
    "endDate": moment("08/08/2020", "MM/DD/YYYY"),
    "status": "opportunity"
  }
];
