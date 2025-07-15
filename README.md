# TAP-Smart-Jogging-Companion-

🏃‍♂️ TAP - Smart Jogging Companion
TAP - Smart Jogging Companion is a dynamic, browser-based fitness assistant that integrates real-time geolocation tracking, interactive maps, destination planning, health activity visualizations, and system resource monitoring — all in one place. Designed using modern JavaScript and web APIs, it's ideal for joggers and fitness enthusiasts looking to enhance their outdoor exercise experience.

🌟 Key Features

📍 Real-Time Location & Maps

Uses the Geolocation API to detect your current position.

Displays your live location using Leaflet.js and OpenStreetMap.

Allows users to set a destination by clicking on the map, view distance, and estimate jogging time based on a fixed pace (6 km/h).

Destination is draggable with auto-updated distance, ETA, and reverse-geocoded place names via Nominatim API.

📊 Data Visualization
Bar Chart: Weekly distance covered.
Pie Chart: Distribution of workout types (Running, Cycling, Yoga, Gym).
Line Chart: Calories burned per day over a week.
All charts are created using Chart.js.

🌐 Network Monitoring
Leverages the Network Information API to show:
Network type (e.g., 4G, WiFi)
Download speed
Round-trip time (RTT)
Data saver mode status
Color-coded display for download speed quality.

👀 Scroll-Based Animation
Leverages the Intersection Observer API to:
Detect when elements scroll into the viewport
Trigger smooth animations only when content is visible
Improve performance compared to traditional scroll event listeners
Add the visible class dynamically to .box elements when they intersect with the viewport
Support customizable thresholds (e.g., 20% visibility triggers animation)

<img width="1899" height="329" alt="Screenshot 2025-07-15 125658" src="https://github.com/user-attachments/assets/16089039-d72a-4446-8160-f404e15e8e49" />

📸 Screenshot 1: Smart Jogging Companion Header & Network Monitoring
This section displays the application header along with real-time network monitoring powered by the Network Information API.
It shows:
📶 Network Type (e.g., 3G, 4G, WiFi)
🔽 Download Speed in Mbps
⏱️ Round-Trip Time (RTT)
💾 Data Saver Mode (on/off)
Each metric is color-coded based on performance to help users assess their connectivity before jogging outdoors.


![nnnnn](https://github.com/user-attachments/assets/cc54cea9-627d-4f7c-9776-e8e2085780c9)

📸 Screenshot 2: Live Location Tracking with Map View
This section displays the user’s real-time geographical location using the Geolocation API and Leaflet.js map integration.
It shows:
📍 Live Coordinates: Latitude and Longitude
🌍 Reverse-Geocoded Address: Translates coordinates into a detailed location name (here shown in Kannada and English)
🗺️ Interactive Map View: Allows users to visually see their current position and set a destination by clicking on the map


<img width="1498" height="628" alt="Screenshot 2025-07-15 125730" src="https://github.com/user-attachments/assets/f6bfe7ec-c750-4688-ba9a-ca79beb6ae4a" />

📸 Screenshot 3: Your Jogging Stats (Charts Section)
This section provides a comprehensive visual breakdown of the user's weekly workout performance :
📈 Calories Burned (Line chart)
🥧 Workout Breakdown (Pie chart showing % of Running, Yoga, Cycling, Gym)
📊 Weekly Distance (Bar chart for daily distance in km)
These visuals help users track their health goals and see their progress at a glance.


<img width="1483" height="692" alt="Screenshot 2025-07-15 125751" src="https://github.com/user-attachments/assets/e9d08685-499a-4cf4-8bd6-135f00c7b80e" />

📸 Screenshot 4: Weekly Summary & Pro Tips
This part summarizes the user's weekly jogging performance and offers smart workout tips:
📌 Total Distance Covered
🔥 Total Calories Burned
🏆 Most Active Day
😴 Least Active Day
💡 Pro Tips section gives motivational and practical suggestions like hydration, stretching, and goal setting — helping users stay consistent and safe during workouts.
