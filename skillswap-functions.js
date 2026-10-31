function filterSkillsByCategory(skills, category) {
    if (category === 'All') {
        return skills;
    }

    return skills.filter(skill => skill.category === category);
}

function calculateTotalCosts(hourlyRate, hours) {
    return hourlyRate * hours;
}

function matchSkillsToUser(userNeeds, skills) {
    return skills.filter(skill =>
        skill.category === userNeeds.category &&
        skill.price <= userNeeds.maxPrice
    );
}

// Allows Jest tests to use all three functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        filterSkillsByCategory,
        calculateTotalCosts,
        matchSkillsToUser
    };
}

// Allows the website to use all three functions
if (typeof window !== 'undefined') {
    window.filterSkillsByCategory = filterSkillsByCategory;
    window.calculateTotalCosts = calculateTotalCosts;
    window.matchSkillsToUser = matchSkillsToUser;
}

