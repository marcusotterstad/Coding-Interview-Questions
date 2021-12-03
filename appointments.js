const user1 = [
    ["0:00", "9:00"],
    ["9:00", "10:30"],
    ["12:00", "13:00"],
    ["16:00", "18:00"],
    ["20:00", "0:00"]
];
const busy1 = ["9:00", "20:00"];


const user2 = [
    ["0:00", "10:00"],
    ["10:00", "11:30"],
    ["12:30", "14:30"],
    ["16:00", "17:00"],
    ["18:30", "0:00"]
];
const busy2 = ["10:00", "18:30"];


/*
Task is to schedule times that are available for both user1 and user2
the appointments have to be more than 30 minutes
busy1 and busy2 are the times

inspiration from
https://youtu.be/3Q_oYDQ2whs

I completed this in about 80 minutes, so too slow for a coding interview, but still proud that i completed it


 ["9:00", "10:30"] ["12:00", "13:00"] ["16:00", "18:00"]
["10:00", "11:30"] ["12:30", "14:30"] ["16:00", "17:00"]

0.function clockToMins  turns clock time to minutes 
[check]


1. Function(user)  finds out the available times, returns a list 
    returns tuple of available times ismore30blalbal

    [1630, 1730]
    [1800, 1900]

    should return [1730, 1800]

[check]

[17:30, 18:30]
  Å       V
[17:00, 18:00]

2. function (arr1, arr2)        
    if first element is less or the same as the next first element && if last element is more or the same as the next last element 
    both have to be right and >30 min
        if true, return [first, last]

[check]
    
*/

function clockToMins (tuple) {
    let nums1 = tuple[0].split(":");
    let nums2 = tuple[1].split(":");
    return [parseInt(nums1[0])*60 + parseInt(nums1[1]), parseInt(nums2[0]*60) + parseInt(nums2[1])];
}

function findAvailableTimes (user) {
    let returnList = [];
    for (let i = 0; i < user.length -1; i++) {
        let firstTime = user[i][1];
        let secondTime = user[i+1][0];

        returnList.push([firstTime, secondTime]);
    }
    return returnList;
}

function findJointTimes (user1, user2) {
    let addTimes = [];
    let returnTimes = [];
    for (tup1 of user1) {
        for (tup2 of user2) {
            if(tup1[0] >= tup2[0] && tup1[1] <= tup2[1]) {
                addTimes.push([tup1[0], tup1[1]]);
            }
            else if(tup1[0] <= tup2[0] && tup1[1] >= tup2[1]) {
                addTimes.push([tup2[0], tup2[1]]);
            }
            else if (tup1[0] >= tup2[0] && tup1[1] >= tup2[1]) {
                addTimes.push([tup1[0], tup2[1]]);
            }
            else if (tup1[0] <= tup2[0] && tup1[1] <= tup2[1]) {
                addTimes.push([tup2[0], tup1[1]]);
            }
        }
    }

    for (tuple of addTimes) {
        if(tuple[1] - tuple[0] > 30) {
            returnTimes.push(tuple);
        }
    }

    return returnTimes;
}

function minsToClock (tuple) {
    let mins1 = tuple[0] % 60;
    let mins2 = tuple[1] % 60;

    if(tuple[0] % 60 === 0) {
        mins1 += "0";
    }
    if(tuple[1] % 60 === 0) {
        mins2 += "0";
    }

    let hours1 = (tuple[0] - mins1)/60;
    let hours2 = (tuple[1] - mins2)/60;
    return [hours1.toString(10) + ":" + mins1.toString(10), hours2.toString(10) + ":" + mins2.toString(10)];
}

const user1Mins = user1.map(x => clockToMins(x));
const user2Mins = user2.map(x => clockToMins(x));

const user1AvailableTimes = findAvailableTimes(user1Mins);
const user2AvailableTimes = findAvailableTimes(user2Mins);

const jointTimes = findJointTimes(user1AvailableTimes, user2AvailableTimes);

/*  testing
console.log("User 1's list of available times: ");
console.log(user1AvailableTimes);
console.log("User 2's list of available times: ");
console.log(user2AvailableTimes);
console.log("---------------------------------");
console.log("Available times between the two: ");
console.log(jointTimes);
*/

for (tuple of jointTimes) {
    console.log("An appointment could be scheduled between: " + minsToClock(tuple)[0] + " and " + minsToClock(tuple)[1]);
}
/*
My Output: 
An appointment could be scheduled between: 14:30 and 16:00

*/