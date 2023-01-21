const fs = require ('fs/promises');

function monthNumberToString (monthNumber) {
    let monthString;

    switch (monthNumber) {    
        case 1:
            monthString = 'January';
            break;

        case 2:
            monthString = 'February';
            break;

        case 3:
            monthString = 'March';
            break;

        case 4:
            monthString = 'April';
            break;

        case 5:
            monthString = 'May';
            break;

        case 6:
            monthString = 'June';
            break;

        case 7:
            monthString = 'July';
            break;

        case 8:
            monthString = 'August';
            break;

        case 9:
            monthString = 'September';
            break;

        case 10:
            monthString = 'October';
            break;

        case 11:
            monthStrng = 'November';
            break;

        case 12:
            monthString = 'December';
            break;
    }

    return monthString;
}

function calculatePremiums (data, response) {
    fs.readFile ('./src/data/plans.json')
    .then ((buffer) => JSON.parse (buffer))
    .then ((premiums) => {
        let filteredPremiums = premiums.filter ((premium) => {
            let birthMonth = monthNumberToString (new Date (data.birthDate).getMonth () + 1);
            let plan = data.plan;
            let state = data.state;
            let age = data.age;

            let validPlan = (premium.plan.includes (plan));
            let validMonth = (birthMonth === premium.monthofbirth || premium.monthofbirth === '*');
            let validState = (state === premium.state || premium.state === '*');
            let validAge = (age > premium.agerange.from && age < premium.agerange.to);

            let valid = validPlan && validMonth && validState && validAge;

            return valid;
        })

        filteredPremiums = filteredPremiums.map ((premium) => {return {carrier: premium.carrier, premium: premium.premium}})
        response.setHeader ('Content-Type', 'application/json');
        response.statusCode = 200;
        response.end (JSON.stringify (filteredPremiums));
    })
    .catch ((err) => {
        console.log (err);
        response.statusCode = 500;
        response.end ('Internal Server Error');
    });
}

module.exports = { calculatePremiums }