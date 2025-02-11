const githubUsername = "n-saurino"; // Change to your GitHub username
const topic = "data-structure"; // Change to the topic you used
const container = document.querySelector(".data-structures-list");
const carousel = document.querySelector(".data-structures-carousel");

async function fetchRepos() {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
    const repos = await response.json();

    const filteredRepos = repos.filter(repo => repo.topics && repo.topics.includes(topic));

    if (filteredRepos.length === 0) {
        container.innerHTML = "<p>No repositories found with the selected topic.</p>";
        return;
    }

    filteredRepos.forEach(repo => {
        const repoCard = document.createElement("div");
        repoCard.classList.add("data-structure-card");
        repoCard.innerHTML = `
            <h3>${repo.name.replace(/-/g, " ")}</h3>
            <p>${repo.description || "No description available"}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        container.appendChild(repoCard);
    });
}

// Call function after page load
document.addEventListener("DOMContentLoaded", fetchRepos);

// Scrolling functionality
function scrollLeft() {
    carousel.scrollBy({ left: -250, behavior: 'smooth' });
}

function scrollRight() {
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        carousel.scrollBy({ left: 250, behavior: 'smooth' });
    }
}