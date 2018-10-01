
// Approach 1 ----> clean but more processing required on front end


// Example of saving a movie:
// user clicks 'like/save' on movie
// a PUT request is made to user.helix
// each relevant field of movie (year, genres, budget, etc) is pushed into a corresponding array
// in the helix object


export const mockUserData = {
    userName: 'Trey',
    password: '123',
    helix: {
        decades: ['1975', '1975', '1977', '1974', '1983', '1982', '1990', '2008'],
        genres: ['action', 'thriller', 'thriller', 'thriller', 'thriller', 'comedy', 'action', 'action', 'drama', 'thriller', 'action'],
        budget: [100000000, 200000000],
        runtime: [122, 140, 90, 98, 140, 101],
        revenue: [200000000, 300000000],
        rating: [68, 90, 56, 75, 80, 90, 95]
    }
}    