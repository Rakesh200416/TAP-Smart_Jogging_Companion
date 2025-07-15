if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      // Map initialization
      const map = L.map('map').setView([latitude, longitude], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Current location marker
      const currentMarker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup('You are here!').openPopup();

      document.getElementById('location').textContent =
        `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`;

      // Get location name
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      const data = await response.json();
      if (data?.display_name) {
        document.getElementById('location').textContent += `\n📍 ${data.display_name}`;
      }

      // Destination logic
      let destMarker = null;
      let routeLine = null;

      document.getElementById('set-destination').addEventListener('click', () => {
        map.once('click', async (e) => {
          const destLat = e.latlng.lat;
          const destLng = e.latlng.lng;

          // Remove previous destination marker/line
          if (destMarker) map.removeLayer(destMarker);
          if (routeLine) map.removeLayer(routeLine);

          // Add destination marker
          destMarker = L.marker([destLat, destLng], { draggable: true }).addTo(map)
            .bindPopup("Target Location").openPopup();

          // Draw route line
          routeLine = L.polyline([[latitude, longitude], [destLat, destLng]], { color: 'red' }).addTo(map);

          // Calculate distance
          const distance = getDistanceFromLatLonInKm(latitude, longitude, destLat, destLng).toFixed(2);
          document.getElementById('destination-info').textContent = `🛣️ Distance to destination: ${distance} km`;

          // Fetch destination name and time estimate
          await showDestinationDetails(destLat, destLng, distance);

          // On drag update everything
          destMarker.on('dragend', async function () {
            const newLatLng = destMarker.getLatLng();
            if (routeLine) map.removeLayer(routeLine);
            routeLine = L.polyline([[latitude, longitude], [newLatLng.lat, newLatLng.lng]], { color: 'red' }).addTo(map);

            const updatedDist = getDistanceFromLatLonInKm(latitude, longitude, newLatLng.lat, newLatLng.lng).toFixed(2);
            document.getElementById('destination-info').textContent = `🛣️ Distance to destination: ${updatedDist} km`;

            await showDestinationDetails(newLatLng.lat, newLatLng.lng, updatedDist);
          });
        });
      });

      // Reverse geocode + time calculation display
      async function showDestinationDetails(destLat, destLng, distance) {
        const targetResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${destLat}&lon=${destLng}&format=json`);
        const targetData = await targetResponse.json();

        let targetName = "Unknown location";
        if (targetData?.display_name) {
          targetName = targetData.display_name;
        }

        // Estimate time
        const pace = 6; // km/h jogging
        const timeInHours = distance / pace;
        const minutes = Math.floor(timeInHours * 60);
        const seconds = Math.floor((timeInHours * 60 - minutes) * 60);

        document.getElementById('destination-details').innerHTML = `
          <strong>📍 Destination:</strong> ${targetName}<br>
          <strong>🛣️ Distance:</strong> ${distance} km<br>
          <strong>⏱️ Estimated Time:</strong> ${minutes} mins ${seconds} secs at 6 km/h pace
        `;
      }

      // Utility: Haversine Formula
      function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371; // km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      }

      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }

    },
    (error) => {
      document.getElementById('location').textContent = "Location access denied.";
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
} else {
  document.getElementById('location').textContent = "Geolocation not supported.";
}



// canvas section
window.onload = function () {
  // ------------------ 📊 Bar Chart - Weekly Distance ------------------
  const barCtx = document.getElementById('barChart').getContext('2d');
  const barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Distance (km)',
        data: [2.5, 3, 3.8, 4.2, 3.6, 5, 2],
        backgroundColor: '#0077b6',
        borderRadius: 8
      }]
    },
    options: {
      animation: {
        duration: 1000
      },
      plugins: {
        tooltip: {
          enabled: true
        },
        legend: {
          display: false
        }
      },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Kilometers'
          }
        }
      }
    }
  });

  // ------------------ 🥧 Pie Chart - Workout Type ------------------
  const pieCtx = document.getElementById('pieChart').getContext('2d');
  const pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: ['Running', 'Cycling', 'Yoga', 'Gym'],
      datasets: [{
        label: 'Workout Types',
        data: [40, 25, 20, 15],
        backgroundColor: [
          '#00b4d8',
          '#90e0ef',
          '#48cae4',
          '#0077b6'
        ],
      }]
    },
    options: {
      animation: {
        animateRotate: true,
        duration: 1500
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.parsed}%`;
            }
          }
        },
        legend: {
          position: 'bottom'
        }
      },
      responsive: true
    }
  });

  // ------------------ 📈 Line Chart - Calories Burned ------------------
  const lineCtx = document.getElementById('lineChart').getContext('2d');
  const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Calories Burned',
        data: [200, 300, 350, 400, 380, 450, 250],
        fill: true,
        borderColor: '#0077b6',
        backgroundColor: 'rgba(0, 119, 182, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#0077b6',
        pointRadius: 5
      }]
    },
    options: {
      animation: {
        duration: 1200
      },
      plugins: {
        tooltip: {
          enabled: true
        },
        legend: {
          display: true,
          position: 'top'
        }
      },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Calories'
          }
        }
      }
    }
  });
};


// Network Information API
if ('connection' in navigator) {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const status = document.getElementById('network-status');

  function updateNetworkStatus() {
    const type = connection.effectiveType || "unknown";
    const downlink = connection.downlink || "N/A"; 
    const rtt = connection.rtt || "N/A"; 
    const saveData = connection.saveData ? "Yes" : "No";

    status.innerHTML = `
      📶 <strong>Network Type:</strong> ${type.toUpperCase()}<br>
      🔽 <strong>Download Speed:</strong> ${downlink} Mbps<br>
      🕓 <strong>RTT:</strong> ${rtt} ms<br>
      💾 <strong>Data Saver Enabled:</strong> ${saveData}
    `;

    // Set color based on speed
    if (downlink < 1) {
      status.style.color = 'yellow';
    } else if (downlink < 3) {
      status.style.color = 'orange';
    } else {
      status.style.color = 'green';
    }
  }

  connection.addEventListener('change', updateNetworkStatus);
  updateNetworkStatus();
} else {
  document.getElementById('network-status').textContent = "⚠️ Network Info API not supported.";
}


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.box').forEach(section => {
  observer.observe(section);
});

