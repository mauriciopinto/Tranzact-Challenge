function initializeData () {
    let stateInput = document.getElementById ('form1-state-field');
    let planInput = document.getElementById ('form1-plan-field');

    getStateOptions (stateInput);
    getPlanOptions (planInput);
}


function getStateOptions (selectNode) {
    fetch ('http://localhost:8000/data/states')
    .then ((res) => res.json ())
    .then ((data) => {
        data.map ((state) => {
            let stateNode = document.createElement ('option');
            
            stateNode.value = state.code;
            stateNode.innerText = state.name;
            selectNode.appendChild (stateNode);
            selectNode.disabled = false;
        });
    })
    .catch ((err) => console.log (err));
}


function getPlanOptions (selectNode) {
    fetch ('http://localhost:8000/data/plans')
    .then ((res) => res.json ())
    .then ((data) => {
        data.map ((plan, idx) => {
            let planNode = document.createElement ('option');

            planNode.value = plan;
            planNode.innerText = plan;
            selectNode.appendChild (planNode);
            selectNode.disabled = false;
        });
    })
    .catch ((err) => console.log (err));
}


window.addEventListener ('load', initializeData);