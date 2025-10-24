# Roblox Game Stats Viewer

This project is a lightweight, full-stack application designed to display real-time game statistics for my Roblox games on a custom webpage.

It uses a Node.js backend to periodically fetch player counts and total visits from the Roblox Games API, stores them in memory, and serves them via a simple REST API. The frontend is a vanilla HTML/CSS/JavaScript page that fetches this data and displays it to users.

This project currently tracks stats for the **Project Souls** universes!

---

## Features

* **Live CCU:** Displays the total number of Current Concurrent Users (CCU) across all tracked games.
* **Total Visits:** Shows the combined total visits for all games.
* **Auto-Refresh:** The backend automatically fetches new data from Roblox every 30 seconds.
* **Client-Side Updates:** The webpage automatically polls the backend every 30 seconds to keep the displayed stats fresh.
* **Efficient Caching:** Stats are cached in memory on the server to avoid rate-limiting and provide instant API responses.

---

## How It Works

1.  **Backend (`server.js`):** A Node.js and Express server that acts as the core of the project.
2.  **Data Polling (`updateData.js`):** On server start, this script begins a `setInterval` loop. Every 30 seconds, it calls `getGameStats`.
3.  **Roblox API (`getData.js`):** This utility uses `fetch` to call the `games.roblox.com` API for each universe ID, collecting visit and player counts.
4.  **In-Memory Cache (`data.js`):** The combined stats are stored in a simple `serverData` object.
5.  **API Endpoints:** The server exposes two endpoints (`/api/get-total-visits` and `/api/get-total-ccu`) that simply return the values from the `serverData` cache.
6.  **Frontend (`main.js`):** The client-side JavaScript on the webpage calls these two endpoints on page load and again every 30 seconds, updating the HTML with the new values.

---

## Technologies Used

* **Backend:** Node.js, Express.js, CORS
* **Frontend:** HTML, CSS, JavaScript (with Fetch API)
* **Modules:** ES6 Modules (`import`/`export`)
* **API:** Roblox Games API

---

## Setup and Installation

To run this project locally, you will need [Node.js](https://nodejs.org/) installed.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
    cd your-repository-name
    ```

2.  **Initialize npm and `package.json`:**
    Since this project uses ES Modules, you need a `package.json` file.
    ```bash
    npm init -y
    ```

3.  **Enable ES Modules:**
    Open the new `package.json` file and add this line at the top level:
    ```json
    "type": "module",
    ```

4.  **Install dependencies:**
    ```bash
    npm install express cors
    ```

5.  **Run the server:**
    ```bash
    node server.js
    ```
    Your server should now be running at `http://localhost:5500`.

6.  **View the frontend:**
    Open the `index.html` file (or equivalent) in your web browser. The stats should appear and update automatically.

---

## API Endpoints

The server provides the following public endpoints:

### `GET /api/get-total-visits`

* **Description:** Retrieves the combined total visits for all tracked universes.
* **Response:**
    ```json
    {
      "message": "Successfully grabbed total visits",
      "value": 3548901
    }
    ```

### `GET /api/get-total-ccu`

* **Description:** Retrieves the combined current concurrent user count (CCU) for all tracked universes.
* **Response:**
    ```json
    {
      "message": "Successfully grabbed total ccu",
      "value": 452
    }
    ```
