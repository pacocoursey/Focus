module.exports = {
  initial: [
    {
      type: 'select',
      name: 'type',
      message: 'What kind of project?',
      choices: [
        { title: 'Coding', value: 'code' },
        { title: 'IRL', value: 'irl' },
      ],
    },
    {
      type: 'text',
      name: 'name',
      message: 'Give it a name:',
    },
    {
      type: 'text',
      name: 'notes',
      message: 'Add some notes:',
    },
    {
      type: 'select',
      name: 'priority',
      message: 'Assign a priority level:',
      choices: [
        { title: 'Low', value: '1' },
        { title: 'Medium', value: '2' },
        { title: 'High', value: '3' },
      ],
    },
    {
      type: 'select',
      name: 'size',
      message: 'How long will this take?',
      choices: [
        { title: 'Not long', value: '1' },
        { title: 'A medium amount', value: '2' },
        { title: 'Much longer than I think', value: '3' },
      ],
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Add this project to your stack?',
      initial: true,
    },
  ],
};
