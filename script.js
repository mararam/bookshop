const books = [
  {
    title: "River Quest",
    series: "Wild Paths",
    publisher: "Orion Press",
    author: "A. Lane",
    level: "Beginner",
    age: "6-9",
    interest: "Adventure"
  },
  {
    title: "Stars and Sparks",
    series: "Sky Learners",
    publisher: "Bright Shelf",
    author: "M. Roy",
    level: "Intermediate",
    age: "10-13",
    interest: "Science"
  },
  {
    title: "Castle of Echoes",
    series: "Dream Keepers",
    publisher: "Moonlit House",
    author: "K. Imani",
    level: "Advanced",
    age: "14-17",
    interest: "Fantasy"
  },
  {
    title: "Pages of Time",
    series: "Past Alive",
    publisher: "Heritage Hub",
    author: "S. Karim",
    level: "Intermediate",
    age: "18+",
    interest: "History"
  }
];

const listEl = document.getElementById("book-list");
const searchInput = document.getElementById("search-input");
const ageFilter = document.getElementById("age-filter");
const levelFilter = document.getElementById("level-filter");
const interestFilter = document.getElementById("interest-filter");
const recommendation = document.getElementById("recommendation");
const surpriseText = document.getElementById("surprise-text");

let profile = null;

function renderBooks() {
  const term = searchInput.value.toLowerCase().trim();
  const age = ageFilter.value;
  const level = levelFilter.value;
  const interest = interestFilter.value;

  const filtered = books.filter((book) => {
    const searchable = [book.title, book.series, book.publisher, book.level, book.author]
      .join(" ")
      .toLowerCase();
    return (
      (!term || searchable.includes(term)) &&
      (!age || book.age === age) &&
      (!level || book.level === level) &&
      (!interest || book.interest === interest)
    );
  });

  listEl.innerHTML = "";
  if (!filtered.length) {
    listEl.innerHTML = "<li>No matching books yet. Try different filters.</li>";
    return;
  }

  filtered.forEach((book) => {
    const item = document.createElement("li");
    item.textContent = `${book.title} (${book.series}) — ${book.author}, ${book.publisher} | ${book.age}, ${book.level}, ${book.interest}`;
    const copyChoice = document.createElement("select");
    copyChoice.setAttribute("aria-label", `Copy format for ${book.title}`);
    copyChoice.innerHTML = `
      <option>Online copy</option>
      <option>Offline copy</option>
    `;
    item.append(" ", copyChoice);
    listEl.appendChild(item);
  });
}

document.getElementById("profile-form").addEventListener("submit", (event) => {
  event.preventDefault();
  profile = {
    name: document.getElementById("reader-name").value,
    age: document.getElementById("profile-age").value,
    level: document.getElementById("profile-level").value,
    interest: document.getElementById("profile-interest").value
  };

  document.getElementById("profile-status").textContent = `Profile saved for ${profile.name}.`;
});

document.getElementById("recommend-btn").addEventListener("click", () => {
  if (!profile) {
    recommendation.textContent = "Create your profile first for tailored suggestions.";
    return;
  }

  const matches = books.filter(
    (book) =>
      book.age === profile.age &&
      book.level === profile.level &&
      book.interest === profile.interest
  );
  const pick = matches[0] || books.find((book) => book.interest === profile.interest) || books[0];
  recommendation.textContent = `AI suggests: ${pick.title} for ${profile.name}.`;
});

document.getElementById("surprise-btn").addEventListener("click", () => {
  const pick = books[Math.floor(Math.random() * books.length)];
  surpriseText.textContent = `Surprise! Try "${pick.title}" from ${pick.series}.`;
});

document.getElementById("create-book-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("new-title").value.trim();
  const theme = document.getElementById("new-theme").value.trim();
  document.getElementById("create-book-status").textContent = `Great idea! "${title}" on ${theme} has been drafted for your custom story shelf.`;
});

[searchInput, ageFilter, levelFilter, interestFilter].forEach((element) =>
  element.addEventListener("input", renderBooks)
);

renderBooks();
