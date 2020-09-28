const questions = [
    {
        type: 'input',
        name: 'phone',
        message: "What's your phone number?",
        validate: function (value:string) {
            var pass = value.match(
                /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
            );
            if (pass) {
                return true;
            }
            return 'Please enter a valid phone number';
        },
    },
    {
        type: 'list',
        name: 'size',
        message: 'What size do you need?',
        choices: ['Large', 'Medium', 'Small'],
        filter: function (val:string) {
            return val.toLowerCase();
        },
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        validate: function (value:string) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number,
    },
    {
        type: 'expand',
        name: 'toppings',
        message: 'What about the toppings?',
        choices: [
            {
                key: 'p',
                name: 'Pepperoni and cheese',
                value: 'PepperoniCheese',
            },
            {
                key: 'a',
                name: 'All dressed',
                value: 'alldressed',
            },
            {
                key: 'w',
                name: 'Hawaiian',
                value: 'hawaiian',
            },
        ],
    },
    {
        type: 'rawlist',
        name: 'beverage',
        message: 'You also get a free 2L beverage',
        choices: ['Pepsi', '7up', 'Coke'],
    },
    {
        type: 'input',
        name: 'comments',
        message: 'Any comments on your purchase experience?',
        default: 'Nope, all good!',
    },
    {
        type: 'list',
        name: 'prize',
        message: 'For leaving a comment, you get a freebie',
        choices: ['cake', 'fries'],
        when: function (answers:any) {
            return answers.comments !== 'Nope, all good!';
        },
    },
];

export default questions