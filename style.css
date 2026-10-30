
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #fafafa;
    color: #222;
    padding: 30px 15px;
}

.container {
    max-width: 940px;
    margin: 20px auto;
    text-align: center;
}

h1 {
    font-size: 32px;
    margin-bottom: 25px;
}

/* Search */
.search {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-bottom: 20px;
}

.search input {
    width: 285px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 14px;
    outline: none;
}

.search input:focus {
    border-color: #777;
}

/* Buttons */
button {
    padding: 12px 20px;
    border: 1px solid #ddd;
    background: white;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    transition: 0.3s;
}

button:hover {
    background: #222;
    color: white;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Message */
#message {
    color: #777;
    font-size: 14px;
    margin-bottom: 10px;
    min-height: 18px;
}

/* Location */
#location {
    font-size: 17px;
    font-weight: normal;
    color: #777;
    margin-bottom: 20px;
}

/* Weather Cards */
.weather-cards {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    margin-bottom: 25px;
}

.weather-card {
    background: white;
    border: 1px solid #eee;
    border-radius: 16px;
    min-height: 135px;
    padding: 22px 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    transition: 0.3s;
}

.weather-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.weather-card h3 {
    color: #666;
    font-size: 16px;
    margin-bottom: 12px;
}

.weather-card h2 {
    font-size: 26px;
    font-weight: bold;
}

/* Station Status */
.station {
    background: white;
    border: 1px solid #eee;
    border-radius: 16px;
    padding: 40px 20px 22px;
    margin-bottom: 20px;
}

.station h2,
.forecast h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

#stationStatus {
    font-size: 16px;
    margin-bottom: 17px;
}

#updateText {
    color: #777;
    font-size: 14px;
    margin-bottom: 15px;
}

/* Forecast */
.forecast {
    background: white;
    border: 1px solid #eee;
    border-radius: 16px;
    padding: 40px 20px 20px;
}

.hours {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 10px;
    scroll-behavior: smooth;
}

.hour-card {
    min-width: 94px;
    padding: 25px 10px 15px;
    border-radius: 13px;
    background: #f5f5f5;
    transition: 0.3s;
}

.hour-card:hover {
    background: #e9e9e9;
    transform: translateY(-3px);
}

.hour-card p {
    color: #777;
    font-size: 14px;
    margin-bottom: 15px;
}

.hour-card h3 {
    font-size: 17px;
}

/* Responsive Design */
@media (max-width: 750px) {
    .weather-cards {
        grid-template-columns: repeat(2, 1fr);
    }

    .weather-card:last-child {
        grid-column: span 2;
    }
}

@media (max-width: 420px) {
    body {
        padding: 18px 12px;
    }

    h1 {
        font-size: 27px;
    }

    .weather-card h2 {
        font-size: 22px;
    }

    .search input {
        width: 65%;
    }

    .station,
    .forecast {
        padding-left: 12px;
        padding-right: 12px;
    }
}
