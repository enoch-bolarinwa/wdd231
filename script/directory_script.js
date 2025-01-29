// JavaScript for Timbuktu Chamber of Commerce Directory

document.addEventListener("DOMContentLoaded", () => {
    const directoryContainer = document.getElementById("directoryContainer");
    const toggleButton = document.getElementById("viewToggle");
    let isGridView = true;
  
    // Fetch data from members.json
    async function fetchMembers() {
      try {
        const response = await fetch("./data/members.json");
        const members = await response.json();
        displayMembers(members);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }
  
    // Display members in the directory
    function displayMembers(members) {
      directoryContainer.innerHTML = "";
      members.forEach((member) => {
        const card = document.createElement("div");
        card.className = isGridView ? "card grid-view" : "card list-view";
        card.innerHTML = `
          <img src="./images/${member.image}" alt="${member.name}">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        directoryContainer.appendChild(card);
      });
    }
  
    // Toggle between grid and list view
    toggleButton.addEventListener("click", () => {
      isGridView = !isGridView;
      toggleButton.textContent = isGridView ? "Switch to List View" : "Switch to Grid View";
      fetchMembers(); // Re-render members with the updated view
    });
  
    // Initialize
    fetchMembers();
  
    // Footer: Update last modification date and year dynamically
    const footerYear = document.getElementById("year");
    const lastModified = document.getElementById("lastModified");
    footerYear.textContent = new Date().getFullYear();
    lastModified.textContent = document.lastModified;
  });
  
