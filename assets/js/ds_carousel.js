const githubUsername = "n-saurino"; // Change to your GitHub username
const topic = "data-structures"; // Change to your GitHub topic
const carousel = document.querySelector(".data-structures-carousel");

async function fetchRepos() {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`, {
        headers: {
            "Accept": "application/vnd.github.mercy-preview+json" // Enable topics in API response
        }
    });
    const repos = await response.json();

    console.log("Fetched Repos:", repos); // Debugging

    const filteredRepos = repos.filter(repo => repo.topics && repo.topics.includes(topic));

    if (filteredRepos.length === 0) {
        carousel.innerHTML = "<p>No repositories found with the selected topic.</p>";
        return;
    }

    filteredRepos.forEach(repo => {
        const repoCard = document.createElement("div");
        repoCard.classList.add("swiper-slide"); // Make it a Swiper slide

        repoCard.innerHTML = `
            <a href="${repo.html_url}" target="_blank">
                <img src="https://github-readme-stats.vercel.app/api/pin/?username=${githubUsername}&repo=${repo.name}&theme=dark" alt="${repo.name}">
            </a>
        `;
        
        carousel.appendChild(repoCard);
    });

    console.log("Loaded Cards:", carousel.children.length); // Debugging

    // Initialize Swiper after dynamically adding slides
    new Swiper(".mySwiper", {
        slidesPerView: 3,  // Adjust number of visible slides
        spaceBetween: 130,  // Space between cards
        loop: true,
        autoplay: {
            delay: 3000, // Time between transitions (in ms)
            disableOnInteraction: false, // Keeps autoplay running after user interaction
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

}

// Run after DOM loads
document.addEventListener("DOMContentLoaded", fetchRepos);