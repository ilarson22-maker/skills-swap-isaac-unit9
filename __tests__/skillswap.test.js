const {
    filterSkillsByCategory,
    calculateTotalCosts,
    matchSkillsToUser
} = require('../skillswap-functions');

describe('filterSkillsByCategory', () => {
  const skills = [
    { title: 'Python Tutoring', category: 'Programming', price: 20 },
    { title: 'Guitar Lessons', category: 'Music', price: 15 },
    { title: 'Resume Review', category: 'Career', price: 0 },
    { title: 'Web Development', category: 'Programming', price: 25 }
  ];

  test('filters skills by category', () => {
    expect(filterSkillsByCategory(skills, 'Programming')).toEqual([
      skills[0],
      skills[3]
    ]);
  });

  test('returns all skills when category is All', () => {
    expect(filterSkillsByCategory(skills, 'All')).toEqual(skills);
  });

  test('returns an empty array when there are no matches', () => {
    expect(filterSkillsByCategory(skills, 'Cooking')).toEqual([]);
  });
});

describe('calculateTotalCosts', () => {
    test('calculates the correct cost for different rates and hours', () => {
        expect(calculateTotalCosts(20, 2)).toBe(40);
        expect(calculateTotalCosts(15, 3)).toBe(45);
    });

    test('handles free sessions', () => {
        expect(calculateTotalCosts(0, 3)).toBe(0);
    });

    test('handles zero hours', () => {
        expect(calculateTotalCosts(20, 0)).toBe(0);
    });

    test('calculates the correct cost for decimal hours', () => {
        expect(calculateTotalCosts(25, 1.5)).toBe(37.5);
    });
});

describe('matchSkillsToUser', () => {
    const skills = [
        { title: 'Python Tutoring', category: 'Programming', price: 20 },
        { title: 'JavaScript Help', category: 'Programming', price: 25 },
        { title: 'Guitar Lessons', category: 'Music', price: 15 },
        { title: 'Resume Review', category: 'Career', price: 0 }
    ];

    test('matches skills by category and price', () => {
        const userNeeds = {
            category: 'Programming',
            maxPrice: 30
        };

        expect(matchSkillsToUser(userNeeds, skills)).toEqual([
            { title: 'Python Tutoring', category: 'Programming', price: 20 },
            { title: 'JavaScript Help', category: 'Programming', price: 25 }
        ]);
    });

    test('filters skills by maximum price', () => {
        const userNeeds = {
            category: 'Programming',
            maxPrice: 20
        };

        expect(matchSkillsToUser(userNeeds, skills)).toEqual([
            { title: 'Python Tutoring', category: 'Programming', price: 20 }
        ]);
    });

    test('returns an empty array when there are no matches', () => {
        const userNeeds = {
            category: 'Cooking',
            maxPrice: 100
        };

        expect(matchSkillsToUser(userNeeds, skills)).toEqual([]);
    });

    test('includes free skills when the maximum price is zero', () => {
        const userNeeds = {
            category: 'Career',
            maxPrice: 0
        };

        expect(matchSkillsToUser(userNeeds, skills)).toEqual([
            { title: 'Resume Review', category: 'Career', price: 0 }
        ]);
    });
});
