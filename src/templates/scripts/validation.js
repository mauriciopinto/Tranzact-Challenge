const MONTHLY = 'Monthly';
const QUARTERLY = 'Quarterly';
const SEMIANNUAL = 'Semiannual';
const ANNUAL = 'Annual';

function PremiumFormController () {
        
    var _birthDate = null;
    var _state = "AL";
    var _plan = "A"
    var _age = null;

    function validateAge () {
        if (_birthDate && _age) {
            let birthDate = new Date (_birthDate);
            birthDate.setHours (birthDate.getHours () + 5);

            let birthYear = birthDate.getFullYear ();
            let birthMonth = birthDate.getMonth () + 1;
            let birthDay = birthDate.getDate ();
            
            let currentDate = new Date ();
            let currentYear = currentDate.getFullYear ();
            let currentMonth = currentDate.getMonth () + 1;
            let currentDay = currentDate.getDate ();

            let calculatedAge = currentYear - birthYear;

            if ((currentMonth < birthMonth) || 
                (currentMonth === birthMonth && currentDay < birthDay)) {
                    calculatedAge--;
            }
            
            let alert = document.getElementById ('form1-age-alert');
            alert.style.visibility = calculatedAge == _age ? "hidden" : "visible";
        }
    };

    function validateFields () {
        let validBirthDate = isNaN (Date.parse (_birthDate)) ? false : true;
        let validAge = _age > 0 && _age < 150;

        let invalidBirthDateAlert = document.getElementById ('form1-date-alert');
        let invalidAgeAlert = document.getElementById ('form1-age-alert');

        if (!validBirthDate) {
            invalidBirthDateAlert.style.visibility = 'visible';
        }

        if (!validAge) {
            invalidAgeAlert.style.visibility = 'visible'
        }
        
        return validBirthDate && validAge;
    }

    function calculatePeriod (premium) {
        let periodSelect = document.getElementById ('premium-form-period-field');
        const period = periodSelect.value;

        let periodical;
        switch (period) {
            case MONTHLY:
                periodical = premium / 12;
                break;

            case QUARTERLY:
                periodical = premium / 4;
                break;

            case SEMIANNUAL:
                periodical = premium / 2;
                break;

            case ANNUAL:
                periodical = premium;
                break;
            
            default:
                periodical = premium;
                break;
        }

        let periodEntry = document.getElementById ('premium-display-table-period');
        periodEntry.innerHTML = `<strong>${period}</strong>`;
        return periodical;
    }

    return {
        handleBirthDate (event) {
            _birthDate = event.target.value;
            validateAge ();
        },
        
        handleState (event) {
            _state = event.target.value;
        },

        handlePlan (event) {
            _plan = event.target.value;
        },

        handleAge (event) {
            _age = event.target.value;
            validateAge ();
        },

        fetchPremium () {
            if (!validateFields ()) {
                throw 'Some fields are not valid!'
            }

            let formattedURL = 'http://localhost:8000/premium?'

            let params = {
                birthDate: _birthDate,
                state: _state,
                plan: _plan,
                age: _age
            };

            Object.entries (params).map ((entry) => {
                formattedURL += `${entry[0]}=${entry[1]}&`
            })

            axios.get (formattedURL)
            .then ((res) => {
                let data = res.data;
                let tableBody = document.getElementById ("premium-display-table-body");
                
                tableBody.textContent = '';
                data.forEach ((premium) => {
                    let tableRow = document.createElement ('tr');
                    let carrierData = document.createElement ('td');
                    let premiumData = document.createElement ('td');
                    let periodicalData = document.createElement ('td');

                    carrierData.innerText = premium.carrier;
                    premiumData.innerText = premium.premium;
                    periodicalData.innerText = calculatePeriod (premium.premium);

                    tableRow.appendChild (carrierData);
                    tableRow.appendChild (premiumData);
                    tableRow.appendChild (periodicalData);
                    tableBody.appendChild (tableRow);
                })

                let selectPeriod = document.getElementById ('premium-form-period-field');

                selectPeriod.disabled = false;
            })
            .catch ((err) => console.log (err))
        }
    }
};

var controller = PremiumFormController ();

window.addEventListener ('load', () => {
    let dateOfBirthInput = document.getElementById ('form1-date-field');
    let stateInput = document.getElementById ('form1-state-field');
    let planInput = document.getElementById ('form1-plan-field');
    let ageInput = document.getElementById ('form1-age-field');
    let calculatePremiumButton = document.getElementById ('premium-form-button');

    ["input", "change"].forEach ((event) => {
        dateOfBirthInput.addEventListener (event, (e) => controller.handleBirthDate (e));
        planInput.addEventListener (event, (e) => controller.handlePlan (e));
        stateInput.addEventListener (event, (e) => controller.handleState (e));
        ageInput.addEventListener (event, (e) => controller.handleAge (e));
    });
    
    calculatePremiumButton.addEventListener ('click', controller.fetchPremium);
});