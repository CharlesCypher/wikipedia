const url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const form = document.querySelector(".form");
const formInput = document.querySelector(".form-input");
const submitBtn = document.querySelector(".submit-btn");
const results = document.querySelector(".results");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = formInput.value;
  if (!value) {
    results.innerHTML = '<div class="error"> please enter valid search term</div>';
    return;
  } else {
    fetchPages(value);
  }
});

const fetchPages = async (searchValue) => {
  results.innerHTML = '<div class="loading"></div>';
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;
    console.log(results);
    if (results.length < 1) {
      results.innerHTML = '<div class="error">no matching results. Please try again</div>';
      return;
    }
    renderResults(results);
  } catch (error) {
    results.innerHTML = '<div class="error"> there was an error...</div>';
  }
};

const renderResults = (list) => {
  const cardsList = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>`;
    })
    .join("");
  results.innerHTML = `<div class="articles">
          ${cardsList}
        </div>`;
};
