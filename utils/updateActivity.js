const { ActivityType } = require('discord.js');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config();

// Validate environment variables at startup
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
	throw new Error('Missing required Supabase environment variables');
}

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY,
	{
		auth: { persistSession: false },
		db: {
			schema: 'public'
		}
	}
);

async function updateBotActivity(client) {
	try {
		const serverCount = client.guilds.cache.size;
		client.user.setActivity(`Used in ${serverCount} servers`, { type: ActivityType.Custom });

		// Test Supabase connection first
		try {
			const { data, error: testError } = await supabase.from('server_stats').select('count').single();
			if (testError) {
				console.error('Supabase connection test failed:', testError);
				return;
			}
		} catch (testError) {
			console.error('Supabase connection test failed:', testError);
			return;
		}

		// If connection test passes, proceed with update
		const { error } = await supabase
			.from('server_stats')
			.upsert({
				id: 1,
				server_count: serverCount,
				updated_at: new Date().toISOString();
			});

		if (error) {
			console.error('Error updating Supabase:', error);
		}
		else {
			console.log(`Updated Supabase server count to ${serverCount}`);
		}
	}
	catch (error) {
		console.error('Error in updateBotActivity:', error);
	}
}

module.exports = {
	updateBotActivity
};