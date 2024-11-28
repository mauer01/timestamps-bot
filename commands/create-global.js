const { SlashCommandBuilder } = require('discord.js');
const timezones = require('../utils/timezones');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Create a timestamp snippet (Private)')
		.addIntegerOption(option =>
			option.setName('day')
				.setDescription('Day of the month')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(31))
		.addIntegerOption(option =>
			option.setName('month')
				.setDescription('Month (1-12)')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(12))
		.addStringOption(option =>
			option.setName('time')
				.setDescription('Time in HH:MM format')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('timezone')
				.setDescription('Your timezone')
				.setRequired(true)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('format')
				.setDescription('Timestamp format')
				.setRequired(false)
				.addChoices(
					{ name: 'Short Time (e.g., 9:41 PM)', value: 't' },
					{ name: 'Long Time (e.g., 9:41:30 PM)', value: 'T' },
					{ name: 'Short Date (e.g., 13/06/2024)', value: 'd' },
					{ name: 'Long Date (e.g., 13 June 2024)', value: 'D' },
					{ name: 'Short Date/Time (e.g., 13 June 2024 9:41 PM)', value: 'f' },
					{ name: 'Long Date/Time (e.g., Wednesday, 13 June 2024 9:41 PM)', value: 'F' },
					{ name: 'Relative Time (e.g., in 8 hours / 2 months ago)', value: 'R' },
				))
		.addIntegerOption(option =>
			option.setName('year')
				.setDescription('Year (defaults to current year)')
				.setRequired(false)
				.setMinValue(1970)
				.setMaxValue(2100)),
	async execute(interaction) {
		const day = interaction.options.getInteger('day');
		const month = interaction.options.getInteger('month');
		const year = interaction.options.getInteger('year') || new Date().getFullYear();
		const time = interaction.options.getString('time');

		// Parse time
		const [hours, minutes] = time.split(':').map(Number);

		if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
			return interaction.reply({ content: 'Invalid time format. Please use HH:MM (24-hour format).', ephemeral: true });
		}

		const timezone = interaction.options.getString('timezone');

		// Create Date object and get Unix timestamp
		const date = new Date(Date.UTC(year, month - 1, day, hours, minutes));
		const offsetMinutes = parseInt(timezone.slice(1, 3)) * 60 + parseInt(timezone.slice(4));
		date.setMinutes(date.getMinutes() - (timezone.startsWith('-') ? -offsetMinutes : offsetMinutes));

		const unixTimestamp = Math.floor(date.getTime() / 1000);

		if (isNaN(unixTimestamp)) {
			return interaction.reply({ content: 'Invalid date. Please check your input.', ephemeral: true });
		}

		const format = interaction.options.getString('format') || 'f';
		const formattedTimestamp = `<t:${unixTimestamp}:${format}>`;

		await interaction.reply({
			content: `Preview: ${formattedTimestamp}\n\`\`\`${formattedTimestamp}\`\`\`Copy and paste the above snippet where needed.`,
			ephemeral: true,
		});
	},

	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused().toLowerCase();
		const filteredTimezones = timezones.filter(choice =>
			choice.name.toLowerCase().includes(focusedValue)
		);

		const filteredCities = timezones.flatMap(choice =>
			choice.cities
				.filter(city => city.toLowerCase().includes(focusedValue))
				.map(city => ({ name: `${city} - ${choice.name}`, value: choice.value }))
		);

		const filtered = [
			...filteredTimezones.map(choice => ({ name: choice.name, value: choice.value })),
			...filteredCities
		];

		await interaction.respond(filtered.slice(0, 25));
	},
};