function getLangView() {
  return {
    view: "dataview",
    id: "dataview1",
    select: true,
    type: {
      height: 60,
      width: "auto"
    },
    template: "<div class='webix_strong'>#title#</div> Year: #year#, rank: #rank#",
    data: [
      { id: 1, title: "The Shawshank Redemption", year: 1994, votes: 678790, rating: 9.2, rank: 1 },
      { id: 2, title: "The Godfather", year: 1972, votes: 511495, rating: 9.2, rank: 2 },
      { id: 3, title: "The Godfather: Part II", year: 1974, votes: 319352, rating: 9.0, rank: 3 },
      { id: 4, title: "The Good, the Bad and the Ugly", year: 1966, votes: 213030, rating: 8.9, rank: 4 }
    ]
  }
}