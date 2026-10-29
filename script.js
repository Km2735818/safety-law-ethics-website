// Digital Footprints: scenario feedback, quiz feedback, and reflection.
const scenarioFeedback = document.querySelector("#scenario-feedback");
const choices = document.querySelectorAll(".choice");

const scenarioResponses = {
  A: {
    className: "caution",
    title: "This creates unnecessary risk.",
    text: "Collecting extra data just in case conflicts with data-minimization principles. More stored location history can create more privacy and security risks. Start by identifying what the map actually needs."
  },
  B: {
    className: "good",
    title: "Strong choice: privacy by design.",
    text: "The app should explain the purpose, request only the access needed for the feature, limit retention and sharing, and give users understandable controls. This is the strongest ethical option and can reduce legal risk, though compliance depends on the full facts."
  },
  C: {
    className: "caution",
    title: "Hiding the notice is not meaningful transparency.",
    text: "A difficult-to-find notice makes it harder for people to understand what is happening. If the app's claims or omissions mislead users, that can raise concerns under Section 5 of the FTC Act. Clear explanations and real choices are better."
  }
};

choices.forEach((button) => {
  button.addEventListener("click", () => {
    const response = scenarioResponses[button.dataset.choice];
    choices.forEach((choice) => choice.classList.toggle("selected", choice === button));
    scenarioFeedback.className = `feedback-box ${response.className}`;
    scenarioFeedback.replaceChildren();
    const heading = document.createElement("strong");
    heading.textContent = response.title;
    const paragraph = document.createElement("p");
    paragraph.textContent = response.text;
    scenarioFeedback.append(heading, paragraph);
  });
});

// Progress indicator for the privacy-by-design checklist.
const checklistInputs = document.querySelectorAll(".check-row input");
const checklistProgress = document.querySelector("#checklist-progress");
function updateChecklistProgress() {
  const checked = [...checklistInputs].filter((input) => input.checked).length;
  checklistProgress.textContent = `${checked} of ${checklistInputs.length} principles checked`;
  if (checked === checklistInputs.length) {
    checklistProgress.textContent += " — great, you've reviewed every principle!";
  }
}
checklistInputs.forEach((input) => input.addEventListener("change", updateChecklistProgress));

// Quiz: show option-specific explanations and the overall score.
const quizForm = document.querySelector("#quiz-form");
const quizResult = document.querySelector("#quiz-result");
const questionFeedback = {
  q1: {
    answer: "b",
    right: "Apps should request only permissions that are useful for their features. If location is unnecessary, denying access is a reasonable privacy choice.",
    wrong: "Check whether the app genuinely needs location for its main function. Unnecessary permissions can expose personal information without providing a benefit."
  },
  q2: {
    answer: "c",
    right: "The FTC says Section 5(a) prohibits unfair or deceptive acts or practices in or affecting commerce. It does not ban all collection of personal information.",
    wrong: "Section 5 is about unfair or deceptive practices in or affecting commerce; it is not a blanket ban on GPS or all personal-data collection."
  },
  q3: {
    answer: "a",
    right: "Secretly selling data after promising not to can mislead users and break trust. Depending on the facts, deceptive conduct may violate Section 5 of the FTC Act.",
    wrong: "A company should follow its privacy promises. Secretly doing the opposite can mislead users and may create legal risk."
  }
};

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let score = 0;
  let answered = 0;

  document.querySelectorAll(".question").forEach((fieldset, index) => {
    const questionName = `q${index + 1}`;
    const selected = quizForm.querySelector(`input[name="${questionName}"]:checked`);
    const feedback = fieldset.querySelector(".question-feedback");
    const info = questionFeedback[questionName];

    if (!selected) {
      feedback.className = "question-feedback incorrect";
      feedback.textContent = "Choose an answer to complete this question.";
      return;
    }

    answered += 1;
    const correct = selected.value === info.answer;
    if (correct) score += 1;
    feedback.className = `question-feedback ${correct ? "" : "incorrect"}`;
    feedback.textContent = correct ? info.right : info.wrong;
  });

  if (answered < 3) {
    quizResult.textContent = `You answered ${answered} of 3 questions. Finish the unanswered question(s), then check again.`;
  } else {
    const message = score === 3
      ? "Excellent—you can distinguish ethical design from legal requirements."
      : score === 2
        ? "Good work. Review the feedback for the one concept to strengthen."
        : "Keep going. Read each explanation, then try again to reinforce the ideas.";
    quizResult.textContent = `Your score: ${score}/3. ${message}`;
  }
});

document.querySelector("#reset-quiz").addEventListener("click", () => {
  quizForm.reset();
  document.querySelectorAll(".question-feedback").forEach((item) => {
    item.textContent = "";
    item.className = "question-feedback";
  });
  quizResult.textContent = "Your score will appear here after you submit.";
});

// The reflection is shown on the page only; no data is transmitted or saved.
document.querySelector("#reflection-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const response = document.querySelector("#reflection").value.trim();
  const output = document.querySelector("#reflection-output");
  if (!response) return;
  output.textContent = `Your design improvement: ${response}`;
  output.classList.add("visible");
});
