function getQueryParam(param_name) {
    const URLparams = new URLSearchParams(window.location.search);
    return URLparams.get(param_name);
}

const year = getQueryParam('year').replace(/["']/g, "");

if(year) {
    fetch(`events/${year}.html`)
        .then(response => {
            if (!response.ok) throw new Error('Section not found');
            // return response.text();
        })
        .then(data => {
            document.getElementById('events_content').innerHTML = data;
            console.log(data)
        })
        .catch(error => {
            document.getElementById('events_content').innerHTML = '<p>Section not found</p>';
        });
} else {
    document.getElementById('events_content').innerHTML = '<p>Please select a year in the URL.</p>';
}

console.log(`events/${year}.html`);