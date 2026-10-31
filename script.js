console.log("Welcome to Skill Swap!");

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    const skills = Array.from(skillCards).map(card => ({
        category: card.dataset.category,
        element: card
    }));

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            const filteredSkills = window.filterSkillsByCategory(
                skills,
                category
            );

            skillCards.forEach(card => {
                card.hidden = true;
            });

            filteredSkills.forEach(skill => {
                skill.element.hidden = false;
            });

            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            button.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.getElementById('calculate-cost-button');
    const hourlyRateInput = document.getElementById('hourly-rate');
    const sessionHoursInput = document.getElementById('session-hours');
    const costResult = document.getElementById('cost-result');

    calculateButton.addEventListener('click', function () {
        const rateText = hourlyRateInput.value;
        const hoursText = sessionHoursInput.value;
        const hourlyRate = Number(rateText);
        const hours = Number(hoursText);

        if (
            rateText === '' ||
            hoursText === '' ||
            !Number.isFinite(hourlyRate) ||
            !Number.isFinite(hours) ||
            hourlyRate < 0 ||
            hours < 0
        ) {
            costResult.textContent =
                'Please enter a valid rate and number of hours.';
            return;
        }

        const totalCost = window.calculateTotalCosts(hourlyRate, hours);

        costResult.textContent =
            'Total Cost: $' + totalCost.toFixed(2);
    });
});

// Find My Match section
let availableSkills = [];

async function loadSkills() {
    try {
        availableSkills = await window.apiService.fetchSkills();
        return availableSkills;
    } catch (error) {
        console.error('Error loading skills:', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await loadSkills();

        // Create a new skill
    const createSkillForm = document.getElementById('create-skill-form');
    const createSkillMessage = document.getElementById('create-skill-message');

    if (createSkillForm) {
        createSkillForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const skillData = {
                title: document.getElementById('skill-title').value,
                category: document.getElementById('skill-category').value,
                price: Number(document.getElementById('skill-price').value),
                description: document.getElementById('skill-description').value
            };

            try {
                await window.apiService.createSkill(skillData);

                createSkillMessage.textContent = 'Skill created successfully!';
                createSkillForm.reset();

                await loadSkills();

            } catch (error) {
                console.error('Error creating skill:', error);
                createSkillMessage.textContent = 'Could not create skill. Please try again.';
            }
        });
    }

    const findMatchButton = document.getElementById('find-match-button');

    if (findMatchButton) {
        findMatchButton.addEventListener('click', function () {
            const category = document.getElementById('match-category').value;
            const maxPriceInput = document.getElementById('match-max-price');
            const maxPrice = Number(maxPriceInput.value);
            const resultsContainer = document.getElementById('match-results');

            if (maxPriceInput.value.trim() === '' ||
                !Number.isFinite(maxPrice) ||
                maxPrice < 0) {
                resultsContainer.innerHTML =
                    '<p>Please enter a valid maximum price of $0 or more.</p>';
                return;
            }

            const userNeeds = {
                category: category,
                maxPrice: maxPrice
            };

            const matchedSkills = category === 'All'
                ? availableSkills.filter(skill => skill.price <= maxPrice)
                : window.matchSkillsToUser(userNeeds, availableSkills);

            if (matchedSkills.length === 0) {
                resultsContainer.innerHTML =
                    '<p>No skills match your preferences. Try another category or price.</p>';
                return;
            }

            resultsContainer.innerHTML = '<h3>Your Matches</h3>';

            matchedSkills.forEach(function (skill) {
                const skillCard = document.createElement('div');
                skillCard.className = 'match-result-card';

                const skillTitle = document.createElement('h4');
                skillTitle.textContent = skill.title;

                const skillDetails = document.createElement('p');
                skillDetails.textContent =
                    'Category: ' + skill.category +
                    ' | Price: $' + skill.price.toFixed(2) +
                    ' | Provider: ' + skill.provider;

                skillCard.appendChild(skillTitle);
                skillCard.appendChild(skillDetails);
                resultsContainer.appendChild(skillCard);
            });
        });
    }
});
