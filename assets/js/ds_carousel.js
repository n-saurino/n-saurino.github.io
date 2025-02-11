const githubUsername = "n-saurino"; // Change to your GitHub username
const topic = "data-structures"; // Change to your GitHub topic
const carousel = document.querySelector(".data-structures-carousel");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

async function fetchRepos() {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`, {
        headers: {
            "Accept": "application/vnd.github.mercy-preview+json" // Enables topics in API response
        }
    });

    const repos = await response.json();
    console.log("Fetched Repos:", repos);

    const filteredRepos = repos.filter(repo => repo.topics && repo.topics.includes(topic));
    console.log("Filtered Repos:", filteredRepos);

    if (filteredRepos.length === 0) {
        carousel.innerHTML = "<p>No repositories found with the selected topic.</p>";
        return;
    }

    filteredRepos.forEach(repo => {
        const repoCard = document.createElement("div");
        repoCard.classList.add("data-structure-card");

        repoCard.innerHTML = `
            <img src="https://github-readme-stats.vercel.app/api/pin/?username=${githubUsername}&repo=${repo.name}" alt="${repo.name}" />
        `;

        carousel.appendChild(repoCard);
    });
}

// Navigation Logic
let currentIndex = 0;

function moveCarousel(direction) {
    const cards = document.querySelectorAll(".data-structure-card");
    const totalCards = cards.length;

    if (totalCards === 0) return;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalCards - 1; // Loop back to last card
    } else if (currentIndex >= totalCards) {
        currentIndex = 0; // Loop back to first card
    }

    const cardWidth = cards[0].offsetWidth + 10; // Add margin/gap
    carousel.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
}

// Event Listeners
prevBtn.addEventListener("click", () => moveCarousel(-1));
nextBtn.addEventListener("click", () => moveCarousel(1));

// Call fetchRepos on page load
fetchRepos();