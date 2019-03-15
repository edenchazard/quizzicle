var data ={
	/*
		Multiple choice | requires an answers: [ ] and choices: [ ]
		Predetermined | requires choices: [ ] and answer: ""
		Text | requires answer: ""
	*/
	questionBank: [
		{
			question: "Select all equations that equal 10.",
			choices: [ "11 - 1", "10 - 11", "100 / 5", "10 + 0", "12 * 10", "65 + 1"],
			answers: [ "11 - 1", "10 + 0" ]
		},
		{
			question: "What is Mel's last name?",
			answer: "Marris"
		},
		{
			question: "What colour is the I.T. room floor?",
			answer: "green"
		},
		{
			question: "How many chairs are there in the I.T. room?",
			answer: 8
		},
		{
			question: "What is Sharon's hair colour?",
			choices: [ 'Blonde', 'Pink', 'Brown' ],
			answer: 'Blonde'
		},
		{
			question: "Where is Mrs. Wardlaw's office located?",
			choices: [ "Next to the field", "In front of the post office", "The school dungeon", "At the police station" ],
			answer: "Next to the field"
		},
		{
			question: "In what year did Jason Darker do the famous splitting shorts incident? (Haha, silly boy...)",
			choices: [ 2015, 2014, 2013, 2012 ],
			answer: 2013
		},
		{
			question: "What year did Demeter House open?",
			answer: 2006
		},
		{
			question: "What occupation is Ian most often compared to?",
			choices: [ "A farmer", "A builder", "A dancer" ],
			answer: "a farmer"
		},
		{
			question: "Which members of staff have left in the last 6 months?",
			choices: [ "Jonathon Whall", "Ben Kearsley", "Steve South", "Rob Skinner", "Natali" ],
			answers: [ "Ben Kearsley", "Rob Skinner" ]
		},
		{
			question: "In which department did an OFSTED inspector say the famous phrase \"What a remarkable...\"?",
			choices: [ "Art", "English", "Maths", "Science", "Construction" ],
			answer: "art"
		},
		{
			question: "Which teacher is known for saying the phrase 'Top banana!'? Give their first and last name.",
			answer: "Tom Woods"
		},
		{
			question: "Which of the following are Mrs. Huckle's nicknames?",
			choices: [ "County ranger", "Sherrif", "Prime Minister", "Lady of the School" ],
			answers: [ "Sherrif", "Prime Minister" ]
		}
	],
	shuffle: true,
	shuffleChoices: true
};