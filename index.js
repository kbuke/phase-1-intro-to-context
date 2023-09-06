// Your code here

function createEmployeeRecord(record){
    const employee = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employee
}

function createEmployeeRecords(arrayOfArray){
    let employeeRecords = [];
    for(let i = 0; i < arrayOfArray.length; i++){
        let employeeData = arrayOfArray[i];
        let employeeRecord = createEmployeeRecord(employeeData);
        employeeRecords.push(employeeRecord);
    }
    return employeeRecords;
}

function createTimeInEvent(employeeRecord, timeInStamp){
        let employeeTimeInDetails = {
            type: "TimeIn",
            hour: parseInt(`${timeInStamp.slice(11,15)}`),
            date: `${timeInStamp.slice(0,10)}`
        }
        employeeRecord.timeInEvents.push(employeeTimeInDetails)
        return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeOutStamp){
    let employeeTimeOutDetails = {
        type: "TimeOut",
        hour: parseInt(`${timeOutStamp.slice(11,15)}`),
        date: `${timeOutStamp.slice(0,10)}`
    }
    employeeRecord.timeOutEvents.push(employeeTimeOutDetails)
    return employeeRecord
}

function hoursWorkedOnDate(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(e => e.date === soughtDate)
    let outEvent = employee.timeOutEvents.find(e => e.date === soughtDate)
    return (outEvent.hour - inEvent.hour) / 100
}


function wagesEarnedOnDate(employeeRecord, date){
    let wages = employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord,date)
    return parseInt(wages)
}

function allWagesFor(employeeRecord){
    let dates = employeeRecord.timeInEvents.map(dates => dates.date)
    let totalWages = 0;
    for (let i = 0; i < dates.length; i++) {
        totalWages += wagesEarnedOnDate(employeeRecord, dates[i]);
    }
    return totalWages;
}


function calculatePayroll(employeeRecord){
        let totalPay = 0;
      
        employeeRecord.forEach((employee) => {
          employee.timeInEvents.forEach((timeInEvent) => {
            // Calculate wages for each date worked
            let pay = wagesEarnedOnDate(employee, timeInEvent.date);
            // Accumulate the total pay
            totalPay += pay;
          });
        });
      
        return totalPay;
}


// function calculatePayroll
    //Argument(s)
        //Array of employee records
    //Returns
        //Sum of pay owed to all employees for all dates, as a number
    //Behavior
        //Use wagesEarnedOnDate, accumulate value of all dates worked by employee in record used as context. 
        //Amount should be returned as a number.