const editionDate = document.querySelector("[data-edition-date]");
const year = document.querySelector("[data-year]");
const progressBar = document.querySelector("[data-reading-progress]");
const newsletterForm = document.querySelector("[data-newsletter-form]");
const formNote = document.querySelector("[data-form-note]");
const filterButtons = document.querySelectorAll(".topic-chip");
const storyCards = document.querySelectorAll("[data-category]");

const today = new Date();
const dateFormatter = new Intl.DateTimeFormat("en", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

if (editionDate) {
  editionDate.textContent = dateFormatter.format(today);
}

if (year) {
  year.textContent = today.getFullYear();
}

const updateReadingProgress = () => {
  if (!progressBar) {
    return;
  }

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
};

updateReadingProgress();
window.addEventListener("scroll", updateReadingProgress, { passive: true });

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    storyCards.forEach((card) => {
      const shouldShow =
        selectedCategory === "all" || card.dataset.category === selectedCategory;

      card.hidden = !shouldShow;
    });
  });
});

if (newsletterForm && formNote) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(newsletterForm);
    const email = formData.get("email");

    formNote.textContent = email
      ? `Thanks. ${email} is queued for the morning edition demo.`
      : "Enter an email address to preview the signup flow.";
    newsletterForm.reset();
  });
}
