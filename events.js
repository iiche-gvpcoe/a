function GetQueryParam(param_name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param_name)?.replace(/["']/g, "");
}

async function csv_Dict(path) {
    try {
        const response = await fetch(path);
        const csvText = await response.text();
        
        const rows = csvText.trim().split('\n');
        const headers = rows[0].split(',').map(header => header.trim());

        const data = rows.slice(1).map(row => {
            const values = row.split(',');
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index].trim();
                return obj;
            }, {});
        });
        return data;

    } catch (error) {
        console.error('Error fetching CSV:', error);
        return []; // Return an empty array in case of error
    }
}

function photosStrings(groupPhotosCount, photosCount, eventYear, eventDate) {
    const photoLocations = [];
    for (let currentPhoto = 1; currentPhoto <= groupPhotosCount; currentPhoto++) {
        const photoLocation = `events/${eventYear}/${eventDate}/groupPhoto-${currentPhoto}(${eventDate}).jpg`;
        photoLocations.push(photoLocation);
    }
    for (let currentPhoto = 1; currentPhoto <= photosCount; currentPhoto++) {
        const photoLocation = `events/${eventYear}/${eventDate}/photo-${currentPhoto}(${eventDate}).jpg`;
        photoLocations.push(photoLocation);
    }
    return photoLocations;
}

async function EventLoading() {
    const year = GetQueryParam('academic-year');
    const date = GetQueryParam('held-on');
    const contentDiv = document.getElementById("events_content");

    if (!year) {
        contentDiv.innerHTML = '<p>Please select a year in the URL.</p>';
        return;
    }

    try {
        const fetchcsvResponse = await fetch(`events/${year}/events.csv`);
        if (!fetchcsvResponse.ok) {
            contentDiv.innerHTML = "<h3>Searched year doesn't have any events.</h3>";
            return;
        }

        const yearEventsData = await csv_Dict(`events/${year}/events.csv`);

        if (!date) {
            document.title = `Events of ${year}`;
            const eventCards = document.createElement('div');
            const toHomediv = document.createElement('div');
            toHomediv.innerHTML = `
                <a href="index.html">Home</a>
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
                <a href="events.html?academic-year=${year}">${year}'s events</a>`
            eventCards.className = "event_cards";
            contentDiv.appendChild(toHomediv);
            contentDiv.appendChild(eventCards);

            yearEventsData.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = "event_card";
                eventCard.id = event.date;
                eventCard.innerHTML = `
                    <div class="image">
                        <img src="events/${year}/${event.date}/groupPhoto-1(${event.date}).jpg" alt="${event.name}">
                    </div>
                    <div class="event_title">
                        <h3>${event.name}</h3>
                    </div>
                    <div class="link">
                        <a href="events.html?academic-year=${year}&held-on=${event.date}">Click Here!</a>
                    </div>`;
                eventCards.appendChild(eventCard);
            });
        } else {
            const eventDates = yearEventsData.map(entry => entry.date);
            if (!eventDates.includes(date)) {
                contentDiv.innerHTML = `<h3>Searched year doesn't have any event held on ${date}.</h3>`;
            } else {
                const eventDetails = yearEventsData.find(row => row.date === date);
                document.title = eventDetails.name;
                const toYearsEvents = document.createElement("div");
                const eventTitle = document.createElement("div");
                const eventGallery = document.createElement("div");
                toYearsEvents.innerHTML = `
                    <a href="index.html">Home</a>
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    <a href="events.html?academic-year=${year}">${year}'s events</a>
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    <a href="events.html?academic-year=${year}&held-on=${date}">${eventDetails.name} held on ${date.replace("_", " to ")}</a>`
                eventTitle.innerHTML = `
                    <h2 class=eventPageTitle>${eventDetails.name}</h2>`
                contentDiv.appendChild(toYearsEvents);
                contentDiv.appendChild(eventTitle);
                photoLocations = photosStrings(eventDetails.groupPhotos, eventDetails.photos, year, date);
                photoLocations.forEach(photoLocation => {
                    eventGallery.innerHTML += `<img src="${photoLocation}" alt="${photoLocation.split("/").pop()}"`
                }
                
            )

            };
        }
    } catch (error) {
        console.error('Error:', error);
        contentDiv.innerHTML += `<p>${error.message}</p>`;
    }
};
