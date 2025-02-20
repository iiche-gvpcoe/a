function getQueryParam(param_name) {
    const URLparams = new URLSearchParams(window.location.search);
    return URLparams.get(param_name)?.replace(/["']/g, ""); // Use optional chaining to avoid null errors
}

const year = getQueryParam('academic-year');
const date = getQueryParam('held-on');

const contentDiv = document.getElementById('events_content');

if (!year) {
    contentDiv.innerHTML = '<p>Please select a year in the URL.</p>';
} else {
    fetch(`events/${year}.html`)
        .then(response => {
            if (!response.ok) throw new Error('Section not found');
            return response.text();
        })
        .then(data => {
            contentDiv.innerHTML = data; // Load year-level content first
            if (date) {
                return fetch(`events/${year}/${date}.html`);
            }
        })
        .then(response => {
            if (response && response.ok) {
                return response.text();
            } else {
                throw new Error('Date section not found');
            }
        })
        .then(data => {
            contentDiv.innerHTML = data; // Append date-level content
        })
        .catch(error => {
            console.error(error);
            if (error.message.includes('Section not found')) {
                contentDiv.innerHTML += '<p>Section not found</p>';
            }
        });
}
