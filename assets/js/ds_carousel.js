const githubUsername = "n-saurino"; // Change to your GitHub username
const topic = "data-structures"; // Change to the topic you used
const carousel = document.querySelector(".data-structures-carousel");

async function fetchRepos() {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`, {
        headers: {
            "Accept": "application/vnd.github.mercy-preview+json" // Enables topics in API response
        }
    });

    const repos = await response.json();
    console.log("Fetched Repos:", repos); // Debugging step

    const filteredRepos = repos.filter(repo => repo.topics && repo.topics.includes(topic));
    console.log("Filtered Repos:", filteredRepos); // Debugging step

    if (filteredRepos.length === 0) {
        carousel.innerHTML = "<p>No repositories found with the selected topic.</p>";
        return;
    }

    filteredRepos.forEach(repo => {
        const repoCard = document.createElement("div");
        repoCard.classList.add("data-structure-card");

        // Create GitHub Repo Card
        repoCard.innerHTML = `
            <img src="https://github-readme-stats.vercel.app/api/pin/?username=${githubUsername}&repo=${repo.name}" alt="${repo.name}" />
        `;

        carousel.appendChild(repoCard);
    });
}

// Call the function
fetchRepos();

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